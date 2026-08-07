# Editing your portfolio

Everything on the site comes from **one file**: `data/portfolio.json`.
You never need to open a `.tsx` file to change content.

After editing, run `npm run dev` (or redeploy) and the page reflects it.
If the JSON has a syntax error the build fails loudly — that's on purpose.

---

## Adding a new project

Append an object to the `projects` array. There are two shapes, picked by `kind`.

### A web / software project

```json
{
  "kind": "web",
  "id": "my-new-app",
  "title": "My New App",
  "summary": "One line. This is what shows on the card.",
  "description": "A longer paragraph. Only rendered on featured cards.",
  "tags": ["Realtime", "Dashboard"],
  "featured": false,
  "accent": "cyan",
  "year": "2026",
  "stack": ["Next.js", "TypeScript", "Postgres"],
  "liveUrl": "https://myapp.com",
  "repoUrl": "https://github.com/you/myapp",
  "metrics": [
    { "label": "Users", "value": "1.2k" }
  ]
}
```

### An electronics / embedded project

```json
{
  "kind": "embedded",
  "id": "line-follower",
  "title": "Line Following Robot",
  "summary": "PID-controlled two-wheel chassis with IR array.",
  "description": "Longer version, shown when featured.",
  "tags": ["Robotics", "Control"],
  "featured": false,
  "accent": "amber",
  "year": "2026",
  "hardware": ["ATmega328P", "IR array", "L298N driver"],
  "firmware": ["C", "AVR-GCC"],
  "repoUrl": "https://github.com/you/line-follower",
  "demoVideo": "https://youtu.be/..."
}
```

---

## What each field does

| Field | Effect on the page |
|---|---|
| `kind` | `"web"` → shows `stack` + `metrics`. `"embedded"` → shows `hardware` + `firmware`. |
| `id` | React key. Must be unique. Never shown. |
| `title` | Card heading. |
| `summary` | One line under the title. Always shown. |
| `description` | Longer paragraph. **Only rendered when `featured: true`.** |
| `tags` | Muted `A · B · C` line under the title. Use `[]` for none. |
| `featured` | `true` → wide 4-column card, sorted to the top, shows description + metrics. `false` → narrow 2-column card. |
| `accent` | `"cyan"` or `"amber"`. Sets chip colour and hover glow. |
| `year` | Small text, top-right of the card. |
| `stack` | *(web only)* Accent-coloured chips. |
| `metrics` | *(web only, featured only)* The 3-up stat strip. Any number of `{label, value}`. |
| `hardware` | *(embedded only)* Accent-coloured chips. |
| `firmware` | *(embedded only)* Grey chips on a second row. |
| `liveUrl` | *(web only)* Auto-adds a "Live →" link. Omit or `""` to hide. |
| `repoUrl` | Auto-adds a "Code →" link. Omit or `""` to hide. |
| `demoVideo` | *(embedded only)* Auto-adds a "Demo →" link. Omit or `""` to hide. |
| `links` | Optional. Extra `{label, href}` links beyond the three above. Deduped by href. |

### Layout maths

The grid is 6 columns wide. `featured` cards take 4, non-featured take 2.
So a row fills as `4 + 2` or `2 + 2 + 2`. Aim for combinations that sum to 6
if you want tidy rows — otherwise cards just wrap, which also looks fine.

---

## Other things you can change

| Where | What |
|---|---|
| `profile.name` / `role` / `tagline` / `location` / `status` | Hero identity block + the About card. |
| `profile.handle` | The `you@dev` text in the terminal title bar and nav. |
| `profile.boot` | The lines that type themselves out in the hero. Add/remove freely — `type` is `"cmd"` (gets a `$` prompt), `"out"` (grey), `"ok"` (cyan), or `"warn"` (amber). |
| `profile.socials` | The link row at the bottom of the contact card. Any number. |
| `profile.resumeUrl` | The "résumé ↗" link in the About card. Drop the PDF in `public/`. Remove the field to hide the link. |
| `stats` | The 2×2 metric block in About. Exactly 4 reads best. |
| `skills` | One card per group. The first gets a wide slot; the rest are narrow. |
| `contact` | Closing card heading, body, email, and button label. |

---

## Before you publish

These are placeholders, not your real details — search and replace:

- `contact.email` and the `mailto:` in `profile.socials` → currently `your.email@example.com`
- `profile.socials` hrefs → currently bare `https://github.com/` and `https://linkedin.com/in/`
- `liveUrl` / `repoUrl` on both projects → currently `https://example.com` and `https://github.com/`
- `profile.location` → currently `"India"`, which was a guess
- `profile.handle` → currently `"adil@dev"`
- Drop a real `resume.pdf` in `public/`, or remove `profile.resumeUrl`
