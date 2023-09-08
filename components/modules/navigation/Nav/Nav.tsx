'use client';

import { useCallback, useState } from 'react';
import { useDesktopDown } from 'hooks/useMediaQuery';
import MainNav from '@Modules/navigation/MainNav/MainNav';
import MobileSideNav from '@Modules/navigation/MobileSideNav/MobileSideNav';
import { NavigationT } from 'types';

type NavPropsT = {
  navData?: NavigationT;
};

const Nav = ({ navData }: NavPropsT) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const isDesktopDown = useDesktopDown();
  const toggleMobileNav = useCallback(() => {
    setIsMobileMenuOpen((state) => !state);
  }, []);

  return (
    <>
      <MainNav navData={navData} mobileMenuClick={toggleMobileNav} />
      {isDesktopDown && (
        <MobileSideNav
          MobileMenuClick={toggleMobileNav}
          isOpen={isMobileMenuOpen}
        />
      )}
    </>
  );
};

export default Nav;
