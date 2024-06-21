'use client'

import { ChangeEvent, useState, FormEvent } from 'react'
import styles from './LoginForm.module.scss'
import { Button, Input } from '@mozilla/lilypad-ui'
import { useRouter } from 'next/navigation'
import Card from '@Shared/Card/Card'
import Notification from '@Shared/Notification/Notification'
import { FadeIn } from '@mozilla/lilypad-ui'
import { login, signup } from 'supabase/server-actions'

const LoginForm = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // // const resp = await login({ email, password })
    // // console.log('resp', resp)

    // const resp = await signup({ email, password })
    // console.log('resp', resp)

    // resp.msg === 'success' ? router.push('chat') : setError(true)
  }

  //   <form>
  //   <label htmlFor="email">Email:</label>
  //   <input id="email" name="email" type="email" required />
  //   <label htmlFor="password">Password:</label>
  //   <input id="password" name="password" type="password" required />
  //   <button formAction={login}>Log in</button>
  //   <button formAction={signup}>Sign up</button>
  // </form>
  return (
    <Card size="large" className={styles.wrapper}>
      <form className="flex-col gap-24" onSubmit={(e) => handleLogin(e)}>
        <h1 className="color-primary">Login</h1>

        <FadeIn visible={error}>
          <Notification
            type="critical"
            title="There was a problem"
            message="User name and or password are incorrect"
          />
        </FadeIn>

        <Input
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setEmail(e.target.value)
          }}
          value={email}
          name="email"
          placeholder="email"
          label="Email"
          required={true}
        />
        <Input
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value)
          }}
          value={password}
          name="password"
          placeholder="password"
          label="Password"
          required={true}
          type="password"
        />

        <Button
          text="submit"
          type="submit"
          onClick={() => {}}
          className={styles.cta}
        />
      </form>
    </Card>
  )
}

export default LoginForm
