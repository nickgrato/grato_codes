'use client'

import { useEffect, useState, ChangeEvent } from 'react'
import Menu from '@Modules/chat/Menu/Menu'
import styles from './page.module.scss'
import Card from '@Shared/Card/Card'
import {
  getUser,
  getObsidianData,
  updateObsidianData,
} from 'services/users.service'
import { UserT } from 'types'
import { Button, Input } from '@mozilla/lilypad-ui'
import SkeletonCard from '@Shared/SkeletonCard/SkeletonCard'
import { ObsidianT } from 'types'
import { LocalStorage } from 'const/LocalStorage'
import { localStorageUtil } from 'utils/locaStorageUtil'

const getUrl = () => {
  return localStorageUtil.getItem(LocalStorage.BROADCAST_URL)
}

const Page = () => {
  const [profile, setProfile] = useState<UserT>()
  const [newObsidianKey, setNewObsidianKey] = useState<string>('')
  const [newBroadcastUrl, setNewBroadcastUrl] = useState(getUrl())
  const [obsidianData, setObsidianData] = useState<ObsidianT>({
    id: '',
    userId: '',
    apiKey: '',
  })
  const [isLoading, setIsLoading] = useState<boolean>(true)
  useEffect(() => {
    const getUserData = async () => {
      const data = await getUser()
      setProfile(data)
      setIsLoading(false)
    }

    const getObsidianApiKey = async () => {
      const data = await getObsidianData()
      setObsidianData(data)
      setNewObsidianKey(data.apiKey)
    }
    getUserData()
    getObsidianApiKey()
  }, [])

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    const resp = await updateObsidianData({
      ...obsidianData,
      apiKey: newObsidianKey,
    })
    console.log('resp', resp)
  }

  const saveBroadcastUrl = () => {
    if (!newBroadcastUrl) return
    localStorageUtil.setItem(LocalStorage.BROADCAST_URL, newBroadcastUrl)
  }

  return (
    <section className={styles.page}>
      <Menu />

      <section className={styles.wrapper}>
        <section className={styles.container}>
          <Card className={styles.card}>
            {isLoading ? (
              <SkeletonCard qty={3} category="row" />
            ) : (
              <>
                <h2 className="heading-md mb-24">Profile</h2>
                <div className="mb-12">
                  <span className="body-md-bold mr-12">Username:</span>
                  <span className="body-md ">{profile?.username}</span>
                </div>
                <div className="mb-12">
                  <span className="body-md-bold mr-12">Email:</span>
                  <span className="body-md ">{profile?.email}</span>
                </div>

                <hr />

                <form className="mb-12 items-center" onSubmit={handleSubmit}>
                  <Input
                    className="mb-12"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setNewObsidianKey(e.target.value)
                    }
                    value={newObsidianKey}
                    name="Obsidian_Key"
                    placeholder="Obsidian Key"
                    label="Obsidian Key"
                  />
                  <Button
                    type="submit"
                    text="Submit"
                    className="ml-12"
                    category="primary_clear"
                  />
                </form>
                <section className="mb-12 items-center">
                  <Input
                    className="mb-12"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setNewBroadcastUrl(e.target.value)
                    }
                    value={newBroadcastUrl}
                    name="broadcast_url"
                    placeholder="Broadcast URL"
                    label="Broadcast URL"
                  />
                  <Button
                    type="submit"
                    text="Submit"
                    className="ml-12"
                    category="primary_clear"
                    onClick={() => {
                      saveBroadcastUrl()
                    }}
                  />
                </section>
              </>
            )}
          </Card>
        </section>
      </section>
    </section>
  )
}

export default Page
