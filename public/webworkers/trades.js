const apiKey = 'coh8lv9r01qrf6b2ea30coh8lv9r01qrf6b2ea3g'
const pricesWs = new WebSocket(
  'wss://ws.coincap.io/prices?assets=bitcoin,ethereum,monero,litecoin',
)

const initTrades = async () => {
  pricesWs.addEventListener('message', function (event) {
    self.postMessage(JSON.parse(event.data))
  })
}

this.onmessage = async (e) => {
  console.log('Message received from main script')
  const data = e.data

  initTrades()
}
