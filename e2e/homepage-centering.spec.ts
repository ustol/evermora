import { expect, test } from "@playwright/test"
import { trackConsoleErrors } from "./helpers"

test.describe("homepage centering and FeatureCard variant", () => {
  test("How it works section has centered heading and step cards", async ({ page }) => {
    const errors = trackConsoleErrors(page)
    await page.goto("/")

    const howItWorksHeading = page.getByRole("heading", { name: "How it works" })
    await expect(howItWorksHeading).toBeVisible()
    // Check that the heading has text-center via computed style or class
    await expect(howItWorksHeading).toHaveClass(/text-center/)

    // StepCard items should be centered
    const stepCards = page.locator(".flex.flex-col.items-center.gap-3.text-center")
    await expect(stepCards).toHaveCount(4) // 4 steps

    // Each step card should have a step number circle
    const stepNumbers = page.locator(".flex.size-9.items-center.justify-center.rounded-full")
    await expect(stepNumbers).toHaveCount(4)

    expect(errors).toEqual([])
  })

  test("Features section has dark background and dark variant FeatureCards", async ({ page }) => {
    const errors = trackConsoleErrors(page)
    await page.goto("/")

    // The heading uses &rsquo; → right single quotation mark (U+2019)
    const featuresHeading = page.getByRole("heading", {
      name: /Everything a family needs, nothing they don/,
    })
    await expect(featuresHeading).toBeVisible()
    await expect(featuresHeading).toHaveClass(/text-center/)

    // The features section container should have the dark bg
    const darkSection = page.locator("section.border-y.border-border\\/60.bg-obsidian")
    await expect(darkSection).toBeVisible()

    // Within that section, FeatureCards should exist and have dark variant styling
    const featureCards = darkSection.locator(".flex.flex-col.rounded-2xl.border.p-6")
    await expect(featureCards).toHaveCount(6) // 6 features

    // Dark variant FeatureCards should have centered items
    const darkFeatureCards = darkSection.locator(".items-center.text-center.border-white\\/10")
    await expect(darkFeatureCards).toHaveCount(6)

    // Feature titles should be visible
    await expect(featureCards.first().getByRole("heading")).toBeVisible()
    await expect(featureCards.first().locator("p")).toBeVisible()

    // Icon circle should be present in each card
    const iconCircles = featureCards.locator(".flex.size-10.items-center.justify-center.rounded-full")
    await expect(iconCircles).toHaveCount(6)

    expect(errors).toEqual([])
  })

  test("Recently published section has centered heading and View all link below cards", async ({ page }) => {
    const errors = trackConsoleErrors(page)
    await page.goto("/")

    const recentlyHeading = page.getByRole("heading", { name: "Recently published" })
    await expect(recentlyHeading).toBeVisible()
    // text-center is on the parent wrapper div, not the heading itself
    const recentlyWrapper = recentlyHeading.locator("..")
    await expect(recentlyWrapper).toHaveClass(/text-center/)

    // The "View all" link should exist and be below the heading area
    const viewAllLink = page.getByRole("link", { name: "View all" })
    await expect(viewAllLink).toBeVisible()
    await expect(viewAllLink).toHaveAttribute("href", "/memorials")

    // The parent container of View all should be a centered div
    const viewAllContainer = viewAllLink.locator("..")
    await expect(viewAllContainer).toHaveClass(/text-center/)

    expect(errors).toEqual([])
  })

  test("Bottom story/moderation section is centered with mx-auto paragraphs", async ({ page }) => {
    const errors = trackConsoleErrors(page)
    await page.goto("/")

    const lastingHeading = page.getByRole("heading", { name: "A lasting life story" })
    await expect(lastingHeading).toBeVisible()
    const lastingParent = lastingHeading.locator("..")
    await expect(lastingParent).toHaveClass(/text-center/)

    // The paragraph next to the heading should have mx-auto
    const lastingParagraph = lastingParent.locator("p.mx-auto")
    await expect(lastingParagraph).toBeVisible()

    const moderationHeading = page.getByRole("heading", { name: "Built for moderation" })
    await expect(moderationHeading).toBeVisible()
    const moderationParent = moderationHeading.locator("..")
    await expect(moderationParent).toHaveClass(/text-center/)

    const moderationParagraph = moderationParent.locator("p.mx-auto")
    await expect(moderationParagraph).toBeVisible()

    expect(errors).toEqual([])
  })

  test("Home page renders without console errors (regression)", async ({ page }) => {
    const errors = trackConsoleErrors(page)
    await page.goto("/")
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible()
    expect(errors).toEqual([])
  })
})
