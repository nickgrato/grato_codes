'use client'

import { useRef, useState, useEffect, FormEvent, ChangeEvent } from 'react'
import { getResponse } from 'services/openAi.service'
import ChatContainer, {
  ChatContainerT,
} from '@Modules/chat_lib/ChatContainer/ChatContainer'
import Menu from '@Modules/chat/Menu/Menu'
// import ScrapeForm from '@Modules/chat/ScrapeForm/ScrapeForm'
import SavedContent from '@Modules/chat/SavedContent/SavedContent'
import styles from './page.module.scss'
import { ArtifactT, NewArtifactT } from 'models/Artifacts'
import dynamic from 'next/dynamic'
import { deleteArtifactById } from 'services/artifacts.service'
import { Button, Input } from '@mozilla/lilypad-ui'
import {
  getArtifacts,
  addArtifact,
  updateArtifact,
} from 'services/artifacts.service'
import SkeletonCard from '@Shared/SkeletonCard/SkeletonCard'

const MarkDownEditor = dynamic(
  () => import('@Modules/chat/MarkDownEditor/MarkDownEditor'),
  { ssr: false },
)

const page = () => {
  const chatRef = useRef<ChatContainerT>(null)
  const [showScratchPad, setShowScratchPad] = useState(false)
  const [markDownContent, setMarkDownContent] = useState('# Start Scratch Pad')
  const [loadingArtifact, setLoadingArtifacts] = useState(true)
  const [artifacts, setArtifacts] = useState<ArtifactT[]>([])
  const [artifactTitle, setArtifactTitle] = useState('')
  const [artifactCat, setArtifactCat] = useState('')
  const [markDownKey, setMarkDownKey] = useState(0)
  const [editingArtifact, setEditingArtifact] = useState<string | undefined>(
    undefined,
  )

  const onMessageDispatch = async (message: string) => {
    // need to call the ai here.
    const resp = await getResponse(message)
    console.log('resp', resp)
    chatRef.current?.setMessage(resp)
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getArtifacts()
        console.log('test arti', data)
        setArtifacts(data)
        setLoadingArtifacts(false)
      } catch (error) {
        console.log('error', error)
      }
    }

    getData()
  }, [])

  const inject = (markdown: string) => {
    const formattedMarkdown = markdown.replace(/```/g, '`')
    console.log('markdown', markdown)
    console.log('formattedMarkdown', formattedMarkdown)
    setMarkDownKey((state) => state + 1)
    setMarkDownContent(formattedMarkdown)
    setShowScratchPad(true)
  }

  const handleDelete = async (idToDelete: string) => {
    try {
      const resp = await deleteArtifactById(idToDelete)

      setArtifacts((state) => {
        const newState = state.filter(({ id }) => id !== idToDelete)
        return newState
      })
    } catch (error) {
      console.log('error', error)
    }
  }

  const clearScratchPad = () => {
    setEditingArtifact(undefined)
    setArtifactTitle('')
    setArtifactCat('')
    setMarkDownContent('')
    setMarkDownKey((state) => state + 1)
  }

  const onSaveArtifact = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()

      if (editingArtifact !== undefined) {
        const updatedArtifact = await updateArtifact({
          id: editingArtifact,
          title: artifactTitle,
          category: artifactCat,
          content: markDownContent,
        })

        setArtifacts((state) => {
          const newState = [...state].map((artifact) => {
            if (artifact.id === editingArtifact) {
              return updatedArtifact
            }
            return artifact
          })

          return newState
        })
      } else {
        const newArtifact = await addArtifact({
          title: artifactTitle,
          category: artifactCat,
          content: markDownContent,
        })

        setArtifacts((state) => [...state, newArtifact])
      }

      setShowScratchPad(false)
    } catch (error) {}
  }
  return (
    <section className={styles.page}>
      <Menu />

      <section className={styles.wrapper}>
        <section className={styles.container}>
          <ChatContainer
            messagesClassName={styles.chat_container}
            ref={chatRef}
            title="How can I help?"
            onMessageDispatch={onMessageDispatch}
            onInject={inject}
            userChatMeta={{
              avatar: 'https://api.dicebear.com/7.x/bottts/png?seed=fun',
              name: 'User',
              avatarAlt: 'U',
            }}
          />

          <div className={styles.side_panel}>
            <div className={styles.side_panel_header}>
              <Button
                category="primary_clear"
                text="Saved Content"
                onClick={() => setShowScratchPad(false)}
                classProp={`mr-12 ${styles.tab_link} ${
                  !showScratchPad ? styles.tab_link_active : ''
                }`}
              />
              <Button
                classProp={`${styles.tab_link} ${
                  showScratchPad ? styles.tab_link_active : ''
                }`}
                text="Scratch Pad"
                category="primary_clear"
                onClick={() => setShowScratchPad(true)}
              />
            </div>
            <div className={styles.side_panel_contents}>
              {showScratchPad ? (
                <div className={styles.scratch_pad_wrapper}>
                  {editingArtifact !== undefined && (
                    <>
                      <h3 className="heading-xs">
                        Editing ID: {editingArtifact}
                      </h3>
                      <hr />
                    </>
                  )}
                  <form onSubmit={onSaveArtifact}>
                    <Input
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setArtifactTitle(e.target.value)
                      }}
                      value={artifactTitle}
                      name="artifact title"
                      placeholder="Artifact Title"
                      label="Artifact Title"
                      required={true}
                    />
                    <Input
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setArtifactCat(e.target.value)
                      }}
                      value={artifactCat}
                      name="artifact Category"
                      placeholder="Artifact Category"
                      label="Artifact Category"
                      required={true}
                    />

                    <div key={markDownKey} className={styles.markdown_wrapper}>
                      <MarkDownEditor
                        markdown={markDownContent}
                        onChange={(e) => {
                          console.log(e)
                          setMarkDownContent(e)
                        }}
                      />
                    </div>

                    <div className="justify-end gap-12">
                      <Button
                        type="submit"
                        text="Save"
                        category="primary_outline"
                      />
                      {editingArtifact !== undefined ? (
                        <Button
                          type="button"
                          text="Cancel"
                          category="primary_outline"
                          onClick={clearScratchPad}
                        />
                      ) : (
                        <Button
                          type="button"
                          text="Refresh"
                          category="primary_outline"
                          onClick={clearScratchPad}
                        />
                      )}
                    </div>
                  </form>
                </div>
              ) : (
                <div>
                  {!loadingArtifact && artifacts ? (
                    <SavedContent
                      artifacts={artifacts}
                      onInject={chatRef.current?.setMessage}
                      onDelete={handleDelete}
                      onEdit={(artifact: ArtifactT) => {
                        setEditingArtifact(artifact.id)
                        setArtifactTitle(artifact.title)
                        setArtifactCat(artifact.category)
                        setMarkDownContent(artifact.content)
                        setShowScratchPad(true)
                      }}
                    />
                  ) : (
                    <SkeletonCard category="row" qty={4} />
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      </section>
    </section>
  )
}

export default page
