'use client'

import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  toolbarPlugin,
  codeBlockPlugin,
  CodeToggle,
  UndoRedo,
  BoldItalicUnderlineToggles,
  type MDXEditorMethods,
  type MDXEditorProps,
} from '@mdxeditor/editor'

import '@mdxeditor/editor/style.css'
import styles from './MarkDownEditor.module.scss'

type MarkDownEditorPropsT = {
  editorRef?: React.MutableRefObject<MDXEditorMethods | null>
}

// Only import this to the next file
const MarkDownEditor = ({
  editorRef,
  ...props
}: MarkDownEditorPropsT & MDXEditorProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <MDXEditor
          className={styles.theme}
          plugins={[
            // Example Plugin Usage
            toolbarPlugin({
              toolbarContents: () => (
                <>
                  <CodeToggle />
                  <UndoRedo />
                  <BoldItalicUnderlineToggles />
                </>
              ),
            }),
            codeBlockPlugin(),
            headingsPlugin(),
            listsPlugin(),
            quotePlugin(),
            thematicBreakPlugin(),
            markdownShortcutPlugin(),
          ]}
          {...props}
          ref={editorRef}
        />
      </div>
    </div>
  )
}

export default MarkDownEditor
