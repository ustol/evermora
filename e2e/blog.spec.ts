import { expect, test } from "@playwright/test"
import { trackConsoleErrors } from "./helpers"

test.describe("blog rich-text rendering", () => {
  test("/blog lists posts as cards that link to a rendered post page", async ({ page }) => {
    const errors = trackConsoleErrors(page)
    await page.goto("/blog")

    await expect(page.getByRole("heading", { level: 1, name: "From Akornafa" })).toBeVisible()

    const cards = page.locator('a[href^="/blog/"]')
    const count = await cards.count()

    if (count === 0) {
      await expect(page.getByText("No posts yet")).toBeVisible()
      expect(errors).toEqual([])
      return
    }

    await expect(cards.first()).toBeVisible()

    await Promise.all([page.waitForURL(/\/blog\/.+/), cards.first().click()])

    await expect(page).toHaveURL(/\/blog\/.+/)
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible()
    await expect(page.locator("article p").first()).toBeVisible()

    expect(errors).toEqual([])
  })

  test("home page renders recent posts as blog cards", async ({ page }) => {
    const errors = trackConsoleErrors(page)
    await page.goto("/")

    const heading = page.getByRole("heading", { name: "From the blog" })
    const hasSection = (await heading.count()) > 0

    if (!hasSection) {
      test.skip(true, "No published posts are available on the homepage")
      return
    }

    await expect(heading).toBeVisible()
    const section = heading.locator("xpath=ancestor::section")
    await expect(section.locator('a[href^="/blog/"]').first()).toBeVisible()

    expect(errors).toEqual([])
  })
})
