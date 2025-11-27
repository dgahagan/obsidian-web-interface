# Universal Obsidian + Quartz Publishing Template

**Version**: 1.0
**Date Created**: November 1, 2025
**Purpose**: Generic framework for publishing ANY Obsidian vault as a static website

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [Overview](#overview)
3. [Core Architecture](#core-architecture)
4. [Setup Process](#setup-process)
5. [Configuration](#configuration)
6. [Content Organization](#content-organization)
7. [Workflow](#workflow)
8. [Privacy & Access Control](#privacy--access-control)
9. [Deployment](#deployment)
10. [Customization Guide](#customization-guide)
11. [Quick Reference](#quick-reference)

---

## Quick Start

**Have an existing Obsidian vault? Get it online in 15 minutes:**

```bash
# 1. Navigate to your vault directory
cd /path/to/your/vault

# 2. Initialize Git (if not already done)
git init && git add . && git commit -m "Initial commit"

# 3. Install Quartz
npx quartz@latest create content

# 4. Install dependencies
npm install

# 5. Test locally
npx quartz build --serve

# 6. Visit http://localhost:8080
```

Done! Your vault is now a website. See [Deployment](#deployment) to publish it online.

---

## Overview

This template makes it trivial to publish Obsidian vaults as websites. Whether your vault contains:
- Research notes
- Software documentation
- Personal knowledge base
- Project management
- Technical specifications
- Meeting notes
- Any markdown content

...it can be published as a fast, searchable website with zero modifications to your existing vault.

### What You Get

- **Website Generator**: Quartz automatically converts markdown to a static site
- **Search**: Full-text search built-in
- **Graph View**: Visualize how your notes connect
- **Responsive Design**: Works on desktop, tablet, mobile
- **Dark Mode**: Built-in light/dark theme switching
- **Privacy Control**: Separate public and private builds
- **Version Control**: Complete Git integration
- **Easy Deployment**: One-click publishing to GitHub Pages, Netlify, Cloudflare, or any host

### Key Features

| Feature | Benefit |
|---------|---------|
| **Zero vault modifications** | Use your existing structure as-is |
| **Git-based workflow** | Version history and backup |
| **Privacy modes** | Hide sensitive content from public build |
| **Dual-build system** | Local access to full content, public sees filtered version |
| **Markdown-native** | Works with any markdown, Obsidian syntax optional |
| **Fast builds** | 100+ documents build in seconds |
| **Custom domain** | Use your own domain or GitHub Pages subdomain |

---

## Core Architecture

### How It Works

```
Your Obsidian Vault (Any Structure)
           │
           ├─ Existing content
           ├─ Existing folder structure
           ├─ Existing naming conventions
           └─ No changes needed!
           │
           ▼
    Git Version Control
    (commits, history, backup)
           │
           ▼
    Quartz (When you push or build)
           │
    ┌──────┴──────┐
    │             │
    ▼             ▼
Local Build    Production Build
(Full content) (Filtered content)
    │             │
    ▼             ▼
Localhost      GitHub Pages/
:8080          Netlify/
               Cloudflare
```

### Technology Stack

| Component | Purpose | Requirement |
|-----------|---------|-------------|
| **Obsidian** | Edit your notes locally | Already have it |
| **Quartz 4** | Convert markdown to website | Install: `npm install` |
| **Node.js** | JavaScript runtime | Install: v22+ |
| **Git** | Version control & backup | Install: `git-scm.com` |
| **Markdown** | Document format | Use what you have |

### Vault Structure

No changes needed to your existing vault! Quartz works with:
- Any folder structure
- Any naming conventions
- Any markdown dialect (Obsidian, GitHub-flavored, etc.)
- Any file organization

Your vault stays exactly as it is. Quartz just publishes it as-is.

---

## Setup Process

### Step 1: Prerequisites (5 minutes)

**Install required tools:**

1. **Node.js 22+**
   - Download: https://nodejs.org
   - Verify: `node --version` (should be v22+)

2. **Git**
   - Download: https://git-scm.com
   - Verify: `git --version`

3. **Your Obsidian Vault**
   - Can be existing vault or new
   - Can be anywhere on your computer
   - No modifications needed

### Step 2: Initialize Publishing Setup (10 minutes)

Navigate to your vault directory and run:

```bash
# Navigate to your vault
cd /path/to/your/vault

# Initialize Git (if not already a git repo)
git init
git add .
git commit -m "Initial vault commit"

# Install Quartz (creates quartz/ and config files)
npx quartz@latest create content

# Install dependencies
npm install

# Test the build
npx quartz build --serve

# Visit http://localhost:8080 to see your website
```

That's it! Your vault is now a website.

### Step 3: Customize Configuration (Optional)

Edit `quartz.config.ts` to customize:

```typescript
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Your Site Title",           // Change this
    baseUrl: "yourdomain.com",              // Change this
    ignorePatterns: [                       // Exclude folders
      "private",                            // Example
      "Templates",
      ".obsidian",
    ],
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate(),
      Plugin.SyntaxHighlighting(),
      Plugin.ObsidianFlavoredMarkdown(),
      // ... more plugins as needed
    ],
  },
}
```

### Step 4: Set Up Version Control (Optional)

```bash
# Create GitHub repository and push
git remote add origin https://github.com/yourusername/vault.git
git branch -M main
git push -u origin main
```

### Step 5: Deploy (Choose One Option)

See [Deployment](#deployment) section for detailed instructions.

---

## Configuration

### quartz.config.ts

The main configuration file controls your website's appearance and behavior.

**Key settings:**

```typescript
import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

const isProduction = process.env.NODE_ENV === "production"

// Folders to always exclude from both local and production builds
const baseIgnorePatterns = [
  "private",           // Private folders
  "Templates",         // Template sources
  ".obsidian",         // Obsidian settings
  "**/*.tmp.*",        // Temp files
]

// Additional folders to exclude ONLY from production build
const productionIgnorePatterns = [
  "30-Vendors & Contacts/**",  // Example: hide vendor info
  "Budget/**",                 // Example: hide financial info
]

const ignorePatterns = isProduction
  ? [...baseIgnorePatterns, ...productionIgnorePatterns]
  : baseIgnorePatterns

const config: QuartzConfig = {
  configuration: {
    pageTitle: "My Knowledge Base",      // Website title
    baseUrl: "mysite.com",               // Your domain
    enableSPA: true,                     // Single-page app mode
    enablePopovers: true,                // Link preview popups
    ignorePatterns: ignorePatterns,      // What to hide
    theme: {
      typography: {
        header: "Schibsted Grotesk",
        body: "Source Sans Pro",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#faf8f8",
          lightgray: "#e5e5e5",
          gray: "#b8b8b8",
          darkgray: "#4e4e4e",
          dark: "#2b2b2b",
          secondary: "#284b63",
          tertiary: "#84a59d",
        },
        darkMode: {
          light: "#161618",
          lightgray: "#393639",
          gray: "#646464",
          darkgray: "#d4d4d4",
          dark: "#ebebec",
          secondary: "#7b97aa",
          tertiary: "#84a59d",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate(),
      Plugin.SyntaxHighlighting(),
      Plugin.ObsidianFlavoredMarkdown(),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks(),
      Plugin.Description(),
      Plugin.Latex(),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config
```

### Folder Structure (Your Existing Vault)

You don't need to change your vault structure. Quartz works with:
- ✓ Any folder organization
- ✓ Any naming conventions
- ✓ Any markdown syntax
- ✓ Mixed content types

### Privacy Control

Use `ignorePatterns` in `quartz.config.ts` to hide sensitive folders:

```typescript
// Hide from ALL builds
baseIgnorePatterns: ["private", "Templates", ".obsidian"]

// Hide ONLY from production (public website)
productionIgnorePatterns: [
  "30-Vendors/**",           // Hide vendor/contractor info
  "10-Planning/Budget.md",   // Hide financial details
  "private/**",              // Hide private folders
]
```

Build locally to see everything: `npx quartz build --serve`
Build for production to hide sensitive content: `NODE_ENV=production npx quartz build --serve`

---

## Content Organization

### No Changes Required

Your existing vault structure works as-is. Quartz publishes whatever folder structure you have.

### Optional: Recommended Practices

If you're building a new vault or want best practices:

- **Use clear folder names** (no abbreviations)
- **One homepage**: Create `index.md` at vault root for web homepage
- **Use subfolders** when you have 5+ items in a category
- **Consistent naming** within folders (e.g., `YYYY-MM-DD -` for dated items)

### Optional: Frontmatter

Quartz respects YAML frontmatter for metadata:

```yaml
---
title: Page Title
tags: [tag1, tag2]
date: 2025-11-01
---
```

This is optional - your vault works with or without it.

---

## Workflow

### Edit Locally

Simply use Obsidian as normal:
- Edit files locally
- Create new notes
- Organize as you like
- No special process needed

### Rebuild Website

After making changes, rebuild your website:

```bash
# Rebuild locally (fastest)
npx quartz build --serve

# Or build once for deployment
npx quartz build
```

### Push to GitHub (Optional)

```bash
git add .
git commit -m "Update notes"
git push
```

If you set up GitHub Actions, deployment happens automatically.

---

---

## Privacy & Access Control

### Two Build Modes

**Local Build** (Your Computer)
```bash
npx quartz build --serve
```
- Builds everything
- No privacy filtering
- Full access to all content
- Only visible on your machine

**Production Build** (Public Website)
```bash
NODE_ENV=production npx quartz build --serve
```
- Filters based on `ignorePatterns` in config
- Removes sensitive folders/files
- Safe to publish publicly
- Automatic redaction of marked sections

### What to Exclude

Edit `quartz.config.ts` to hide:

```typescript
// Always hidden (both builds)
const baseIgnorePatterns = [
  ".obsidian",        // Obsidian settings
  "Templates",        // Template files
  "private",          // Private folders
]

// Hidden ONLY from public build
const productionIgnorePatterns = [
  "Budget/**",        // Hide financial info
  "Personal/**",      // Hide personal notes
  "Internal/**",      // Hide internal docs
]
```

### Examples

| Content Type | Local Build | Public Build |
|--------------|:-----------:|:------------:|
| Published notes | ✓ Visible | ✓ Visible |
| Private folder | ✓ Visible | ✗ Hidden |
| Budget file | ✓ Visible | ✗ Hidden (if configured) |
| Obsidian config | ✗ Hidden | ✗ Hidden |
| Templates | ✗ Hidden | ✗ Hidden |

---

### Choose Your Platform

**GitHub Pages** (Easiest)
1. Create repository on GitHub
2. Push your vault code
3. Go to Settings → Pages → Source: GitHub Actions
4. Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy site

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npx quartz build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: public

  deploy:
    runs-on: ubuntu-latest
    needs: build
    permissions:
      pages: write
      id-token: write
    environment:
      name: github-pages
    steps:
      - uses: actions/deploy-pages@v4
```

5. Push workflow file, automatic deployment happens

**Netlify or Vercel** (Also Easy)
1. Connect your GitHub repository
2. Build command: `npx quartz build`
3. Output directory: `public`
4. Deploy!

**Custom Domain** (Optional)
1. Update `baseUrl` in `quartz.config.ts`
2. Configure DNS records at your domain registrar
3. Point to GitHub Pages or your host

---

## Customization Guide

### Change Site Title

Edit `quartz.config.ts`:
```typescript
configuration: {
  pageTitle: "Your New Title",
}
```

### Change Colors

Edit colors in `quartz.config.ts`:
```typescript
colors: {
  lightMode: {
    dark: "#2b2b2b",
    secondary: "#284b63",
    // ... customize colors
  }
}
```

### Change Fonts

Edit `quartz.config.ts`:
```typescript
typography: {
  header: "Schibsted Grotesk",
  body: "Source Sans Pro",
  code: "IBM Plex Mono",
}
```

### Add Custom CSS

Create `quartz/styles/custom.scss` and import in `quartz/styles/base.scss`:
```scss
@import "custom";

// Your custom styles here
```

### Change Layout

Edit `quartz.layout.ts` to add/remove components like search, graph, backlinks, etc.

---

### Common Commands

| Command | Purpose |
|---------|---------|
| `npx quartz build --serve` | Start local dev server (full content) |
| `NODE_ENV=production npx quartz build --serve` | Test production build (filtered) |
| `npx quartz build` | Build for deployment |
| `rm -rf .quartz-cache && npm install` | Clear cache & reinstall |
| `git push origin main` | Push changes to GitHub |

### File Locations

| File | Purpose |
|------|---------|
| `quartz.config.ts` | Site configuration (title, domain, privacy) |
| `quartz.layout.ts` | Page layout and components |
| `.github/workflows/deploy.yml` | GitHub Actions deployment |
| `.gitignore` | What Git should ignore |
| `package.json` | Dependencies |

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Build fails | `rm -rf .quartz-cache && npm install` |
| Port 8080 in use | `npx quartz build --serve --port 3000` |
| Links broken | Verify file paths and wikilink syntax |
| Images not showing | Check file is in vault and path is correct |
| Privacy filters don't work | Verify `NODE_ENV=production` and check `ignorePatterns` |
| Git not tracking files | Check `.gitignore` - might be excluding files |

---

## Next Steps

1. **Set up your vault** (15 minutes):
   - Run: `npx quartz@latest create content && npm install`
   - Test: `npx quartz build --serve`
   - Visit: http://localhost:8080

2. **Configure for your needs** (10 minutes):
   - Edit `quartz.config.ts` (title, domain, privacy)
   - Customize colors/fonts if desired
   - Set up `ignorePatterns` for sensitive content

3. **Deploy** (choose one):
   - **GitHub Pages**: Push to GitHub + set up Actions workflow
   - **Netlify**: Connect repo + deploy
   - **Other**: Build locally and upload `public/` folder

4. **Keep it updated**:
   - Edit in Obsidian as usual
   - Run `npx quartz build --serve` locally to preview
   - Rebuild and push when ready to publish

---

## Resources

- **Quartz Docs**: https://quartz.jzhao.xyz
- **Obsidian Docs**: https://obsidian.md
- **GitHub Pages**: https://docs.github.com/pages
- **Netlify Docs**: https://docs.netlify.com

---

**That's it! You now have a system for publishing any Obsidian vault as a website.** ✨
