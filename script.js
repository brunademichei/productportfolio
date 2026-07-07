// ============================================================
//  Bruna Demichei Nobre — UX Portfolio
//  Theme toggle, mobile nav, scroll reveal, header state.
// ============================================================

(function () {
  "use strict";

  const root = document.documentElement;
  const THEME_KEY = "bdn-theme";
  const LANG_KEY = "bdn-lang";

  /* ---- Language (EN/PT) ---- */
  // Each page defines its own translations in a global `window.PT` object,
  // keyed by the element's data-i18n / data-i18n-html attribute value.
  const PT = window.PT || {};
  const langToggle = document.getElementById("lang-toggle");
  const langLabel = document.getElementById("lang-toggle-label");
  const enText = new Map();

  function applyLang(lang) {
    const toPt = lang === "pt";
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      const key = el.getAttribute("data-i18n");
      if (!enText.has(el)) enText.set(el, el.textContent);
      if (toPt && PT[key] != null) el.innerHTML = PT[key];
      else el.textContent = enText.get(el);
    });
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      const key = el.getAttribute("data-i18n-html");
      if (!enText.has(el)) enText.set(el, el.innerHTML);
      el.innerHTML = toPt && PT[key] != null ? PT[key] : enText.get(el);
    });
    root.setAttribute("lang", toPt ? "pt-BR" : "en");
    if (langLabel) langLabel.textContent = toPt ? "EN" : "PT";
    if (langToggle) langToggle.setAttribute("aria-label", toPt ? "Switch to English" : "Mudar para português");
  }

  applyLang(localStorage.getItem(LANG_KEY) || "en");

  if (langToggle) {
    langToggle.addEventListener("click", function () {
      const next = root.getAttribute("lang") === "pt-BR" ? "en" : "pt";
      applyLang(next);
      localStorage.setItem(LANG_KEY, next);
    });
  }

  /* ---- Theme (light/dark) ---- */
  const themeToggle = document.getElementById("theme-toggle");

  function applyTheme(theme) {
    if (theme === "dark") {
      root.setAttribute("data-theme", "dark");
    } else {
      root.removeAttribute("data-theme");
    }
    if (themeToggle) {
      const next = theme === "dark" ? "light" : "dark";
      themeToggle.setAttribute("aria-label", `Switch to ${next} theme`);
    }
  }

  const savedTheme = localStorage.getItem(THEME_KEY);
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(savedTheme || (prefersDark ? "dark" : "light"));

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      const isDark = root.getAttribute("data-theme") === "dark";
      const next = isDark ? "light" : "dark";
      applyTheme(next);
      localStorage.setItem(THEME_KEY, next);
    });
  }

  /* ---- Mobile nav ---- */
  const toggle = document.querySelector(".nav__toggle");
  const menu = document.getElementById("nav-menu");

  function closeMenu() {
    if (!toggle || !menu) return;
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
    menu.classList.remove("is-open");
  }

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      toggle.setAttribute("aria-label", open ? "Open menu" : "Close menu");
      menu.classList.toggle("is-open", !open);
    });

    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
  }

  /* ---- Sticky header shadow on scroll ---- */
  const header = document.querySelector(".site-header");
  function onScroll() {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---- Scroll reveal ---- */
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealEls = document.querySelectorAll(".reveal");

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0, rootMargin: "0px 0px -8% 0px" });

    revealEls.forEach(function (el) { observer.observe(el); });
  }

  /* ---- Footer year ---- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
