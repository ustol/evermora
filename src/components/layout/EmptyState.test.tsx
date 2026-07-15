import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import { HeartHandshake } from "lucide-react"
import { EmptyState } from "@/components/layout/EmptyState"

describe("EmptyState", () => {
  it("renders the title", () => {
    render(<EmptyState title="No memorials yet" />)
    expect(screen.getByText("No memorials yet")).toBeInTheDocument()
  })

  it("renders the description when provided", () => {
    render(<EmptyState title="No memorials yet" description="Create your first one." />)
    expect(screen.getByText("Create your first one.")).toBeInTheDocument()
  })

  it("omits the description when not provided", () => {
    render(<EmptyState title="No memorials yet" />)
    expect(screen.queryByText("Create your first one.")).not.toBeInTheDocument()
  })

  it("renders the icon when provided", () => {
    const { container } = render(
      <EmptyState title="No memorials yet" icon={HeartHandshake} />
    )
    expect(container.querySelector("svg")).toBeInTheDocument()
  })

  it("renders the action when provided", () => {
    render(
      <EmptyState
        title="No memorials yet"
        action={<button type="button">Create a memorial</button>}
      />
    )
    expect(
      screen.getByRole("button", { name: "Create a memorial" })
    ).toBeInTheDocument()
  })
})
