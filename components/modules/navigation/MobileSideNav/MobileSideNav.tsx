import { useCallback } from 'react';
import { Button } from '@mozilla/lilypad-ui';
import { useRouter } from 'next/navigation';
import styles from './MobileSideNav.module.scss';

type MobileSideNavPropsT = {
  isOpen: boolean;
  MobileMenuClick: Function;
};

const MobileSideNav = ({
  isOpen = false,
  MobileMenuClick,
}: MobileSideNavPropsT) => {
  const router = useRouter();

  /**
   * Handle Menu Click
   */
  const handleMobileMenuClick = useCallback(() => {
    MobileMenuClick();
  }, [MobileMenuClick]);

  /**
   * Handle See Pricing Click
   */
  const handleGetStartedClick = useCallback(() => {
    // TODO bubble up scroll to...
    MobileMenuClick();
    router.push('/#subscribe');
  }, [MobileMenuClick, router]);

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
              category="primary_clear"
              size="large"
              icon="x"
              onClick={handleMobileMenuClick}
              classProp={styles.menu_button}
            />
          </div>

          {/* Logo */}
          <div className="flex-justify-center mb-10"></div>

          {/* LINKS  */}
          <ul className="m-0">
            <li>
              <a className={styles.nav_link} href="/labs">
                Creator Labs
              </a>
            </li>
            <li>
              <a className={styles.nav_link} href="/cloud">
                Hubs Cloud
              </a>
            </li>
            <li>
              {/* TODO get demo url?  */}
              <a
                className={styles.nav_link}
                href="/Pvg5MMt/hubs-demo"
                target="_blank"
              >
                Explore Hubs
              </a>
            </li>
          </ul>

          {/* ACTIONS  */}
          <div className="p-24">
            <div className="mb-10 flex">
              {/* <Button
                label="See Pricing and subscribe to Hubs"
                classProp="flex-grow-1 "
                text="See Pricing"
                onClick={handleGetStartedClick}
              /> */}
            </div>

            <div className="flex"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileSideNav;
