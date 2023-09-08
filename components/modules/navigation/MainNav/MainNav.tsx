import { useCallback } from 'react';
import styles from './MainNav.module.scss';
import { Button, Icon, Pill, ToolTip } from '@mozilla/lilypad-ui';
import { NavigationT } from 'types';
import Logo from '@Shared/Logo/Logo';
import { useDesktopDown } from 'hooks/useMediaQuery';

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
  /**
   * Handle Menu Click
   */
  const handleMobileMenuClick = useCallback(() => {
    mobileMenuClick && mobileMenuClick();
  }, [mobileMenuClick]);

  const isDesktopDown = useDesktopDown();

  const handleClick = () => {
    console.log('clicly the click');
  };
  /**
   * Main Nav JSX
   */
  return (
    <nav className={`${styles.main_nav} ${classProp}`}>
      {/* <div className={styles.banner_gradient}>
        <div className={styles.marquee_container}>
          <div className={styles.marquee}>
            <section className={styles.banner_text}>
              <div className="flex-align-center">
                <div>
                  <Icon name="alert-octagon" classProp="mr-10 mt-3" />
                  <Pill title="pil" category="cool" />
                </div>
                <p className="body-sm-bold flex-align-center">
                  {navData?.bannerText}
                </p>
              </div>
            </section>
          </div>
        </div>
      </div> */}

      <div className={styles.main_nav_wrapper}>
        <div className={styles.main_nav_container}>
          {/* Main navigation links / logo */}
          <div className={styles.main_nav_contents}>
            {/* Logo */}
            <Logo />

            {/* Links  */}
            {!isDesktopDown && (
              <div className={styles.main_nav_links}>
                <a href="/labs" className={styles.main_nav_link}>
                  Home
                </a>

                <a href="/cloud" className={styles.main_nav_link}>
                  About
                </a>

                <a
                  href="/E4e8oLx/hubs-demo-promenade"
                  target="_blank"
                  className={styles.main_nav_link}
                >
                  Contact
                </a>
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
                <Button text="Porfolio" classProp="mr-10" />
                <Button text="Blog" category="secondary_outline" />
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
