'use client'

// import { useEffect, useRef, useState } from 'react'
// import { Button } from '@mozilla/lilypad-ui'
import styles from './page.module.scss'
// import { CryptoWorkConfigT, WorkerMessageT } from 'workers/types'
// import Card from '@Shared/Card/Card'

type CryptoDataT = {
  bitcoin: string
  ethereum: string
  monero: string
  litecoin: string
}

const page = () => {
  // const workerRef = useRef<Worker>()
  // const initPrice = 'waiting for data...'
  // const [status, setStatus] = useState<string>('Stopped')
  // const [prices, setPrices] = useState<CryptoDataT>({
  //   bitcoin: '',
  //   ethereum: '',
  //   monero: '',
  //   litecoin: '',
  // })

  // useEffect(() => {
  //   workerRef.current = new Worker('/workers/crypto/crypto.js', {
  //     type: 'module',
  //   })
  //   workerRef.current.onmessage = (event) => {
  //     setPrices((prev) => {
  //       const newState = { ...prev, ...event.data }
  //       return newState
  //     })
  //   }
  //   workerRef.current.onerror = (error) => {
  //     console.error('Worker error:', error)
  //   }
  //   return () => {
  //     if (workerRef.current) {
  //       workerRef.current.terminate()
  //     }
  //   }
  // }, [])

  // const startWorker = () => {
  //   setStatus('Running')

  //   const workerMessage: WorkerMessageT<CryptoWorkConfigT> = {
  //     type: 'init',
  //     payload: {
  //       data: {
  //         assets: 'bitcoin,ethereum,monero,litecoin',
  //       },
  //     },
  //   }
  //   if (workerRef.current) {
  //     workerRef.current.postMessage(workerMessage)
  //   }
  // }

  // const stopWorker = () => {
  //   setStatus('Stopped')
  //   const workerMessage: WorkerMessageT<CryptoWorkConfigT> = {
  //     type: 'stop',
  //   }
  //   if (workerRef.current) {
  //     workerRef.current.postMessage(workerMessage)
  //   }
  // }

  // const terminateWorker = () => {
  //   setStatus('Terminated')
  //   const workerMessage: WorkerMessageT<CryptoWorkConfigT> = {
  //     type: 'stop',
  //   }
  //   if (workerRef.current) {
  //     workerRef.current.postMessage(workerMessage)
  //     workerRef.current.terminate()
  //   }
  // }

  return (
    <section className={styles.page}>
      {/* <Card size="large" className={styles.card}>
        <div className="mb-40 gap-12">
          <Button onClick={startWorker} text="Start stream" />
          <Button
            onClick={stopWorker}
            text="Stop stream"
            category="primary_outline"
          />
          <Button
            icon="trash"
            onClick={terminateWorker}
            text="Terminate Worker"
            category="primary_clear"
          />
        </div>
        <div>
          <h2 className="heading-md mb-12">Stream data: {status}</h2>
          <p className="mb-40 body-sm">
            This page uses a Web Worker to stream cryptocurrency prices from
            CoinCap.io. The worker is started when you click the "Start stream"
            button and stopped when you click the "End stream" button.
          </p>
          <div className="gap-12 flex-col">
            {Object.keys(prices).map((key) => {
              const price = prices[key as keyof CryptoDataT]
              return (
                <div key={key}>
                  <span className="mr-12 capitalize">{key}:</span>
                  <span className={`${!price && 'opacity-20'}`}>
                    {price ? '$' + price : initPrice}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </Card> */}
    </section>
  )
}

export default page
