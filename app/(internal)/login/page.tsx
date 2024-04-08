import styles from './page.module.scss'
import { validateUser } from 'services/validate.service'
import { redirect } from 'next/navigation'
import LoginForm from '@Modules/login/LoginForm/LoginForm'
import { AxiosError } from 'axios'
import { Routes } from 'const/Routes'

const Page = async () => {
  try {
    const isValid = await validateUser()
    console.log('isValid', isValid)
    if (isValid) {
      redirect(Routes.ASSISTANT)
    }
  } catch (error) {
    const axiosError = error as AxiosError
    console.error(axiosError.response?.data)
  }

  return (
    <div className={styles.page}>
      <LoginForm />
    </div>
  )
}

export default Page
