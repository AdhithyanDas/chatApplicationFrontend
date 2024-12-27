import React, { useContext, useEffect, useState, useRef } from 'react'
import './MessageContainer.css'
import Message from '../Message/Message'
import MessageInput from '../MessageInput/MessageInput'
import { messageContainerContext } from '../../../context/ContextApi'
import { useSocketContext } from '../../../context/SocketContext'

function MessageContainer() {

  const [response, setRespone] = useState("")

  const { state, setState } = useContext(messageContainerContext) // messageContainerContext
  const { onlineUsers } = useSocketContext() // onlineUsers
  const isOnline = onlineUsers.includes(state.id); // onlineUsers

  const scrollRef = useRef(null); // scrolling

  useEffect(() => {
    setState(() => ({ Boolean: true }))
  }, [])

  return (
    <>
      {
        state.Boolean ?
          <div className='d-flex justify-content-center flex-column align-items-center no-chat-selected'>
            {/* welcome-screen */}
            <h3 className='text-center'>Welcome, <strong>{sessionStorage.getItem('fullName')}</strong> <i className="fa-solid fa-handshake-angle " size="lg" /></h3>
            <h4 className='text-center'><strong>Select a chat</strong> to start messaging</h4>
            <i className="fa-regular fa-message fs-3 mt-2 message-icon" />
          </div>
          :
          <>
            <div className='message-container-main'>
              <div className="flex message-top-container ps-3 align-items-center">
                {/* profilePic */}
                <div className="avatar">
                  <div className="max-w-16 max-h-16 rounded-full">
                    <img className='img-fluid' src={state.profilePic} alt="Avatar" />
                  </div>
                </div>

                {/* fullName and online */}
                <div className='flex flex-col ms-3 '>
                  <span className='fw-bold'>{state.fullName}</span>
                  <span style={{ color: isOnline ? "#28A745" : "#E63946" }}>{`${isOnline ? "online" : "offline"}`}</span>
                </div>
              </div>

              {/* Message */}
              <div>
                <Message resp={setRespone} scrollRef={scrollRef} />
              </div>

              {/* MessageInput */}
              <div>
                <MessageInput response={scrollRef} />
              </div>
            </div>
          </>
      }
    </>
  )
}

export default MessageContainer