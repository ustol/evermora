import { expect, test, type Page, type Request } from "@playwright/test"
import { trackConsoleErrors } from "./helpers"

const memorialPath = "/memorials/konto-2"
const contributionApiPath = "/api/memorials/konto-2/contributions"
const galleryPhotoApiPath = "/api/memorials/konto-2/photos"

async function mockSuccessfulPost(page: Page, apiPath: string) {
  await page.route(`**${apiPath}`, async (route) => {
    expect(route.request().method()).toBe("POST")
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ ok: true, pending: true }),
    })
  })
}

function isPostTo(apiPath: string) {
  return (request: Request) => request.method() === "POST" && request.url().includes(apiPath)
}

function pngFile(name: string) {
  return {
    name,
    mimeType: "image/png",
    buffer: Buffer.from(
      "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/p9sAAAAASUVORK5CYII=",
      "base64"
    ),
  }
}

test("signed-out visitors can submit a text-only tribute from the real konto-2 memorial", async ({
  page,
}) => {
  const errors = trackConsoleErrors(page)
  await mockSuccessfulPost(page, contributionApiPath)

  await page.goto(memorialPath, { waitUntil: "networkidle" })
  await page.getByRole("button", { name: /^Leave a message$/i }).click()

  await expect(page).not.toHaveURL(/sign-in/)
  const dialog = page.getByRole("dialog", { name: /leave a message/i })
  await expect(dialog).toBeVisible()

  await dialog.getByLabel(/your name/i).fill("Playwright Visitor")
  await dialog.getByLabel(/^message$/i).fill("Remembering Konto with warmth and gratitude.")

  const [request] = await Promise.all([
    page.waitForRequest(isPostTo(contributionApiPath)),
    dialog.getByTestId("tribute-submit").click(),
  ])
  const multipartBody = request.postDataBuffer()?.toString("utf8") ?? ""

  expect(multipartBody).toContain('name="type"')
  expect(multipartBody).toContain("tribute")
  expect(multipartBody).toContain('name="authorName"')
  expect(multipartBody).toContain("Playwright Visitor")
  expect(multipartBody).toContain('name="message"')
  expect(multipartBody).toContain("Remembering Konto with warmth and gratitude.")
  expect(multipartBody).not.toContain('name="photo"')

  await expect(page).not.toHaveURL(/sign-in/)
  await expect(page.getByText(/thank you/i)).toBeVisible()
  await expect(dialog).toBeHidden()
  expect(errors).toEqual([])
})

test("signed-out visitors can submit a condolence with an optional photo from the real konto-2 memorial", async ({
  page,
}) => {
  const errors = trackConsoleErrors(page)
  await mockSuccessfulPost(page, contributionApiPath)

  await page.goto(memorialPath, { waitUntil: "networkidle" })
  await page.getByRole("button", { name: /^Leave a message$/i }).click()

  await expect(page).not.toHaveURL(/sign-in/)
  const dialog = page.getByRole("dialog", { name: /leave a message/i })
  await expect(dialog).toBeVisible()

  await dialog.getByRole("button", { name: /^Condolence$/i }).click()
  await dialog.getByLabel(/your name/i).fill("Unauthenticated Friend")
  await dialog.getByLabel(/relationship/i).fill("Friend")
  await dialog.getByLabel(/^message$/i).fill("Sending condolences and a favorite memory in photo form.")
  const tributePhotoInput = dialog.locator("#tribute-photo")
  await tributePhotoInput.setInputFiles(pngFile("condolence-memory.png"))
  await expect(tributePhotoInput).toHaveJSProperty("files.length", 1)

  const [request] = await Promise.all([
    page.waitForRequest(isPostTo(contributionApiPath)),
    dialog.getByTestId("tribute-submit").click(),
  ])
  const multipartBody = request.postDataBuffer()?.toString("utf8") ?? ""

  expect(multipartBody).toContain('name="type"')
  expect(multipartBody).toContain("condolence")
  expect(multipartBody).toContain('name="relationship"')
  expect(multipartBody).toContain("Friend")
  expect(multipartBody).toContain('name="message"')
  expect(multipartBody).toContain("Sending condolences and a favorite memory in photo form.")
  expect(multipartBody).toContain('name="photo"')
  expect(multipartBody).toContain("condolence-memory.png")

  await expect(page).not.toHaveURL(/sign-in/)
  await expect(page.getByText(/thank you/i)).toBeVisible()
  await expect(dialog).toBeHidden()
  expect(errors).toEqual([])
})

test("signed-out visitors can add a gallery photo from the real konto-2 memorial", async ({
  page,
}) => {
  const errors = trackConsoleErrors(page)
  await mockSuccessfulPost(page, galleryPhotoApiPath)

  await page.goto(memorialPath, { waitUntil: "networkidle" })
  await page.getByRole("button", { name: /^Add a photo$/i }).click()

  await expect(page).not.toHaveURL(/sign-in/)
  const dialog = page.getByRole("dialog", { name: /^Add a photo$/i })
  await expect(dialog).toBeVisible()
  await expect(dialog.getByText(/no account is needed/i)).toBeVisible()

  await dialog.locator("#gallery-photo-upload").setInputFiles(pngFile("gallery-memory.png"))
  await expect(dialog.getByAltText(/selected gallery upload preview/i)).toBeVisible()
  await dialog.getByLabel(/caption/i).fill("A shared memory from the service")

  const [request] = await Promise.all([
    page.waitForRequest(isPostTo(galleryPhotoApiPath)),
    dialog.getByTestId("gallery-photo-submit").click(),
  ])
  const multipartBody = request.postDataBuffer()?.toString("utf8") ?? ""

  expect(multipartBody).toContain('name="photo"')
  expect(multipartBody).toContain("gallery-memory.png")
  expect(multipartBody).toContain('name="caption"')
  expect(multipartBody).toContain("A shared memory from the service")

  await expect(page).not.toHaveURL(/sign-in/)
  await expect(page.getByText(/thank you/i)).toBeVisible()
  await expect(dialog).toBeHidden()
  expect(errors).toEqual([])
})
