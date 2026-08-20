import { render, screen, within } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import DesignSystemPage from "./page"

describe("DesignSystemPage", () => {
  it("renders the public design-system heading and editorial component sections", () => {
    const { container } = render(<DesignSystemPage />)

    expect(screen.getByText("Akornafa Design System")).toBeVisible()
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Editorial foundations & components",
      }),
    ).toBeVisible()
    expect(screen.getByRole("link", { name: "Back to site" })).toHaveAttribute("href", "/")

    const main = screen.getByRole("main")
    expect(within(main).getByRole("heading", { level: 2, name: "Color system" })).toBeVisible()
    expect(within(main).getByRole("heading", { level: 2, name: "Buttons" })).toBeVisible()
    expect(within(main).getByRole("heading", { level: 2, name: "Editorial sidebar" })).toBeVisible()
    expect(within(main).getByText(/Use this pattern for blog detail pages/i)).toBeVisible()

    expect(container.querySelector("#design-read")).toBeInTheDocument()
    expect(container.querySelector("#colors")).toBeInTheDocument()
    expect(container.querySelector("#editorial-sidebar")).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Editorial sidebar" })).toHaveAttribute("href", "#editorial-sidebar")
  })
})
