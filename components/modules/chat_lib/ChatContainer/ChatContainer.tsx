'use client'

import {
  forwardRef,
  useRef,
  useEffect,
  ChangeEvent,
  useImperativeHandle,
  useState,
  useCallback,
} from 'react'
import styles from './ChatContainer.module.scss'
import ChatMessage from '../ChatMessage/ChatMessage'
import TypingIndicator from '../TypingIndicator/TypingIndicator'
import { MessageT, UserChatMetaT } from 'types'
import { Button, TextArea, Dropdown, DropdownT } from '@mozilla/lilypad-ui'
import { getResponse } from 'services/openAi.service'
import { getLocalLLMResponse } from 'services/localLLM.service'
import { LocalStorage } from 'const/LocalStorage'
import { localStorageUtil } from 'utils/locaStorageUtil'

export type LlmT = 'openAi' | 'local'

const initConvo = {
  role: 'system',
  content:
    'Asstant is a virtual entity born from the essence of clean code and the wisdom of countless programming hours.',
}

type ChatContainerPropsT = {
  placeHolderText?: string
  userChatMeta?: UserChatMetaT
  onInject?: Function
  messagesClassName?: string
  className?: string
}

export type ChatContainerT = {
  handleSubmit: (message: string) => void
  setDefaultConversation: (message: MessageT[]) => void
}

const ChatContainer = forwardRef(
  (
    {
      placeHolderText = 'Message Assistant...',
      userChatMeta = {
        name: 'You',
        avatar: '',
        avatarAlt: 'US',
      },
      onInject,
      className = '',
      messagesClassName = '',
    }: ChatContainerPropsT,
    ref,
  ) => {
    const [messages, setMessages] = useState<MessageT[]>([initConvo])
    const [currentMessage, setCurrentMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const dropdownRef = useRef<DropdownT>(null)
    const [llm, setLlm] = useState<LlmT>('openAi')

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
      scrollToBottom()
      if (messages.length > 1) {
        localStorageUtil.setItem(LocalStorage.CHAT_HISTORY, messages)
      }
    }, [messages])

    useEffect(() => {
      const storedChatHistory = localStorageUtil.getItem(
        LocalStorage.CHAT_HISTORY,
      )
      storedChatHistory && setMessages(storedChatHistory)
      setLlm(localStorageUtil.getItem(LocalStorage.LLM) || 'openAi')
    }, [])

    /**
     * Exposed Component API
     */
    useImperativeHandle(ref, () => {
      return {
        handleSubmit,
        setDefaultConversation,
      }
    })

    const onMessageDispatch = async (messages: MessageT[], updateLlm: LlmT) => {
      try {
        setLoading(true)

        const resp =
          updateLlm === 'openAi'
            ? await getResponse(messages)
            : await getLocalLLMResponse(messages)

        setMessages((state) => [...state, resp])
        setLoading(false)
      } catch (error) {
        console.log('error', error)
      }
    }

    const setDefaultConversation = (messages: MessageT[]) => {
      setMessages(messages)
    }

    const handleModelSelection = (llm: LlmT) => {
      setLlm(llm)
      localStorageUtil.setItem(LocalStorage.LLM, llm)
      dropdownRef.current?.closeDropdown()
    }

    const handleSubmit = useCallback(
      (message: string) => {
        const messageObj: MessageT = {
          role: 'user',
          content: message,
        }
        // This seem to be a better way to get the current state
        const prox = [...messages, messageObj]
        setMessages((state) => [...state, messageObj])
        onMessageDispatch(prox, llm)
        setCurrentMessage('')
      },
      [llm, messages],
    )

    const clearChat = () => {
      localStorageUtil.setItem(LocalStorage.CHAT_HISTORY, [])
      setDefaultConversation([])
    }

    const action = useCallback(
      (event: KeyboardEvent) => {
        const textarea = event.target as HTMLTextAreaElement

        if (event.shiftKey && event.key === 'Enter') {
          event.preventDefault()
          const start = textarea.selectionStart
          const end = textarea.selectionEnd

          textarea.value =
            textarea.value.substring(0, start) +
            '\n' +
            textarea.value.substring(end)

          textarea.selectionStart = textarea.selectionEnd = start + 1
          return
        }

        if (event.key === 'Enter') {
          event.preventDefault()
          handleSubmit(textarea.value)
        }
      },
      [handleSubmit],
    )

    useEffect(() => {
      const chatBox = document.getElementById('chat-box')
      chatBox?.addEventListener('keydown', action)

      return () => {
        chatBox?.removeEventListener('keydown', action)
      }
    }, [action])

    return (
      <div>
        <section className="justify-between">
          <h3 className="heading-xs">How can I help?</h3>
          <div className="z-1">
            <Button
              className="mr-12"
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
                  className="mb-12"
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
                    text="Local LLM"
                    label="Local LLM"
                    category="primary_clear"
                    onClick={() => {
                      handleModelSelection('local')
                    }}
                  />
                </div>
              }
            />
          </div>
        </section>
        <section className={`${className} ${styles.wrapper}`}>
          <div className={`${messagesClassName} ${styles.messages_container}`}>
            {messages.map((message, i) => (
              <ChatMessage
                index={i}
                userChatMeta={userChatMeta}
                message={message}
                key={i}
                onInject={() => {
                  onInject && onInject(message.content)
                }}
              />
            ))}
            <div ref={messagesEndRef}></div>
          </div>

          <div className={styles.loading}>
            <TypingIndicator isVisible={loading} />
          </div>

          <form
            action=""
            onSubmit={(e) => {
              e.preventDefault()
              handleSubmit(currentMessage)
            }}
          >
            <TextArea
              showLabel={false}
              id="chat-box"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setCurrentMessage(e.target.value)
              }}
              value={currentMessage}
              name="Message"
              placeholder={placeHolderText}
              label="Message Assistant"
              className="mb-12"
            />
            <div className={styles.button_wrapper}>
              <Button
                disabled={!Boolean(currentMessage.length)}
                text="Submit"
                type="submit"
              />
            </div>
          </form>
        </section>
      </div>
    )
  },
)

ChatContainer.displayName = 'ChatContainer'
export default ChatContainer
