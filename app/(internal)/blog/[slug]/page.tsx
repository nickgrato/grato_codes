import styles from './page.module.scss'
import { getBlogPageData } from 'services/contentful.service'
import type { Metadata } from 'next'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { MARKS, BLOCKS } from '@contentful/rich-text-types'
import type { Highlighter, Lang, Theme } from 'shiki'
import { renderToHtml } from 'shiki'
import * as fs from 'fs/promises'
import { join as pathJoin } from 'path'

import * as shiki from 'shiki'

// Shiki loads languages and themes using "fs" instead of "import", so Next.js
// doesn't bundle them into production build. To work around, we manually copy
// them over to our source code (lib/shiki/*) and update the "paths".
//
// Note that they are only referenced on server side
// See: https://github.com/shikijs/shiki/issues/138
const getShikiPath = (): string => {
  return pathJoin(process.cwd(), 'libs/shiki')
}

const touched = { current: false }

// "Touch" the shiki assets so that Vercel will include them in the production
// bundle. This is required because shiki itself dynamically access these files,
// so Vercel doesn't know about them by default
const touchShikiPath = (): void => {
  if (touched.current) return // only need to do once
  fs.readdir(getShikiPath()) // fire and forget
  touched.current = true
}

const getHighlighter = async (options: any) => {
  touchShikiPath()

  const highlighter = await shiki.getHighlighter({
    // This is technically not compatible with shiki's interface but
    // necessary for rehype-pretty-code to work
    // - https://rehype-pretty-code.netlify.app/ (see Custom Highlighter)
    ...(options as any),
    paths: {
      languages: `${getShikiPath()}/languages/`,
      themes: `${getShikiPath()}/themes/`,
    },
  })

  return highlighter
}

let highlighter: Highlighter
async function highlight(code: string, theme: Theme, lang: Lang) {
  if (!highlighter) {
    highlighter = await getHighlighter({
      langs: [lang],
      theme: undefined,
    })
  }

  const tokens = highlighter.codeToThemedTokens(code, lang, undefined, {
    includeExplanation: false,
  })
  const html = renderToHtml(tokens, { bg: 'transparent' })

  return html
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const blog = await getBlogPageData(params.slug).catch((e) =>
    console.error(e.code),
  )

  if (blog) {
    return {
      title: `Grato Codes - ${blog.title}`,
      description: blog.preview,
    }
  }

  return {
    title: `Grato Codes `,
    description: 'blog preview',
  }
}

const options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
      const html = `<img class="img-fluid" src="${node.data.target.url}"/>`
      return <span dangerouslySetInnerHTML={{ __html: html }} />
    },
  },
  renderMark: {
    [MARKS.CODE]: async (text: any) => {
      const html = await highlight(text, 'github-dark', 'javascript')

      return (
        <span
          dangerouslySetInnerHTML={{ __html: html }}
          style={{
            backgroundColor: 'black',
            display: 'block',
            padding: '20px',
            fontSize: '1rem',
          }}
        />
      )
    },
  },
}

const Page = async ({ params }: { params: { slug: string } }) => {
  console.log(params.slug)
  const blog = await getBlogPageData(params.slug).catch((e) =>
    console.error(e.code),
  )

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
  )
}
export default Page
