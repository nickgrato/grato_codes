import styles from './BlogSection.module.scss';
import BlogPreview from '../BlogPreview/BlogPreview';
import { getBlogData } from 'services/contentful.service';
import SkeletonCard from '@Shared/SkeletonCard/SkeletonCard';

const BlogSection = async () => {
  const data = await getBlogData().catch((e) => console.error(e));

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <h2 className="heading-xl mb-24">Articals and Rants</h2>

        {data ? (
          <div className={styles.content}>
            {data.posts.map((post) => (
              <BlogPreview blogPostPreview={post} key={post.sys.id} />
            ))}
          </div>
        ) : (
          // TODO THIS ISNT REALLY DOING ANYTHING SINCE THIS IS A SERVER COMPONENT..
          // FIND A BETTER LOADING STATE METHOD
          <div className={styles.loading}>
            <SkeletonCard category="square" qty={2} />
            <SkeletonCard category="square" qty={2} />
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
