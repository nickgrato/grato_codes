import { useCallback, useState } from 'react';
import styles from './MainNav.module.scss';
import { Button, Modal, Icon } from '@mozilla/lilypad-ui';
import { NavigationT } from 'types';
import Logo from '@Shared/Logo/Logo';
import { useDesktopDown } from 'hooks/useMediaQuery';
import Link from 'next/link';
import ContactModal from '@Modals/ContactModal/ContactModal';

type MainNavPropsT = {
  navData?: NavigationT;
  mobileMenuClick: () => void;
  classProp?: string;
};

const MainNav = ({
  navData,
  mobileMenuClick,
  classProp = '',
}: MainNavPropsT) => {
  const [isContactModalVisible, setIsContactModalVisible] = useState(false);

  /**
   * Handle Menu Click
   */
  const handleMobileMenuClick = useCallback(() => {
    mobileMenuClick && mobileMenuClick();
  }, [mobileMenuClick]);

  const isDesktopDown = useDesktopDown();

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
                  <Link href="/" className={styles.main_nav_link}>
                    Home
                  </Link>

                  <Link href="/about" className={styles.main_nav_link}>
                    About
                  </Link>

                  <Link href="/portfolio" className={styles.main_nav_link}>
                    Portfolio
                  </Link>
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
                    text="Contact"
                    onClick={() => setIsContactModalVisible(true)}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
      <Modal
        isVisible={isContactModalVisible}
        onClose={() => setIsContactModalVisible(false)}
      >
        <ContactModal />
      </Modal>
    </>
  );
};

export default MainNav;
