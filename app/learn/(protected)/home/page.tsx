import styles from './page.module.scss'
import { createClient } from 'supabase/server'

import HomeScreen from '@Modules/learn/screens/HomeScreen/HomeScreen'

type HistoryT = {
  label: string
  score: string
  date: string
}

const Page = async () => {
  const supabase = createClient()
  const { data, error } = await supabase.auth.getUser()
  console.log('data', data)

  return <HomeScreen user={data.user} />
}

export default Page
