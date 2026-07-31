type AuthMetadata = Record<string, unknown> | null | undefined

function metadataString(metadata: AuthMetadata, key: string): string | undefined {
  const value = metadata?.[key]
  return typeof value === "string" && value.trim() ? value.trim() : undefined
}

function splitDisplayName(name: string): { firstName: string; lastName: string } {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  return {
    firstName: parts[0] ?? "",
    lastName: parts.slice(1).join(" "),
  }
}

export function getAppManagedDisplayName(metadata: AuthMetadata): string | undefined {
  if (metadataString(metadata, "profile_name_source") === "provider") return undefined

  const nameFromParts = [metadataString(metadata, "first_name"), metadataString(metadata, "last_name")].filter(Boolean).join(" ")
  return metadataString(metadata, "display_name") ?? (nameFromParts || undefined)
}

export function getProviderDisplayName(metadata: AuthMetadata): string | undefined {
  return metadataString(metadata, "full_name") ?? metadataString(metadata, "name")
}

export function getAuthDisplayName(metadata: AuthMetadata, email?: string | null): string {
  return getAppManagedDisplayName(metadata) ?? getProviderDisplayName(metadata) ?? email ?? "Akornafa user"
}

export function getAuthNameParts(metadata: AuthMetadata): { firstName: string; lastName: string } {
  const firstName = metadataString(metadata, "first_name") ?? ""
  const lastName = metadataString(metadata, "last_name") ?? ""
  if (firstName || lastName) return { firstName, lastName }

  const displayName = metadataString(metadata, "display_name") ?? getProviderDisplayName(metadata)
  if (displayName) return splitDisplayName(displayName)

  return { firstName: "", lastName: "" }
}

export function getProviderNameParts(metadata: AuthMetadata): { firstName: string; lastName: string } {
  const providerName = getProviderDisplayName(metadata)
  if (providerName) return splitDisplayName(providerName)
  return { firstName: "", lastName: "" }
}
