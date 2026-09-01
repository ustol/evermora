import { render, screen, within } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import DesignSystemPage from "./page"

describe("DesignSystemPage", () => {
  it("renders the public design-system heading and admin analytics component sections", () => {
    const { container } = render(<DesignSystemPage />)

    expect(screen.getByText("Akornafa / Evermora Design System")).toBeVisible()
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Memorial admin foundations & components",
      }),
    ).toBeVisible()
    expect(screen.getByRole("link", { name: "Back to site" })).toHaveAttribute("href", "/")

    const main = screen.getByRole("main")
    expect(within(main).getByRole("heading", { level: 2, name: "Color system" })).toBeVisible()
    expect(within(main).getByRole("heading", { level: 2, name: "Buttons" })).toBeVisible()
    expect(within(main).getByRole("heading", { level: 2, name: "Admin analytics surfaces" })).toBeVisible()
    expect(within(main).getByText(/Use this pattern for dashboard UI/i)).toBeVisible()

    expect(container.querySelector("#design-read")).toBeInTheDocument()
    expect(container.querySelector("#colors")).toBeInTheDocument()
    expect(container.querySelector("#analytics-surfaces")).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Admin analytics" })).toHaveAttribute("href", "#analytics-surfaces")
  })
})
