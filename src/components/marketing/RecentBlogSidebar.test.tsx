import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { RecentBlogSidebar, type RecentBlogPost } from "@/components/marketing/RecentBlogSidebar"

const posts: RecentBlogPost[] = [
  {
    slug: "planning-a-memorial-service",
    title: "Planning a memorial service with care",
    excerpt: "A practical guide for families preparing an announcement.",
    coverImageUrl: "https://example.com/cover.jpg",
    publishedAt: "2025-01-05T09:00:00.000Z",
  },
  {
    slug: "writing-a-tribute",
    title: "Writing a tribute that feels personal",
    excerpt: null,
    coverImageUrl: null,
    publishedAt: null,
  },
]

describe("RecentBlogSidebar", () => {
  it("does not render an empty sidebar when there are no recent posts", () => {
    const { container } = render(<RecentBlogSidebar posts={[]} />)

    expect(container).toBeEmptyDOMElement()
    expect(screen.queryByRole("complementary")).not.toBeInTheDocument()
  })

  it("renders a labelled recent-posts rail with story links and the all-stories link", () => {
    const { container } = render(<RecentBlogSidebar posts={posts} />)

    const sidebar = screen.getByRole("complementary", { name: "Recently posted" })
    expect(sidebar).toBeVisible()
    expect(screen.getByText("Keep reading")).toBeVisible()
    expect(screen.getByRole("heading", { level: 2, name: "Recently posted" })).toBeVisible()

    const firstStory = screen.getByRole("link", { name: /Planning a memorial service with care/i })
    expect(firstStory).toHaveAttribute("href", "/blog/planning-a-memorial-service")
    expect(screen.getByText("A practical guide for families preparing an announcement.")).toBeVisible()
    expect(screen.getByText("5 January 2025")).toBeVisible()
    expect(container.querySelector('img[src="https://example.com/cover.jpg"]')).toBeInTheDocument()

    const secondStory = screen.getByRole("link", { name: /Writing a tribute that feels personal/i })
    expect(secondStory).toHaveAttribute("href", "/blog/writing-a-tribute")
    expect(secondStory).toHaveTextContent("Recent post")
    expect(container.querySelector("svg[aria-hidden='true']")).toBeInTheDocument()

    expect(screen.getByRole("link", { name: /View all stories/i })).toHaveAttribute("href", "/blog")
  })
})
