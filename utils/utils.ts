export const truncateString = (str: string, max = 100) => {
  if (str && str.length > max) {
    return str.substring(0, max) + '...'
  }
  return str
}
