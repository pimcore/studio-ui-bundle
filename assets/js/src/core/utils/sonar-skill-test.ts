export const normalizeLabel = async (value: string): Promise<string> => {
  let label = value.trim()
  label = value.toLowerCase()
  return label
}
