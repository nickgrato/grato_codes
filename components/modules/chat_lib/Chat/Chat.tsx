'use client'
import { useState, ChangeEvent, useRef } from 'react'
import { Button, Input, Modal } from '@mozilla/lilypad-ui'
import { getResponse } from 'services/openAi.service'
import styles from './Chat.module.scss'

import ChatContainer, { ChatContainerT } from '../ChatContainer/ChatContainer'

const Chat = () => {
  const [isChatVisible, setIsChatVisible] = useState(false)
  const chatRef = useRef<ChatContainerT>(null)

  const onMessageDispatch = async (message: string) => {
    // // need to call the ai here.
    // const resp = await getResponse(message)
    // console.log('resp', resp)
    // chatRef.current?.setMessage(resp)
  }

  return (
    <>
      <Button
        text="Chat"
        size="medium"
        category="primary_outline"
        icon="message-circle"
        onClick={() => {
          setIsChatVisible(true)
        }}
      />
      {/* <Modal isVisible={isChatVisible} onClose={() => setIsChatVisible(false)}>
        <ChatContainer
          ref={chatRef}
          title="How may I help you?"
          onMessageDispatch={onMessageDispatch}
          userChatMeta={{
            avatar: 'https://api.dicebear.com/7.x/bottts/png?seed=fun',
            name: 'User',
            avatarAlt: 'U',
          }}
        ></ChatContainer>
      </Modal> */}
    </>
  )
}

export default Chat
