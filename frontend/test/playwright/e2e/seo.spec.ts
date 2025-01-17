import { expect, test } from "@playwright/test"

test.describe.configure({ mode: "parallel" })
const DESCRIPTION =
  "Search over 700 million free and openly licensed images, photos, audio, and other media types for reuse and remixing."

const pages = {
  home: {
    url: "/",
    title: "Openly Licensed Images, Audio and More | Openverse",
    ogImage: "/openverse-default.jpg",
    ogTitle: "Openverse",
    robots: "all",
  },
  allSearch: {
    url: "/search/?q=birds",
    title: "birds | Openverse",
    ogImage: "/openverse-default.jpg",
    ogTitle: "Openverse",
    robots: "all",
  },
  imageSearch: {
    url: "/search/image?q=birds",
    title: "birds | Openverse",
    ogImage: "/openverse-default.jpg",
    ogTitle: "Openverse",
    robots: "all",
  },
  audioSearch: {
    url: "/search/audio?q=birds",
    title: "birds | Openverse",
    ogImage: "/openverse-default.jpg",
    ogTitle: "Openverse",
    robots: "all",
  },
  imageDetail: {
    url: "/image/da5cb478-c093-4d62-b721-cda18797e3fb",
    title: "bird | Openverse",
    ogImage: new RegExp(
      "/v1/images/da5cb478-c093-4d62-b721-cda18797e3fb/thumb/"
    ),
    ogTitle: "bird",
    robots: "noindex",
  },
  audioDetail: {
    url: "/audio/7e063ee6-343f-48e4-a4a5-f436393730f6",
    title: "I Love My Dog You Love your Cat | Openverse",
    ogImage: new RegExp(
      "/v1/audio/7e063ee6-343f-48e4-a4a5-f436393730f6/thumb/"
    ),
    ogTitle: "I Love My Dog You Love your Cat",
    robots: "noindex",
  },
  about: {
    url: "/about",
    title: "About Openverse | Openverse",
    ogImage: "/openverse-default.jpg",
    ogTitle: "Openverse",
    robots: "all",
  },
}
test.describe("Page metadata", () => {
  for (const openversePage of Object.values(pages)) {
    test(`${openversePage.url}`, async ({ page }) => {
      await page.goto(openversePage.url)
      await expect(page).toHaveTitle(openversePage.title)
      const metaDescription = page.locator('meta[name="description"]')
      await expect(metaDescription).toHaveAttribute("content", DESCRIPTION)

      const metaRobots = page.locator('meta[name="robots"]')
      await expect(metaRobots).toHaveAttribute("content", openversePage.robots)

      const metaOgImage = page.locator('meta[name="og:image"]')
      await expect(metaOgImage).toHaveAttribute(
        "content",
        openversePage.ogImage
      )

      const metaOgTitle = page.locator('meta[name="og:title"]')
      await expect(metaOgTitle).toHaveAttribute(
        "content",
        openversePage.ogTitle
      )
    })
  }
})
