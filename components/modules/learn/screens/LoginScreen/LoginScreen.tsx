'use client'

import { useEffect, ChangeEvent, useState } from 'react'
import styles from './LoginScreen.module.scss'
import Link from 'next/link'
import { User } from '@supabase/supabase-js'
import { Button, Input, FadeIn } from '@mozilla/lilypad-ui'
import { login, signup } from 'supabase/server-actions'
import Card from '@Shared/Card/Card'
import SidePanel from '@Shared/SidePanel/SidePanel'
import Image from 'next/image'
import LearnMore from 'public/learnmore.png'

type SignupScreenPropsT = {
  onClose: () => void
}
const SignupScreen = ({ onClose }: SignupScreenPropsT) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  return (
    <div className={styles.signup_wrapper}>
      <div>
        <Button
          icon="chevron-left"
          text="Back"
          category="secondary_clear"
          onClick={() => {
            onClose()
          }}
        />
        <Card size="large">
          <h1 className="color-primary heading-md mb-24">Sign Up</h1>
          <form action={login} className="flex-col gap-18">
            <Input
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setEmail(e.target.value)
              }}
              value={email}
              name="email"
              placeholder="email"
              label="email"
              required={true}
            />
            <Input
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setPassword(e.target.value)
              }}
              value={password}
              name="password"
              placeholder="password"
              label="password"
              required={true}
              type="password"
            />

            <Input
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setConfirmPassword(e.target.value)
              }}
              value={confirmPassword}
              name="confirm password"
              placeholder="confirm password"
              label="confirm password"
              required={true}
              type="password"
            />

            <Button type="submit" text="Submit" />
          </form>
        </Card>
      </div>
    </div>
  )
}

type LoginScreenPropsT = {}

const LoginScreen = ({}: LoginScreenPropsT) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showSignup, setShowSignup] = useState(false)

  return (
    <>
      <div className={styles.page}>
        <div className="justify-center p-20">
          <Image src={LearnMore} height={35} alt="logo" />
        </div>
        <Card size="large">
          <h1 className="color-primary heading-md mb-24">Login</h1>
          <form action={login} className="flex-col gap-18">
            <Input
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setEmail(e.target.value)
              }}
              value={email}
              name="email"
              placeholder="email"
              label="email"
              required={true}
            />
            <Input
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setPassword(e.target.value)
              }}
              value={password}
              name="password"
              placeholder="password"
              label="password"
              required={true}
              type="password"
            />
            <div className="justify-end">
              <Button text="Forgot Password?" category="primary_clear" />
            </div>
            <Button type="submit" text="Submit" />
            <hr className={styles.hr} />
            <div className="justify-center">
              <div className="items-center">
                <p className="body-sm">Don't have an account?</p>
                <Button
                  text="Sign Up"
                  onClick={() => {
                    setShowSignup(true)
                  }}
                  category="primary_clear"
                />
              </div>
            </div>
          </form>
        </Card>
      </div>

      <SidePanel
        showClose={false}
        isOpen={showSignup}
        onClose={() => {
          setShowSignup(false)
        }}
      >
        <SignupScreen
          onClose={() => {
            setShowSignup(false)
          }}
        />
      </SidePanel>
    </>
  )
}

export default LoginScreen
