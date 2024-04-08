'use client'
import styles from './ChatMessage.module.scss'
import { Avatar, Button } from '@mozilla/lilypad-ui'
import { MessageT, UserChatMetaT } from 'types'
import Markdown from 'react-markdown'

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
            size={50}
          />

          <span>{userChatMeta.name}</span>
        </div>
        <div className={styles.message}>
          <p className="body-sm">
            <Markdown>{message}</Markdown>
          </p>
        </div>
        {hasActions && (
          <div className={styles.actions}>
            <Button icon="copy" classProp="mr-12" />
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
}
const ChatMessage = ({
  userChatMeta,
  message,
  onInject,
}: ChatMessagePropsT) => {
  const aiChatMeta: UserChatMetaT = {
    name: 'Assistant',
    avatar: 'https://api.dicebear.com/7.x/bottts/png?seed=chat',
    avatarAlt: 'M',
  }

  return (
    <div>
      {message.role === 'assistant' ? (
        <MessageBubble
          message={message.content}
          userChatMeta={aiChatMeta}
          type="incomming"
          onInject={() => {
            onInject && onInject()
          }}
          hasActions={true}
        />
      ) : (
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
