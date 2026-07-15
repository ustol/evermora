const COMBINING_DIACRITICS = /[̀-ͯ]/g

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(COMBINING_DIACRITICS, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}
