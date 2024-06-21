'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Icon, IconT } from '@mozilla/lilypad-ui'
import styles from './BottomTabs.module.scss'

const ROUTES: { icon: IconT; text: string; href: string }[] = [
  { icon: 'home', text: 'Home', href: '/learn/home' },
  { icon: 'plus', text: 'New Quiz', href: '/learn/new' },
  { icon: 'settings', text: 'Setting', href: '/learn/settings' },
]

type TabButtonPropsT = {
  icon: IconT
  text: string
  href: string
}

type BottomTabsPropsT = {
  className?: string
}

const BottomTabs = ({ className = '' }: BottomTabsPropsT) => {
  const pathName = usePathname()
  console.log(pathName)

  const TabButton = ({ icon, text, href }: TabButtonPropsT) => {
    return (
      <Link
        className={`${styles.tab} ${pathName === href ? styles.active : ''} `}
        href={href}
      >
        <Icon name={icon} className="mb-4" size={22} />
        <span className="body-sm">{text}</span>
      </Link>
    )
  }

  return (
    <nav className={`${styles.wrapper} ${className}`}>
      {ROUTES.map((route, index) => (
        <TabButton key={index} {...route} />
      ))}
    </nav>
  )
}

export default BottomTabs
