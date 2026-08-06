import type { Page } from "@playwright/test"

/** Collects console/page errors so a test can assert none occurred. */
export function trackConsoleErrors(page: Page): string[] {
  const errors: string[] = []
  const shouldIgnore = (message: string) => message === "Error: Connection closed."
  page.on("console", (msg) => {
    if (msg.type() === "error" && !shouldIgnore(msg.text())) errors.push(msg.text())
  })
  page.on("pageerror", (err) => {
    const message = String(err)
    if (!shouldIgnore(message)) errors.push(message)
  })
  return errors
}
