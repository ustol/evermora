import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { beforeEach, describe, expect, it, vi } from "vitest"
import { TributeFormDialog } from "./TributeFormDialog"
import { TributesSection } from "./TributesSection"

let signedIn = true
const createObjectURL = vi.fn(() => "blob:tribute-preview")

vi.mock("@/hooks/useAuth", () => ({
  useUser: () => ({
    isSignedIn: signedIn,
    user: signedIn ? { id: "user_123" } : null,
  }),
}))

vi.mock("@/hooks/useSupabaseClient", () => ({
  useSupabaseClient: () => ({}),
}))

const defaultProps = {
  memorialId: "memorial_123",
  slug: "mahatma-ghandi-lotsu",
  allowTributes: true,
  allowCondolences: true,
  requireApproval: true,
}

beforeEach(() => {
  signedIn = true
  createObjectURL.mockClear()
  Object.defineProperty(URL, "createObjectURL", {
    configurable: true,
    value: createObjectURL,
  })
})

describe("TributeFormDialog", () => {
  it("shows the optional photo upload section independently of standalone gallery photos", async () => {
    const user = userEvent.setup()

    render(<TributeFormDialog {...defaultProps} />)
    await user.click(screen.getByRole("button", { name: /leave a message/i }))

    const input = screen.getByLabelText(/photo \(optional\)/i)
    expect(input).toHaveAttribute("type", "file")
    expect(input).toHaveAttribute("accept", "image/jpeg,image/png,image/webp")
    expect(screen.getByText(/add a picture to accompany your message/i)).toBeInTheDocument()
  })

  it("keeps the photo upload available from the tributes section without contributor gallery settings", async () => {
    const user = userEvent.setup()

    render(
      <TributesSection
        memorialId="memorial_123"
        slug="mahatma-ghandi-lotsu"
        allowTributes
        allowCondolences
        requireApproval
        showContributorNames={false}
      />,
    )
    await user.click(screen.getByRole("button", { name: /leave a message/i }))

    expect(screen.getByLabelText(/photo \(optional\)/i)).toHaveAttribute("type", "file")
    expect(screen.getByText(/add a picture to accompany your message/i)).toBeInTheDocument()
  })

  it("previews and removes a selected optional message photo", async () => {
    const user = userEvent.setup()
    const photo = new File(["image-bytes"], "memory.png", { type: "image/png" })

    render(<TributeFormDialog {...defaultProps} />)
    await user.click(screen.getByRole("button", { name: /leave a message/i }))
    await user.upload(screen.getByLabelText(/photo \(optional\)/i), photo)

    expect(createObjectURL).toHaveBeenCalledWith(photo)
    expect(screen.getByAltText("Selected tribute attachment preview")).toHaveAttribute(
      "src",
      "blob:tribute-preview",
    )

    await user.click(screen.getByRole("button", { name: /remove selected photo/i }))
    expect(screen.queryByAltText("Selected tribute attachment preview")).not.toBeInTheDocument()
  })

  it("keeps the photo section visible for signed-out visitors with a sign-in prompt", async () => {
    signedIn = false
    const user = userEvent.setup()

    render(<TributeFormDialog {...defaultProps} />)
    await user.click(screen.getByRole("button", { name: /leave a message/i }))

    expect(screen.getByText(/photo \(optional\)/i)).toBeInTheDocument()
    expect(screen.getByText(/add a picture to accompany your message/i)).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /sign in/i })).toHaveAttribute(
      "href",
      "/sign-in?redirect_url=%2Fmemorials%2Fmahatma-ghandi-lotsu",
    )
    expect(screen.queryByLabelText(/photo \(optional\)/i)).not.toBeInTheDocument()
  })
})
