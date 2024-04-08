'use client'

import {
  forwardRef,
  useRef,
  useEffect,
  ChangeEvent,
  useImperativeHandle,
  ReactNode,
  useState,
  useCallback,
} from 'react'
import { clearChat } from 'services/openAi.service'
import { Button, Input } from '@mozilla/lilypad-ui'
import styles from './ChatContainer.module.scss'
import ChatMessage from '../ChatMessage/ChatMessage'
import TypingIndicator from '../TypingIndicator/TypingIndicator'
import { MessageT, UserChatMetaT } from 'types'

type ChatContainerPropsT = {
  title?: string | ReactNode
  placeHolderText?: string
  userChatMeta?: UserChatMetaT
  onMessageDispatch: Function
  onInject?: Function
  messagesClassName?: string
  className?: string
}

export type ChatContainerT = {
  setMessage: (message: MessageT) => void
}

const ChatContainer = forwardRef(
  (
    {
      title,
      placeHolderText = 'Message Assistant...',
      userChatMeta = {
        name: 'User',
        avatar: '',
        avatarAlt: 'US',
      },
      onMessageDispatch,
      onInject,
      className = '',
      messagesClassName = '',
    }: ChatContainerPropsT,
    ref,
  ) => {
    const [messages, setMessages] = useState<MessageT[]>([])
    const [currentMessage, setCurrentMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
      scrollToBottom()
    }, [messages])

    /**
     * Exposed Component API
     */
    useImperativeHandle(ref, () => {
      return {
        setMessage,
      }
    })

    const setMessage = useCallback((message: MessageT) => {
      setMessages((state) => [...state, message])

      console.log('message', message)

      if (message.role === 'user') {
        onMessageDispatch(message.content)
        setLoading(true)
        return
      }

      setLoading(false)
    }, [])

    const onClearChat = async () => {
      setMessages([])

      try {
        await clearChat()
      } catch (error) {
        console.log('error', error)
      }
    }

    const handleSubmit = () => {
      const messageObj: MessageT = {
        role: 'user',
        content: currentMessage,
      }
      setMessage(messageObj)
      setCurrentMessage('')
      setLoading(true)
    }

    return (
      <section className={`${className} ${styles.wrapper}`}>
        <div className="justify-between">
          <h3 className="heading-xs">{title}</h3>
          <Button
            text="Clear chat"
            category="primary_clear"
            icon="refresh-cw"
            onClick={onClearChat}
          />
        </div>

        <div className={`${messagesClassName} ${styles.messages_container}`}>
          {messages.map((message, i) => (
            <ChatMessage
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
            handleSubmit()
          }}
        >
          <Input
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setCurrentMessage(e.target.value)
            }}
            value={currentMessage}
            name="Message"
            placeholder={placeHolderText}
            label="Message Assistant"
            showLabel={false}
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
    )
  },
)

ChatContainer.displayName = 'ChatContainer'
export default ChatContainer
