import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { TruncatedWriteup } from "@/components/memorial/TruncatedWriteup"

function words(count: number, prefix = "word") {
  return Array.from({ length: count }, (_, i) => `${prefix}${i}`).join(" ")
}

describe("TruncatedWriteup", () => {
  it("renders short text in full with no Read more trigger", () => {
    const text = words(50)
    render(
      <TruncatedWriteup
        text={text}
        label="Life story"
        memorialName="Jane Doe"
        photoUrl={null}
      />
    )
    expect(screen.getByText(text)).toBeInTheDocument()
    expect(screen.queryByRole("button", { name: "Read more" })).not.toBeInTheDocument()
  })

  it("renders text at exactly the 100-word limit in full", () => {
    const text = words(100)
    render(
      <TruncatedWriteup
        text={text}
        label="Life story"
        memorialName="Jane Doe"
        photoUrl={null}
      />
    )
    expect(screen.queryByRole("button", { name: "Read more" })).not.toBeInTheDocument()
  })

  it("truncates text over 100 words and shows a Read more trigger", () => {
    const text = words(150)
    render(
      <TruncatedWriteup
        text={text}
        label="Life story"
        memorialName="Jane Doe"
        photoUrl={null}
      />
    )
    expect(screen.getByRole("button", { name: "Read more" })).toBeInTheDocument()
    expect(screen.queryByText(text)).not.toBeInTheDocument()
  })

  it("opens a dialog with the full text, memorial name, and label on click", async () => {
    const text = words(150)
    const user = userEvent.setup()
    render(
      <TruncatedWriteup
        text={text}
        label="A message from the family"
        memorialName="Jane Doe"
        photoUrl={null}
      />
    )

    await user.click(screen.getByRole("button", { name: "Read more" }))

    expect(screen.getByRole("dialog")).toBeInTheDocument()
    expect(screen.getByText("Jane Doe")).toBeInTheDocument()
    expect(screen.getByText("A message from the family")).toBeInTheDocument()
    expect(screen.getByText(text)).toBeInTheDocument()
  })
})
