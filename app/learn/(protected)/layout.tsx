import BottomTabs from '@Modules/learn/BottomTabs/BottomTabs'
import styles from './layout.module.scss'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div data-theme="learn" className={styles.wrapper}>
      {children}

      <BottomTabs className={styles.navigation} />
    </div>
  )
}
