import { useEffect } from 'react'
import Link from 'next/link'
import { createClient } from 'supabase/server'
import { User } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'

import WelcomeScreen from '@Modules/learn/screens/WelcomeScreen/WelcomeScreen'

type HistoryT = {
  label: string
  score: string
  date: string
}

const Page = async () => {
  const supabase = createClient()
  const { data, error } = await supabase.auth.getUser()

  console.log(data, error)

  if (data.user) {
    redirect('/learn/home')
  }

  return <WelcomeScreen />
}

export default Page
