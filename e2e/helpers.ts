import type { Page } from "@playwright/test"

/** Collects console/page errors so a test can assert none occurred. */
export function trackConsoleErrors(page: Page): string[] {
  const errors: string[] = []
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text())
  })
  page.on("pageerror", (err) => errors.push(String(err)))
  return errors
}
