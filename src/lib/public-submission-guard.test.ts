import { describe, expect, it } from "vitest"
import type { NextRequest } from "next/server"
import {
  assertPublicSubmissionAllowed,
  getSafePublicError,
  PublicSubmissionError,
} from "./public-submission-guard"

function requestStub({
  contentLength,
  ip = crypto.randomUUID(),
  path = `/api/memorials/${crypto.randomUUID()}/contributions`,
}: {
  contentLength?: string
  ip?: string
  path?: string
} = {}) {
  return {
    headers: new Headers({
      ...(contentLength ? { "content-length": contentLength } : {}),
      "x-forwarded-for": ip,
    }),
    nextUrl: { pathname: path },
  } as NextRequest
}

describe("public submission guard", () => {
  it("rejects public multipart requests above the shared upload size limit", () => {
    expect(() =>
      assertPublicSubmissionAllowed(requestStub({ contentLength: `${10 * 1024 * 1024 + 1}` })),
    ).toThrowError(new PublicSubmissionError("That upload is too large. Please choose a smaller file.", 413))
  })

  it("rate limits repeated submissions for the same visitor and endpoint", () => {
    const ip = `203.0.113.${Math.floor(Math.random() * 1000)}`
    const path = `/api/memorials/${crypto.randomUUID()}/photos`

    for (let count = 0; count < 20; count += 1) {
      expect(() => assertPublicSubmissionAllowed(requestStub({ ip, path }))).not.toThrow()
    }

    expect(() => assertPublicSubmissionAllowed(requestStub({ ip, path }))).toThrowError(
      new PublicSubmissionError("Too many submissions. Please wait a few minutes and try again.", 429),
    )
  })

  it("does not leak internal error details in public responses", () => {
    expect(getSafePublicError(new Error("database password leaked in stack"))).toEqual({
      message: "Something went wrong. Please try again.",
      status: 500,
    })
    expect(getSafePublicError(new PublicSubmissionError("Please choose a photo to upload."))).toEqual({
      message: "Please choose a photo to upload.",
      status: 400,
    })
  })
})
