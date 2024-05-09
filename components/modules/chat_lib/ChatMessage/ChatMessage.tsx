'use client'

import styles from './ChatMessage.module.scss'
import { Avatar, Button, CopyButton } from '@mozilla/lilypad-ui'
import { MessageT, UserChatMetaT } from 'types'
import Markdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism'
import chatPNG from 'public/hippo_logo.png'

type MessageBubblePropsT = {
  userChatMeta: UserChatMetaT
  message: string
  type: 'incomming' | 'out_going'
  hasActions?: boolean
  onInject?: Function
}
const MessageBubble = ({
  userChatMeta,
  message,
  type,
  hasActions,
  onInject,
}: MessageBubblePropsT) => {
  return (
    <div className={styles[`${type}_wrapper`]}>
      <div className={styles.container}>
        <div className={styles.name_tag}>
          <Avatar
            classProp={styles.avatar}
            src={userChatMeta.avatar}
            alt={userChatMeta.avatarAlt}
            size={38}
          />

          <span>{userChatMeta.name}</span>
        </div>
        <div className={styles.message}>
          <div className="body-sm">
            <Markdown
              children={message}
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '')
                  return !inline && match ? (
                    <>
                      <SyntaxHighlighter
                        children={String(children).replace(/\n$/, '')}
                        language={match[1]}
                        PreTag="div"
                        style={darcula}
                      />
                      <div className="justify-end">
                        <CopyButton value={children as string} />
                      </div>
                    </>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  )
                },
              }}
            />
          </div>
        </div>
        {hasActions && (
          <div className={styles.actions}>
            <CopyButton value={message} classProp="mr-12" />
            <Button
              icon="edit-3"
              onClick={() => {
                onInject && onInject()
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}

type ChatMessagePropsT = {
  userChatMeta: UserChatMetaT
  message: MessageT
  onInject?: Function
  index: number
}
const ChatMessage = ({
  userChatMeta,
  message,
  onInject,
  index,
}: ChatMessagePropsT) => {
  const aiChatMeta: UserChatMetaT = {
    name: 'Assistant',
    avatar: chatPNG.src,
    avatarAlt: 'M',
  }

  return (
    <div>
      {message.role === 'assistant' && (
        <MessageBubble
          message={message.content}
          userChatMeta={aiChatMeta}
          type="incomming"
          onInject={() => {
            onInject && onInject()
          }}
          hasActions={true}
        />
      )}
      {message.role === 'user' && (
        <MessageBubble
          userChatMeta={userChatMeta}
          message={message.content}
          type="out_going"
        />
      )}
    </div>
  )
}

export default ChatMessage
