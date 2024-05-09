const apiKey = 'coh8lv9r01qrf6b2ea30coh8lv9r01qrf6b2ea3g'

const getData = async (symbol) => {
  try {
    const response = await fetch(
      `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`,
    )
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}

self.onmessage = async (e) => {
  console.log('Message received from main script')
  const data = e.data

  const result = await getData(data.symbol)
  self.postMessage(result)

  setInterval(async () => {
    const result = await getData(data.symbol)
    self.postMessage(result)
  }, 2000)
}
