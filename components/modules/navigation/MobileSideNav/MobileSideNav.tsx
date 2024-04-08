import { useCallback } from 'react'
import { Button } from '@mozilla/lilypad-ui'
import { useRouter } from 'next/navigation'
import styles from './MobileSideNav.module.scss'
import Link from 'next/link'

type MobileSideNavPropsT = {
  isOpen: boolean
  MobileMenuClick: Function
}

const MobileSideNav = ({
  isOpen = false,
  MobileMenuClick,
}: MobileSideNavPropsT) => {
  const router = useRouter()

  /**
   * Handle Menu Click
   */
  const handleMobileMenuClick = useCallback(() => {
    MobileMenuClick()
  }, [MobileMenuClick])

  /**
   * Handle See Pricing Click
   */
  const handleGetStartedClick = useCallback(() => {
    // TODO bubble up scroll to...
    MobileMenuClick()
    router.push('/#subscribe')
  }, [MobileMenuClick, router])

  return (
    <>
      <div
        className={`${styles.overlay} ${
          isOpen ? styles.overlay_open : styles.overlay_closed
        }`}
      />

      <div
        className={`${styles.nav_wrapper} ${
          isOpen ? styles.nav_open : styles.nav_closed
        }`}
      >
        <div className={styles.banner_gradient} />
        <div className={styles.nav_container}>
          <div className="flex-justify-end p-20">
            <Button
              label="close mobile navigation"
              category="secondary_outline"
              size="medium"
              icon="x"
              onClick={handleMobileMenuClick}
              classProp={styles.menu_button}
            />
          </div>

          {/* LINKS  */}
          <div className={styles.nav_links}>
            <Link
              href="/"
              className={styles.nav_link}
              onClick={handleMobileMenuClick}
            >
              Home
            </Link>

            <Link
              href="/about"
              className={styles.nav_link}
              onClick={handleMobileMenuClick}
            >
              About
            </Link>

            <Link
              href="/portfolio"
              className={styles.nav_link}
              onClick={handleMobileMenuClick}
            >
              Portfolio
            </Link>

            <Link
              href="/login"
              className={styles.nav_link}
              onClick={handleMobileMenuClick}
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default MobileSideNav
