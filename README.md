# Obsidian Web Template

A ready-to-use template for publishing any Obsidian vault as a fast, searchable static website using [Quartz](https://quartz.jzhao.xyz/).

## Features

- **Zero vault modifications** - Use your existing Obsidian structure as-is
- **Full-text search** - Find anything instantly
- **Graph view** - Visualize how your notes connect
- **Privacy controls** - Dual-build system hides sensitive content from public site
- **Dark mode** - Built-in light/dark theme switching
- **Responsive design** - Works on desktop, tablet, and mobile
- **Automatic deployment** - GitHub Actions deploys on every push
- **Wikilinks support** - `[[links]]` work out of the box
- **Backlinks** - See what pages link to the current page
- **Tags** - Tag pages aggregate content automatically

## Prerequisites

- [Node.js](https://nodejs.org/) v22 or higher
- [Git](https://git-scm.com/)
- An Obsidian vault (or any collection of markdown files)

## Quick Start

```bash
# Clone this template
git clone https://github.com/yourusername/obsidian-web-template.git my-site
cd my-site

# Install dependencies
npm install

# Start local server
npx quartz build --serve

# Visit http://localhost:8080
```

If port 8080 is in use:
```bash
npx quartz build --serve --port 3000 --wsPort 3001
```

## Project Structure

```
.
├── content/              # Your markdown content goes here
│   └── index.md          # Homepage
├── quartz/               # Quartz framework (don't modify)
├── quartz.config.ts      # Site configuration
├── quartz.layout.ts      # Page layout configuration
├── .github/workflows/    # GitHub Actions for deployment
└── public/               # Generated site (gitignored)
```

## Adding Content

### Option 1: Copy existing vault

Copy your Obsidian vault contents into the `content/` folder:

```bash
cp -r /path/to/your/vault/* content/
```

### Option 2: Symlink your vault

Link your existing vault (keeps everything in sync):

```bash
rm -rf content
ln -s /path/to/your/vault content
```

### Option 3: Start fresh

Create new markdown files directly in `content/`. The `index.md` file serves as your homepage.

## Configuration

Edit `quartz.config.ts` to customize your site:

### Basic Settings

```typescript
const config: QuartzConfig = {
  configuration: {
    pageTitle: "My Knowledge Base",     // Site title in header
    baseUrl: "mysite.com",              // Your domain (no https://)
    enableSPA: true,                    // Single-page app navigation
    enablePopovers: true,               // Link preview on hover
  },
}
```

### Privacy Controls

This template includes a dual-build system for privacy:

```typescript
// Always hidden (both local and production builds)
const baseIgnorePatterns = [
  "private",           // Private folders
  "templates",         // Template files
  "Templates",         // Template files (capitalized)
  ".obsidian",         // Obsidian settings
  "**/*.tmp.*",        // Temp files
]

// Hidden ONLY from production build (visible locally)
const productionIgnorePatterns = [
  // Uncomment and customize these:
  // "Budget/**",              // Financial info
  // "Personal/**",            // Personal notes
  // "Internal/**",            // Internal docs
  // "Contacts/**",            // Contact information
]
```

**Local build** - See everything:
```bash
npx quartz build --serve
```

**Production build** - Test what visitors will see:
```bash
NODE_ENV=production npx quartz build --serve
```

### Theme Customization

```typescript
theme: {
  typography: {
    header: "Schibsted Grotesk",
    body: "Source Sans Pro",
    code: "IBM Plex Mono",
  },
  colors: {
    lightMode: {
      light: "#faf8f8",
      dark: "#2b2b2b",
      secondary: "#284b63",    // Accent color
      // ... more colors
    },
    darkMode: {
      light: "#161618",
      dark: "#ebebec",
      secondary: "#7b97aa",    // Accent color
      // ... more colors
    },
  },
}
```

## Deployment

### GitHub Pages (Recommended)

This template includes a pre-configured GitHub Actions workflow.

1. **Create a GitHub repository** and push your code:
   ```bash
   git remote add origin https://github.com/yourusername/my-site.git
   git branch -M main
   git push -u origin main
   ```

2. **Enable GitHub Pages**:
   - Go to repository Settings > Pages
   - Source: **GitHub Actions**

3. **Deploy**: Push to `main` branch - deployment happens automatically.

4. **Custom domain** (optional):
   - Add your domain in Settings > Pages > Custom domain
   - Update `baseUrl` in `quartz.config.ts`

### Netlify

1. Connect your GitHub repository
2. Build command: `npx quartz build`
3. Publish directory: `public`
4. Environment variable: `NODE_ENV=production`

### Vercel

1. Connect your GitHub repository
2. Framework preset: **Other**
3. Build command: `npx quartz build`
4. Output directory: `public`
5. Environment variable: `NODE_ENV=production`

### Manual Deployment

```bash
NODE_ENV=production npx quartz build
# Upload the `public/` folder to any static host
```

## Common Commands

| Command | Description |
|---------|-------------|
| `npx quartz build --serve` | Start local dev server with hot reload |
| `npx quartz build` | Build site to `public/` folder |
| `NODE_ENV=production npx quartz build --serve` | Preview production build locally |
| `rm -rf .quartz-cache && npm install` | Clear cache and reinstall |

## Workflow

1. **Edit** your notes in Obsidian as usual
2. **Preview** locally with `npx quartz build --serve`
3. **Commit** your changes: `git add . && git commit -m "Update notes"`
4. **Push** to deploy: `git push`

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Port already in use | Use `--port 3000 --wsPort 3001` flags |
| Build fails | Run `rm -rf .quartz-cache && npm install` |
| Links broken | Check file paths and wikilink syntax |
| Images not showing | Ensure images are in `content/` folder |
| Privacy filters not working | Verify `NODE_ENV=production` is set |
| Changes not appearing | Clear browser cache or hard refresh |

## Frontmatter Reference

Optional YAML frontmatter for pages:

```yaml
---
title: Page Title           # Overrides filename
tags: [tag1, tag2]          # Tags for this page
date: 2025-01-15            # Publication date
draft: true                 # Hide from production build
aliases: [other-name]       # Alternative names for linking
description: "Summary"      # Meta description for SEO
---
```

## Resources

- [Quartz Documentation](https://quartz.jzhao.xyz/)
- [Obsidian Help](https://help.obsidian.md/)
- [GitHub Pages Documentation](https://docs.github.com/pages)

## License

This template is based on [Quartz](https://github.com/jackyzha0/quartz) by Jacky Zhao, licensed under the MIT License.
