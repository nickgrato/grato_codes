'use client'

import styles from './SettingsScreen.module.scss'
import { User } from '@supabase/supabase-js'
import { getFormattedDate } from 'utils/utils'
import { Button } from '@mozilla/lilypad-ui'
import { createClient } from 'supabase/client'
import { useRouter } from 'next/navigation'

type SettingsScreenPropsT = {
  user: User | null
}

const SettingsScreen = ({ user }: SettingsScreenPropsT) => {
  console.log('user', user)
  const supabase = createClient()
  const router = useRouter()

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Error logging out:', error.message)
      return
    }
    console.log('Logged out')
    router.push('/learn/login')
  }

  return (
    <section className={styles.page}>
      <div>
        <h1 className="heading-xl color-primary mb-24">Settings</h1>

        {user && (
          <div>
            <ul className={styles.list}>
              <li>
                <span className="body-md-bold mr-12">Username:</span>
                {user.email}
              </li>

              <li>
                <span className="body-md-bold mr-12">Joined:</span>
                {getFormattedDate(user.created_at)}
              </li>
            </ul>
          </div>
        )}
      </div>

      <Button
        text="Logout"
        onClick={() => {
          handleLogout()
        }}
      />
    </section>
  )
}

export default SettingsScreen
