'use client'

import { useRef, useState, useEffect, FormEvent, ChangeEvent } from 'react'
import ChatContainer, {
  ChatContainerT,
  LlmT,
} from '@Modules/chat_lib/ChatContainer/ChatContainer'
import Menu from '@Modules/chat/Menu/Menu'
// import ScrapeForm from '@Modules/chat/ScrapeForm/ScrapeForm'
import SavedContent from '@Modules/chat/SavedContent/SavedContent'
import styles from './page.module.scss'
import { ArtifactT, NewArtifactT } from 'models/Artifacts'
import { Button, Input, Modal } from '@mozilla/lilypad-ui'
import {
  deleteArtifactById,
  getArtifacts,
  addArtifact,
  updateArtifact,
} from 'services/artifacts.service'
import SkeletonCard from '@Shared/SkeletonCard/SkeletonCard'
import { getObsidianData } from 'services/users.service'
import DirectoryExplorer from '@Modules/chat/DirectoryExplorer/DirectoryExplorer'
import MDEditor, { selectWord } from '@uiw/react-md-editor'
import '@uiw/react-md-editor/markdown-editor.css'
// No import is required in the WebPack.
import '@uiw/react-markdown-preview/markdown.css'
import userImage from 'public/user.png'

const Page = () => {
  const chatRef = useRef<ChatContainerT>(null)
  const [showScratchPad, setShowScratchPad] = useState(false)
  const [apiKey, setApiKey] = useState('')
  const [markDownContent, setMarkDownContent] = useState('# Start Scratch Pad')
  const [loadingArtifact, setLoadingArtifacts] = useState(true)
  const [artifacts, setArtifacts] = useState<ArtifactT[]>([])
  const [artifactTitle, setArtifactTitle] = useState('')
  const [artifactCat, setArtifactCat] = useState('')
  const [markDownKey, setMarkDownKey] = useState(0)
  const [editingArtifact, setEditingArtifact] = useState<string | undefined>(
    undefined,
  )
  const [llm, setLlm] = useState<LlmT>('openAi')
  const [isModalVisible, setIsModalVisible] = useState(false)

  useEffect(() => {
    const getData = async () => {
      const data = await getObsidianData()
      if (!data) return
      data.apiKey && setApiKey(data.apiKey)
    }
    getData()
  }, [])

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getArtifacts()
        setArtifacts(data)
        setLoadingArtifacts(false)
      } catch (error) {
        console.log('error', error)
      }
    }

    getData()
  }, [])

  const inject = (markdown: string) => {
    setMarkDownKey((state) => state + 1)
    setMarkDownContent(markdown)
    setShowScratchPad(true)
  }

  const onCloseModal = () => {
    setIsModalVisible(false)
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

  const onOpenObsidian = () => {
    // do the modal here?
    setIsModalVisible(true)
  }

  const onFileImport = ({ title, category, content }: NewArtifactT) => {
    setIsModalVisible(false)
    setArtifactTitle(title)
    setArtifactCat(category)
    setMarkDownContent(content)
    setMarkDownKey((state) => state + 1)
  }

  return (
    <>
      <section className={styles.page}>
        <Menu />

        <section className={styles.wrapper}>
          <section className={styles.container}>
            <div>
              <ChatContainer
                messagesClassName={styles.chat_container}
                ref={chatRef}
                onInject={inject}
                userChatMeta={{
                  avatar: userImage.src as string,
                  name: 'You',
                  avatarAlt: 'U',
                }}
              />
            </div>

            <div className={styles.side_panel}>
              <div className={styles.side_panel_header}>
                <Button
                  category="primary_clear"
                  text="Saved Content"
                  onClick={() => setShowScratchPad(false)}
                  className={`mr-12 ${styles.tab_link} ${
                    !showScratchPad ? styles.tab_link_active : ''
                  }`}
                />
                <Button
                  className={`${styles.tab_link} ${
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
                    {Boolean(apiKey) && (
                      <div className="justify-end">
                        {/* <Button
                          category="secondary_outline"
                          text="Import from obsidian"
                          onClick={() => {
                            onOpenObsidian()
                          }}
                        /> */}
                      </div>
                    )}

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

                      <div
                        key={markDownKey}
                        className={styles.markdown_wrapper}
                      >
                        <MDEditor
                          height={700}
                          value={markDownContent}
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
                        apiKey={apiKey}
                        artifacts={artifacts}
                        onInject={(message) => {
                          chatRef.current?.handleSubmit(message.content)
                        }}
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
      <Modal isVisible={isModalVisible} onClose={onCloseModal}>
        <div className="justify-between">
          <div className="mb-24">
            <h4 className="heading-md mb-12">Select File</h4>
            <p className="paragraph">
              Artifact category will be set to the file path of the markdown
              file. When saving the artifact keep this defualt category name if
              you want to save back to the current markdown file in Obsidian.
            </p>
          </div>

          <div>
            <Button
              icon="x"
              onClick={onCloseModal}
              category="primary_outline"
            />
          </div>
        </div>
        {apiKey && (
          <DirectoryExplorer apiKey={apiKey} onFileImport={onFileImport} />
        )}
      </Modal>
    </>
  )
}

export default Page
