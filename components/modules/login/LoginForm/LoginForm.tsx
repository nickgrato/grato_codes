'use client'

import { ChangeEvent, useState, FormEvent } from 'react'
import styles from './LoginForm.module.scss'
import { Button, Input } from '@mozilla/lilypad-ui'
import { login, logout } from 'services/login.service'
import { useRouter } from 'next/navigation'
import Card from '@Shared/Card/Card'
import Notification from '@Shared/Notification/Notification'
import { FadeIn } from '@mozilla/lilypad-ui'

const LoginForm = () => {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const resp = await login(username, password)
    resp.msg === 'success' ? router.push('chat') : setError(true)
  }

  return (
    <Card size="large" classProp={styles.wrapper}>
      <form className="flex-column gap-24" onSubmit={(e) => handleLogin(e)}>
        <h1>Login</h1>

        <FadeIn visible={error}>
          <Notification
            type="critical"
            title="There was a problem"
            message="User name and or password are incorrect"
          />
        </FadeIn>

        <Input
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setUsername(e.target.value)
          }}
          value={username}
          name="username"
          placeholder="user name"
          label="User Name"
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
          classProp={styles.cta}
        />
      </form>
    </Card>
  )
}

export default LoginForm
