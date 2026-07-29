/** Ghana's 16 administrative regions, current as of the 2018/2019 split. */
export const GHANA_REGIONS = [
  "Ahafo",
  "Ashanti",
  "Bono",
  "Bono East",
  "Central",
  "Eastern",
  "Greater Accra",
  "North East",
  "Northern",
  "Oti",
  "Savannah",
  "Upper East",
  "Upper West",
  "Volta",
  "Western",
  "Western North",
] as const

export const ghanaRegionOptions: { value: string; label: string }[] =
  GHANA_REGIONS.map((region) => ({ value: region, label: region }))
