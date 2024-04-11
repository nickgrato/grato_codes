'use client'

import { useCallback, useState } from 'react'
import styles from './Menu.module.scss'
import { Button, Modal, Icon } from '@mozilla/lilypad-ui'
import { NavigationT } from 'types'
import Logo from '@Modules/chat/Logo/Logo'
import { useDesktopDown } from 'hooks/useMediaQuery'
import Link from 'next/link'
import ContactModal from '@Modals/ContactModal/ContactModal'

type MenuPropsT = {
  mobileMenuClick?: Function
  classProp?: string
}

const Menu = ({ mobileMenuClick, classProp = '' }: MenuPropsT) => {
  const [isContactModalVisible, setIsContactModalVisible] = useState(false)

  /**
   * Handle Menu Click
   */
  const handleMobileMenuClick = useCallback(() => {
    mobileMenuClick && mobileMenuClick()
  }, [mobileMenuClick])

  const isDesktopDown = useDesktopDown()

  /**
   * Main Nav JSX
   */
  return (
    <>
      <nav className={`${styles.main_nav} ${classProp}`}>
        <div className={styles.main_nav_wrapper}>
          <div className={styles.main_nav_container}>
            {/* Main navigation links / logo */}
            <div className={styles.main_nav_contents}>
              {/* Logo */}
              <Link href="/">
                <Logo />
              </Link>

              {/* Links  */}
              {!isDesktopDown && (
                <div className={styles.main_nav_links}>
                  <Link href="/chat" className={styles.main_nav_link}>
                    Chat
                  </Link>

                  {/* <Link href="/chat/profile" className={styles.main_nav_link}>
                    Profile
                  </Link> */}
                </div>
              )}
            </div>

            {/* Go To Hub Dashboard */}
            {/* Mobile Menu */}
            {isDesktopDown && (
              <Button
                label="Menu"
                category="secondary_clear"
                icon="menu"
                onClick={handleMobileMenuClick}
                classProp={styles.mobile_menu}
              />
            )}

            {!isDesktopDown && (
              <div className="flex-align-center">
                <div className={styles.main_nav_actions}>
                  <Button
                    classProp="mr-12"
                    text="Contact"
                    onClick={() => setIsContactModalVisible(true)}
                  />
                  <Link href="/login">
                    <Button text="login" category="secondary_outline" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  )
}

export default Menu
