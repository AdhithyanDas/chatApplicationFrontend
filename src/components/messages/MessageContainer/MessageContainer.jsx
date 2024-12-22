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
            <h3>Welcome {sessionStorage.getItem('fullName')} <i className="fa-solid fa-handshake-angle" size="lg" /></h3>
            <h4>Select a chat to start Messaging</h4>
            <i className="fa-regular fa-message fs-3 mt-2" />
          </div>
          :
          <>
            <div className='message-container-main mt-3'>
              <div className="flex align-items-center ms-3">
                <div className={`avatar`}>
                  <div className="w-14 rounded-full">
                    <img className='img-fluid' src={state.profilePic} alt="Avatar" />
                  </div>
                </div>

                <div className='ms-3 mt-2'>
                  <p className='fw-bold'>{state.fullName}</p>
                  <span className=''>{`${isOnline ? "online" : "offline"}`}</span>
                </div>
              </div>
            </div>

            <div style={{ height: '60vh', overflow: 'auto' }} >
              <Message resp={setRespone} scrollRef={scrollRef} />
            </div>
            <div style={{ height: '9vh' }}>
              <MessageInput response={scrollRef} />
            </div>
          </>

      }
    </>
  )
}

export default MessageContainer