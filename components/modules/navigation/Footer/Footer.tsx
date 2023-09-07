import Logo from '@Shared/Logo/Logo';
import styles from './Footer.module.scss';

type FooterPropsT = {
  classProp?: string;
};

const Footer = ({ classProp = '' }: FooterPropsT) => {
  return (
    <section className={`${classProp} ${styles.wrapper}`}>
      <div className={styles.container}>
        {/* LINKS  */}
        <div className={styles.link_blocks}>
          <div className={styles.link_block}>
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

            <Logo size="medium" />
          </div>

          {/* RESOURCES  */}
          <div className={styles.link_block}>
            <h4>Resources</h4>
            <a
              target="_blank"
              rel="noreferrer"
              href="#"
              className={styles.link}
            >
              Books
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="#"
              className={styles.link}
            >
              Blogs
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://hubs.mozilla.com/spoke/"
              className={styles.link}
            >
              Podcasts
            </a>
          </div>

          {/* SUPPORT  */}
          <div className={styles.link_block}>
            <h4>My Learning Paths</h4>
            <a
              target="_blank"
              rel="noreferrer"
              href="#"
              className={styles.link}
            >
              Elixir
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="#"
              className={styles.link}
            >
              Python
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="#"
              className={styles.link}
            >
              Javascript
            </a>
          </div>

          {/* MORE  */}
          <div className={styles.link_block}>
            <h4>Other Profiles</h4>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://hubs.mozilla.com/cloud/"
              className={styles.link}
            >
              Twitter
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://mozilla-na.myspreadshop.com/"
              className={styles.link}
            >
              Github
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://mozilla-na.myspreadshop.com/"
              className={styles.link}
            >
              LinkedIn
            </a>
          </div>
        </div>

        <div className={styles.border} />

        {/* LINKS  */}
        <div className={styles.submenu_wrapper}>
          <div className={styles.submenu_links}>
            <span className="mr-18">Created with:</span>
            <a target="_blanks" className={styles.submenu_link} href="#">
              NextJs
            </a>
            <a target="_blanks" className={styles.submenu_link} href="#">
              Lilypad
            </a>
            <a target="_blanks" className={styles.submenu_link} href="#">
              Contentful
            </a>
            <a target="_blanks" className={styles.submenu_link} href="#">
              Netlify
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
