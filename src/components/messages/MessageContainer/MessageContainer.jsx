import React, { useContext, useEffect, useState, useRef } from 'react'
import './MessageContainer.css'
import Message from '../Message'
import MessageInput from '../MessageInput'
import { messageContainerContext } from '../../../context/ContextApi'
import { useSocketContext } from '../../../context/SocketContext'

function MessageContainer() {

  const { state, setState } = useContext(messageContainerContext)

  const { onlineUsers } = useSocketContext()
  const isOnline = onlineUsers.includes(state.id); // Check if the current user is online

  const [response, setRespone] = useState("")

  const scrollRef = useRef(null); // Ref for scrolling


  useEffect(() => {
    setState(() => ({ Boolean: true }))
  }, [])

  return (
    <>
      {
        state.Boolean ?
          <div className='d-flex justify-content-center flex-column align-items-center no-chat-selected'>
            <h3 className='text-center'>Welcome, <strong>{sessionStorage.getItem('fullName')}</strong> <i className="fa-solid fa-handshake-angle " size="lg" /></h3>
            <h4 className='text-center'><strong>Select a chat</strong> to start messaging</h4>
            <i className="fa-regular fa-message fs-3 mt-2 message-icon" />
          </div>
          :
          <>
            <div className='message-container-main'>
              <div className="flex message-top-container ps-3 align-items-center">
                <div className="avatar">
                  <div className="max-w-16 max-h-16 rounded-full">
                    <img className='img-fluid' src={state.profilePic} alt="Avatar" />
                  </div>
                </div>

                <div className='flex flex-col ms-3 '>
                  <span className='fw-bold'>{state.fullName}</span>
                  <span style={{ color: isOnline ? "#28A745" : "#E63946" }}>{`${isOnline ? "online" : "offline"}`}</span>
                </div>
              </div>

              <div>
                <Message resp={setRespone} scrollRef={scrollRef} />
              </div>
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