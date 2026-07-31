import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton"

describe("GoogleSignInButton", () => {
  it("renders a form-based submit button for the Google OAuth route", () => {
    render(<GoogleSignInButton redirectUrl="/dashboard/memorials/new" />)

    const button = screen.getByRole("button", { name: "Continue with Google" })
    const form = button.closest("form")
    expect(form).toHaveAttribute("action", "/api/auth/sign-in/google")
    expect(form).toHaveAttribute("method", "get")

    const redirectInput = screen.getByDisplayValue("/dashboard/memorials/new")
    expect(redirectInput).toHaveAttribute("type", "hidden")
    expect(redirectInput).toHaveAttribute("name", "redirect_url")
    expect(button).toHaveAttribute("type", "submit")
  })

  it("defaults the OAuth redirect target to the dashboard", () => {
    render(<GoogleSignInButton />)

    expect(screen.getByDisplayValue("/dashboard")).toHaveAttribute("name", "redirect_url")
  })
})
