import styles from './page.module.scss';
import { getBlogPageData } from 'services/contentful.service';
import type { Metadata } from 'next';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { MARKS } from '@contentful/rich-text-types';
import type { Highlighter, Lang, Theme } from 'shiki';
import { renderToHtml, getHighlighter } from 'shiki';

let highlighter: Highlighter;
export async function highlight(code: string, theme: Theme, lang: Lang) {
  if (!highlighter) {
    highlighter = await getHighlighter({
      langs: [lang],
      theme: theme,
    });
  }

  const tokens = highlighter.codeToThemedTokens(code, lang, theme, {
    includeExplanation: false,
  });
  const html = renderToHtml(tokens, { bg: 'transparent' });

  return html;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const blog = await getBlogPageData(params.slug).catch((e) =>
    console.error(e.code),
  );

  return {
    title: `Grato Codes - ${blog?.title}`,
    description: blog?.preview,
  };
}

const options = {
  renderMark: {
    [MARKS.CODE]: async (text: any) => {
      const html = await highlight(text, 'dracula-soft', 'javascript');

      return (
        <span
          dangerouslySetInnerHTML={{ __html: html }}
          style={{
            backgroundColor: 'black',
            display: 'block',
            padding: '20px',
          }}
        />
      );
    },
  },
};

const Page = async ({ params }: { params: { slug: string } }) => {
  // TODO CREATE THE GET BLOG PAGE QUERY SERVICE AND GET THE BLOG DATA
  // AND DISPLAY IT HERE.
  console.log(params.slug);
  const blog = await getBlogPageData(params.slug).catch((e) =>
    console.error(e.code),
  );

  return blog ? (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <h1 className="heading-xl mb-40">{blog.title}</h1>
        <div className={styles.body}>
          {documentToReactComponents(blog.body.json, options)}
        </div>
      </div>
    </section>
  ) : (
    <section>
      <h1 className="heading-xl">Congragulation you found a bug!</h1>.
    </section>
  );
};
export default Page;
