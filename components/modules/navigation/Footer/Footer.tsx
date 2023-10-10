'use client';

import Logo from '@Shared/Logo/Logo';
import styles from './Footer.module.scss';
import { useDesktopDown } from 'hooks/useMediaQuery';
type FooterPropsT = {
  classProp?: string;
};
import Link from 'next/link';

const Footer = ({ classProp = '' }: FooterPropsT) => {
  const isDesktopDown = useDesktopDown();

  return (
    <section className={`${classProp} ${styles.wrapper}`}>
      <div className={styles.container}>
        {/* LINKS  */}
        <div className={styles.link_blocks}>
          {/* <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/mozilla/hubs/"
              className={styles.link}
            >
              Contribute to Our Code
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://hubs.mozilla.com/whats-new"
              className={styles.link}
            >
              Latest News
            </a> */}
          <div className={styles.logo_wrapper}>
            <Logo size={isDesktopDown ? 'small' : 'medium'} />
          </div>

          {/* RESOURCES  */}
          <div className={styles.link_block}>
            <h4>Resources</h4>
            <Link href="/resources" className={styles.link}>
              Books
            </Link>
            <Link href="/resources" className={styles.link}>
              Podcasts
            </Link>
          </div>

          {/* SUPPORT  */}
          <div className={styles.link_block}>
            <h4>My Learning Paths</h4>
            <Link href="/learning" className={styles.link}>
              Python
            </Link>
            <Link href="/learning" className={styles.link}>
              Javascript
            </Link>
            <Link href="/learning" className={styles.link}>
              Elixir
            </Link>
          </div>

          {/* MORE  */}
          <div className={styles.link_block}>
            <h4>Other Profiles</h4>

            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/nickgrato"
              className={styles.link}
            >
              Github
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.linkedin.com/in/nick-grato-94598793/"
              className={styles.link}
            >
              LinkedIn
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://twitter.com/grato_was_taken"
              className={styles.link}
            >
              X
            </a>
          </div>
        </div>

        <div className={styles.border} />

        {/* LINKS  */}
        <div className={styles.submenu_wrapper}>
          <div className={styles.submenu_links}>
            <span>Created with:</span>
            <a
              target="_blanks"
              className={styles.submenu_link}
              rel="noreferrer"
              href="https://nextjs.org/"
            >
              NextJs
            </a>
            <a
              target="_blanks"
              className={styles.submenu_link}
              rel="noreferrer"
              href="https://vercel.com/"
            >
              Vercel
            </a>
            <a
              target="_blanks"
              className={styles.submenu_link}
              rel="noreferrer"
              href="https://www.npmjs.com/package/@mozilla/lilypad-ui"
            >
              Lilypad
            </a>
            <a
              target="_blanks"
              className={styles.submenu_link}
              rel="noreferrer"
              href="https://www.contentful.com/"
            >
              Contentful
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
