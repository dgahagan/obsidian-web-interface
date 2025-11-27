import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */

// Detect production build for privacy filtering
const isProduction = process.env.NODE_ENV === "production"

// Folders to always exclude from both local and production builds
const baseIgnorePatterns = [
  "private",           // Private folders
  "templates",         // Template sources (lowercase)
  "Templates",         // Template sources (capitalized)
  ".obsidian",         // Obsidian settings
  "**/*.tmp.*",        // Temp files
]

// Additional folders to exclude ONLY from production build
// Customize this list with your sensitive content folders
const productionIgnorePatterns = [
  // "Budget/**",              // Example: hide financial info
  // "Personal/**",            // Example: hide personal notes
  // "Internal/**",            // Example: hide internal docs
  // "30-Vendors & Contacts/**", // Example: hide vendor info
]

const ignorePatterns = isProduction
  ? [...baseIgnorePatterns, ...productionIgnorePatterns]
  : baseIgnorePatterns

const config: QuartzConfig = {
  configuration: {
    pageTitle: "My Knowledge Base",  // Change this to your site title
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: null,  // Set to { provider: "plausible" } or similar if desired
    locale: "en-US",
    baseUrl: "yoursite.com",  // Change this to your domain
    ignorePatterns: ignorePatterns,
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
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
          highlight: "rgba(143, 159, 169, 0.15)",
          textHighlight: "#fff23688",
        },
        darkMode: {
          light: "#161618",
          lightgray: "#393639",
          gray: "#646464",
          darkgray: "#d4d4d4",
          dark: "#ebebec",
          secondary: "#7b97aa",
          tertiary: "#84a59d",
          highlight: "rgba(143, 159, 169, 0.15)",
          textHighlight: "#b3aa0288",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
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
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
