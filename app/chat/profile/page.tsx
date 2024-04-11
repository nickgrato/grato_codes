'use client'

import { useEffect, useState, ChangeEvent } from 'react'
import Menu from '@Modules/chat/Menu/Menu'
import styles from './page.module.scss'
import Card from '@Shared/Card/Card'
import { getUser } from 'services/users.service'
import { UserT } from 'types'
import { Button, Input } from '@mozilla/lilypad-ui'

const Page = () => {
  const [profile, setProfile] = useState<UserT>()
  const [newObsidianKey, setNewObsidianKey] = useState<string>('')

  useEffect(() => {
    const getData = async () => {
      const data = await getUser()
      console.log('data', data)
      if (!data) return

      setProfile(data)
      data.obsidianKey && setNewObsidianKey(data.obsidianKey)
    }
    getData()
  }, [])

  const onKeyChange = () => {}

  return (
    <section className={styles.page}>
      <Menu />

      <section className={styles.wrapper}>
        <section className={styles.container}>
          <Card classProp={styles.card}>
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

            <form className="mb-12">
              <Input
                classProp="mb-12"
                onChange={setNewObsidianKey}
                value={newObsidianKey}
                name="Obsidian_Key"
                placeholder="Obsidian Key"
                label="Update / Add Obsidian Key"
              />
              <div className="justify-end">
                <Button type="submit" text="Submit" />
              </div>
            </form>
          </Card>
        </section>
      </section>
    </section>
  )
}

export default Page
