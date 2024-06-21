export const truncateString = (str: string, max = 100) => {
  if (str && str.length > max) {
    return str.substring(0, max) + '...'
  }
  return str
}

export const getFormattedDate = (iso: string, locale = 'en-US') => {
  const date = new Date(iso)

  const formattedDate = date.toLocaleString(locale, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return formattedDate
}
