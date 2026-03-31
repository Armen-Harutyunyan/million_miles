export const formatCarTitle = (brand: string, model: string): string => {
  const normalizedBrand = brand.trim()
  const normalizedModel = model.trim()

  return `${normalizedBrand} ${normalizedModel}`.trim()
}
