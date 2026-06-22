# Bruna Demichei Nobre — UX Portfolio

A fast, accessible, single-page portfolio website. No build step — it's plain
HTML, CSS, and JavaScript, so it runs anywhere and is easy to edit.

## Files

| File | What it holds |
|------|---------------|
| `index.html` | All page content (text, sections, links) — **edit your copy here** |
| `styles.css` | Design system: colors, fonts, spacing, layout |
| `script.js` | Theme toggle, mobile menu, scroll animations |
| `assets/` | Put project images / screenshots here |

## How to edit your content

Open `index.html` and look for these sections (marked with `<!-- comments -->`):

- **Hero** — your headline and intro.
- **About** — your bio and the "At a glance" facts.
- **Expertise** — your skills.
- **Process** — your design process.
- **Work** — the case studies. Each card has `Problem / My role / What I did / Impact`.
  Replace the placeholder text, fill in the `[Add a measurable outcome ...]` impact lines,
  and swap the gray "Project image / cover" box for a real image:

  ```html
  <div class="case__media">
    <img src="assets/my-project.png" alt="Short description of the project screen" />
  </div>
  ```

- **Contact** — update the `mailto:your.email@example.com` link with your real email.

## Preview locally

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploy (free shareable link)

Any static host works. Easiest options:

- **Vercel** — import the repo at https://vercel.com/new, no settings needed.
- **GitHub Pages** — repo Settings → Pages → deploy from the `main` branch root.
- **Netlify** — drag-and-drop the folder at https://app.netlify.com/drop.
