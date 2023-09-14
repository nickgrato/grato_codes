import { BlogPostPreviewT } from 'types';
import styles from './BlogPreview.module.scss';
import Image from 'next/image';
import { Routes } from 'const/Routes';
import { Button } from '@mozilla/lilypad-ui';

type BlogPreviewPropsT = {
  classProp?: string;
  blogPostPreview: BlogPostPreviewT;
};

const BlogPreview = ({
  classProp = '',
  blogPostPreview,
}: BlogPreviewPropsT) => {
  return (
    <section className={`${classProp} ${styles.wrapper}`}>
      <div className={styles.image_wrapper}>
        <Image
          src={blogPostPreview.image.url}
          alt={blogPostPreview.image.description}
          fill
          sizes="100vw"
        />
        <div className={styles.date}>12/18/2023</div>
      </div>

      <h3 className="mb-12">{blogPostPreview.title}</h3>
      <p className="paragraph mb-12">{blogPostPreview.preview}</p>

      {/* TODO MAKE THIS THE CORRECT "NEXT" LINK  */}
      <Button
        text="Continue Reading"
        category="primary_outline"
        href={`${Routes.BLOG}/${blogPostPreview.slug}`}
      />
    </section>
  );
};

export default BlogPreview;
