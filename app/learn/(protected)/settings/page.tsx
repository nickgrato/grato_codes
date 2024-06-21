import styles from './page.module.scss'
import { createClient } from 'supabase/server'

import SettingsScreen from '@Modules/learn/screens/SettingsScreen/SettingsScreen'

type HistoryT = {
  label: string
  score: string
  date: string
}

const Page = async () => {
  const supabase = createClient()
  const { data, error } = await supabase.auth.getUser()
  console.log('data', data)

  return <SettingsScreen user={data.user} />
}

export default Page
