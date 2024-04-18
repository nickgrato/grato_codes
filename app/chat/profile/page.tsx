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

const Page = () => {
  const [profile, setProfile] = useState<UserT>()
  const [newObsidianKey, setNewObsidianKey] = useState<string>('')
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

  return (
    <section className={styles.page}>
      <Menu />

      <section className={styles.wrapper}>
        <section className={styles.container}>
          <Card classProp={styles.card}>
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

                <form className="mb-12" onSubmit={handleSubmit}>
                  <Input
                    classProp="mb-12"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setNewObsidianKey(e.target.value)
                    }
                    value={newObsidianKey}
                    name="Obsidian_Key"
                    placeholder="Obsidian Key"
                    label="Update / Add Obsidian Key"
                  />
                  <div className="justify-end">
                    <Button type="submit" text="Submit" />
                  </div>
                </form>
              </>
            )}
          </Card>
        </section>
      </section>
    </section>
  )
}

export default Page
