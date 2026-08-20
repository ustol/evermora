import { expect, type Locator, test } from "@playwright/test"
import { trackConsoleErrors } from "./helpers"

async function expectCircularAuthor(container: Locator, expectedSize: "sm" | "default") {
  const avatar = container.locator('[data-slot="avatar"]').first()
  await expect(avatar, "author avatar should be visible").toBeVisible()
  await expect(avatar, "author avatar should use the requested size").toHaveAttribute("data-size", expectedSize)

  await expect
    .poll(
      async () => {
        const box = await avatar.boundingBox()
        if (!box) return false
        return Math.round(box.width) === Math.round(box.height) && box.width <= (expectedSize === "sm" ? 28 : 36)
      },
      { message: "author avatar should settle into a small circular box" },
    )
    .toBe(true)

  const box = await avatar.boundingBox()
  expect(box, "author avatar should have layout dimensions").not.toBeNull()
  expect(Math.round(box!.width), "author avatar should be a circle with equal width/height").toBe(Math.round(box!.height))
  expect(box!.width, "author avatar should be small, not a large profile image").toBeLessThanOrEqual(expectedSize === "sm" ? 28 : 36)

  const borderRadius = await avatar.evaluate((element) => Number.parseFloat(getComputedStyle(element).borderRadius))
  expect(borderRadius, "author avatar should render circular styling").toBeGreaterThanOrEqual(Math.floor(box!.width / 2))

  const visual = avatar.locator('[data-slot="avatar-image"], [data-slot="avatar-fallback"]').first()
  await expect(visual, "author avatar should show an image or fallback initial").toBeVisible()

  const name = avatar.locator("xpath=following-sibling::span[1]")
  await expect(name, "author name should be rendered next to avatar").toBeVisible()
  const authorName = (await name.innerText()).trim()
  expect(authorName, "author name should not be blank").not.toBe("")

  const fallback = avatar.locator('[data-slot="avatar-fallback"]').first()
  if ((await fallback.count()) > 0 && (await fallback.isVisible())) {
    await expect(fallback, "fallback should use the author's initial").toHaveText(new RegExp(`^${authorName.charAt(0)}$`, "i"))
  }

  return authorName
}

test.describe("blog rich-text rendering", () => {
  test("/blog lists posts as cards that link to a rendered post page", async ({ page }) => {
    const errors = trackConsoleErrors(page)
    await page.goto("/blog", { waitUntil: "domcontentloaded" })

    await expect(page.getByRole("heading", { level: 1, name: "From Akornafa" })).toBeVisible()

    const cards = page.locator('a[href^="/blog/"]')
    const count = await cards.count()

    if (count === 0) {
      await expect(page.getByText("No posts yet")).toBeVisible()
      expect(errors).toEqual([])
      return
    }

    await expect(cards.first()).toBeVisible()

    await cards.first().click()

    await expect(page).toHaveURL(/\/blog\/.+/)
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible()
    await expect(page.locator("article p").first()).toBeVisible()

    expect(errors).toEqual([])
  })

  test("blog list and detail pages render a circular author avatar/fallback with the author name", async ({ page }) => {
    const errors = trackConsoleErrors(page)
    await page.goto("/blog", { waitUntil: "domcontentloaded" })

    const cards = page.locator('a[href^="/blog/"]')
    await expect(cards.first(), "published blog cards should be available for the author regression").toBeVisible()

    const firstCard = cards.first()
    const listAuthorName = await expectCircularAuthor(firstCard, "sm")
    const postTitle = (await firstCard.locator("h3").innerText()).trim()

    await firstCard.click()
    await expect(page).toHaveURL(/\/blog\/.+/)
    await expect(page.getByRole("heading", { level: 1, name: postTitle })).toBeVisible()

    const article = page.locator("article")
    const detailAuthorName = await expectCircularAuthor(article, "default")
    expect(detailAuthorName.toLocaleLowerCase(), "detail author should match the blog list author").toBe(
      listAuthorName.toLocaleLowerCase(),
    )

    expect(errors).toEqual([])
  })

  test("blog detail pages show recent posts sidebar with a link back to all stories", async ({ page }) => {
    const errors = trackConsoleErrors(page)
    await page.goto("/blog", { waitUntil: "domcontentloaded" })

    const cards = page.locator('a[href^="/blog/"]')
    const blogLinks = Array.from(new Set(await cards.evaluateAll((links) =>
      links
        .map((link) => link.getAttribute("href"))
        .filter((href): href is string => Boolean(href) && href.startsWith("/blog/")),
    )))

    test.skip(blogLinks.length < 2, "At least two published posts are needed to populate a recent-post sidebar")

    for (const href of blogLinks.slice(0, 2)) {
      await page.goto(href, { waitUntil: "domcontentloaded" })
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible()

      const sidebarHeading = page.getByRole("heading", { level: 2, name: "Recently posted" })
      await expect(sidebarHeading, `${href} should render the recent posts sidebar`).toBeVisible()
      await expect(page.getByText("Keep reading")).toBeVisible()

      const sidebar = sidebarHeading.locator("xpath=ancestor::aside")
      await expect(sidebar.getByRole("link", { name: "View all stories" })).toHaveAttribute("href", "/blog")

      const sidebarPostLinks = sidebar.locator('a[href^="/blog/"]').filter({ hasNotText: "View all stories" })
      await expect(sidebarPostLinks.first(), `${href} should show at least one recent post link`).toBeVisible()
      await expect(sidebarPostLinks.first().getByRole("heading", { level: 3 })).toBeVisible()

      const sidebarHrefs = await sidebarPostLinks.evaluateAll((links) => links.map((link) => link.getAttribute("href")))
      expect(sidebarHrefs, "recent posts should not include the article currently being viewed").not.toContain(href)
    }

    expect(errors).toEqual([])
  })

  test("home page renders recent posts as blog cards", async ({ page }) => {
    const errors = trackConsoleErrors(page)
    await page.goto("/", { waitUntil: "domcontentloaded" })

    const heading = page.getByRole("heading", { name: "From the blog" })
    const hasSection = (await heading.count()) > 0

    if (!hasSection) {
      test.skip(true, "No published posts are available on the homepage")
      return
    }

    await expect(heading).toBeVisible()
    const section = heading.locator("xpath=ancestor::section")
    const firstCard = section.locator('a[href^="/blog/"]').first()
    await expect(firstCard).toBeVisible()
    await expectCircularAuthor(firstCard, "sm")

    expect(errors).toEqual([])
  })
})
