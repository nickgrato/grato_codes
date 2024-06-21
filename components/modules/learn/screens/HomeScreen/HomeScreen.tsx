import { useEffect } from 'react'
import styles from './HomeScreen.module.scss'
import Link from 'next/link'
import { User } from '@supabase/supabase-js'
import { Button, LinkComponentT } from '@mozilla/lilypad-ui'

type HistoryT = {
  label: string
  score: string
  date: string
}

type HomeScreenPropsT = {
  user: User | null
}

const HomeScreen = async ({ user }: HomeScreenPropsT) => {
  const MOCK_DATA: HistoryT[] = [
    {
      label: 'DNA Replication',
      score: '2/6',
      date: '2/12/2024',
    },
    {
      label: 'Space Exploration in the 21st Century',
      score: '3/5',
      date: '3/15/2024',
    },
    {
      label: '16th century Art',
      score: '4/8',
      date: '4/20/2024',
    },
    {
      label: 'AI Trends',
      score: '1/2',
      date: '5/25/2024',
    },
    {
      label: 'Wolverine Origins',
      score: '1/2',
      date: '5/25/2024',
    },
    {
      label: 'Machine Learning and model training',
      score: '1/2',
      date: '5/25/2024',
    },
  ]

  const handleLogin = async () => {}

  return (
    <div className={styles.page}>
      {user ? (
        <>
          <h1 className="heading-xl color-primary">Home</h1>

          <div>
            <hr />
          </div>
          <Button
            text="New Quiz"
            icon="chevron-right"
            iconPlacedRight={true}
            category="secondary_outline"
            className="mb-24"
            href="/learn/new"
            LinkComponent={Link as LinkComponentT}
          />
          <div className={styles.table_container}>
            <div className={styles.table}>
              {MOCK_DATA.map(({ label, score, date }, index) => (
                <button className={styles.table_row} key={index}>
                  <div className="body-sm-bold">{label}</div>
                  <div className="body-sm">{score}</div>
                  <div className="body-sm">{date}</div>
                </button>
              ))}
            </div>
          </div>
        </>
      ) : (
        <section>
          <h1 className="heading-lg color-primary mb-12">
            Welcome To Learn More
          </h1>
          <p className="body-md mb-40">
            Sign in below to get started, we're are exited to help you start
            your learning journey.
          </p>
          <div className="flex-col gap-12">
            <Button text="Login" href="/learn/login" />
            <Button text="Sign Up" href="/login" category="primary_outline" />
          </div>
        </section>
      )}
    </div>
  )
}

export default HomeScreen
