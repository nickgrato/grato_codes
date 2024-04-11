'use client'

import {
  useRef,
  useState,
  useEffect,
  FormEvent,
  ChangeEvent,
  useCallback,
} from 'react'
import { getResponse } from 'services/openAi.service'
import ChatContainer, {
  ChatContainerT,
  LlmT,
} from '@Modules/chat_lib/ChatContainer/ChatContainer'
import Menu from '@Modules/chat/Menu/Menu'
// import ScrapeForm from '@Modules/chat/ScrapeForm/ScrapeForm'
import SavedContent from '@Modules/chat/SavedContent/SavedContent'
import styles from './page.module.scss'
import { ArtifactT } from 'models/Artifacts'
import dynamic from 'next/dynamic'
import { Button, Input, Dropdown, dropdownT } from '@mozilla/lilypad-ui'
import {
  deleteArtifactById,
  getArtifacts,
  addArtifact,
  updateArtifact,
} from 'services/artifacts.service'
import SkeletonCard from '@Shared/SkeletonCard/SkeletonCard'
import { MessageT } from 'types'
import { getUser } from 'services/users.service'
import { getLlamaResponse } from 'services/llamaFile.service'

const MarkDownEditor = dynamic(
  () => import('@Modules/chat/MarkDownEditor/MarkDownEditor'),
  { ssr: false },
)

const initConvo = {
  role: 'system',
  content:
    'Asstant is a virtual entity born from the essence of clean code and the wisdom of countless programming hours.',
}

const Page = () => {
  const chatRef = useRef<ChatContainerT>(null)
  const dropdownRef = useRef<dropdownT>(null)
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
  const chatHistory = useRef<MessageT[]>([initConvo])
  const [llm, setLlm] = useState<LlmT>('openAi')

  useEffect(() => {
    const storedChatHistory = localStorage.getItem('chatHistory')
    chatHistory.current = storedChatHistory
      ? JSON.parse(storedChatHistory)
      : [initConvo]
  }, [])

  useEffect(() => {
    const getData = async () => {
      const data = await getUser()
      if (!data) return
      data.obsidianKey && setApiKey(data.obsidianKey)
    }
    getData()
  }, [])

  const onMessageDispatch = useCallback(
    async (message: string, updateLlm: LlmT) => {
      try {
        chatHistory.current.push({ role: 'user', content: message })
        // need to call the ai here.
        console.log('updateLlm', updateLlm)

        const resp =
          updateLlm === 'openAi'
            ? await getResponse(chatHistory.current)
            : await getLlamaResponse(chatHistory.current)

        chatHistory.current.push(resp)
        localStorage.setItem('chatHistory', JSON.stringify(chatHistory.current))
        chatRef.current?.setMessage(resp)
      } catch (error) {
        console.log('error', error)
      }
    },
    [llm],
  )

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

    if (chatHistory.current.length > 1) {
      chatRef.current?.setDefaultConversation(chatHistory.current)
    }
  }, [])

  const inject = (markdown: string) => {
    const formattedMarkdown = markdown.replace(/```/g, '`')
    setMarkDownKey((state) => state + 1)
    setMarkDownContent(formattedMarkdown)
    setShowScratchPad(true)
  }

  const clearChat = () => {
    chatHistory.current = []
    localStorage.setItem('chatHistory', JSON.stringify([]))
    chatRef.current?.setDefaultConversation([])
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

  const handleModelSelection = (llm: LlmT) => {
    setLlm(llm)
    dropdownRef.current?.closeDropdown()
  }

  return (
    <section className={styles.page}>
      <Menu />

      <section className={styles.wrapper}>
        <section className={styles.container}>
          <div>
            <div className="justify-between">
              <h3 className="heading-xs">How can I help?</h3>
              <div>
                <Button
                  classProp="mr-12"
                  text="Clear chat"
                  category="primary_outline"
                  icon="refresh-cw"
                  onClick={() => {
                    clearChat()
                  }}
                />
                <Dropdown
                  alignment="right"
                  width={210}
                  ref={dropdownRef}
                  cta={
                    <Button
                      classProp="mb-12"
                      icon="chevron-down"
                      text={`LLM: ${llm}`}
                      label="toggle"
                      category="primary_outline"
                    />
                  }
                  content={
                    <div className="p-12 flex-column">
                      <Button
                        text="OpenAI"
                        label="OpenAI"
                        category="primary_clear"
                        onClick={() => {
                          handleModelSelection('openAi')
                        }}
                      />
                      <Button
                        text="llama"
                        label="llama"
                        category="primary_clear"
                        onClick={() => {
                          handleModelSelection('llama')
                        }}
                      />
                    </div>
                  }
                />
              </div>
            </div>
            <ChatContainer
              messagesClassName={styles.chat_container}
              ref={chatRef}
              onMessageDispatch={onMessageDispatch}
              llm={llm}
              onInject={inject}
              userChatMeta={{
                avatar: 'https://api.dicebear.com/7.x/bottts/png?seed=fun',
                name: 'User',
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
                      apiKey={apiKey}
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

export default Page
