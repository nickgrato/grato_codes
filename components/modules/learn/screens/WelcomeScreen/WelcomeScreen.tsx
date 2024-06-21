'use client'

import { useEffect } from 'react'
import styles from './WelcomeScreen.module.scss'
import Link from 'next/link'
import { User } from '@supabase/supabase-js'
import { Button, LinkComponentT } from '@mozilla/lilypad-ui'

type WelcomeScreenPropsT = {}

const WelcomeScreen = async ({}: WelcomeScreenPropsT) => {
  return (
    <div className={styles.page}>
      <h1 className="heading-lg color-primary mb-12">Welcome To Learn More</h1>
      <p className="body-md mb-40">
        Sign in below to get started, we're are exited to help you start your
        learning journey.
      </p>
      <div className="flex-col gap-12">
        <Button
          text="Login"
          href="/learn/login"
          LinkComponent={Link as LinkComponentT}
        />
        <Button
          text="Sign Up"
          href="/login"
          category="primary_outline"
          LinkComponent={Link as LinkComponentT}
        />
      </div>
    </div>
  )
}

export default WelcomeScreen
