import styles from './page.module.scss'
import { validateUser } from 'services/validate.service'
import { redirect } from 'next/navigation'
import { AxiosError } from 'axios'
import { Routes } from 'const/Routes'
import LoginForm from '@Modules/learn/LoginForm/LoginForm'
import { createClient } from 'supabase/client'
import LoginScreen from '@Modules/learn/screens/LoginScreen/LoginScreen'

const Page = async () => {
  return <LoginScreen />
}

export default Page
