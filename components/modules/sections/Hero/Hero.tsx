import styles from './Hero.module.scss';
import { Button } from '@mozilla/lilypad-ui';
import { HeroT } from 'types';

interface HeroPropsI extends HeroT {
  classProp?: string;
}

const Hero = ({
  title,
  body,
  ctaTitle,
  ctaHref,
  classProp = '',
}: HeroPropsI) => {
  return (
    <section className={`${classProp} ${styles.wrapper}`}>
      <div className={styles.container}>
        <div className={styles.contents_wrapper}>
          <div className={styles.contents}>
            {title && <h3 className="heading-xxl mb-16">{title}</h3>}
            {body && <p className="body-md mb-24">{body}</p>}

            {/* CALL TO ACTION LEFT  */}
            {ctaTitle && (
              <Button
                href={ctaHref}
                label={ctaTitle}
                text={ctaTitle}
                category="secondary_solid"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
