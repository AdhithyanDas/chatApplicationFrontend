import React, { useContext, useEffect } from 'react'
import './MessageContainer.css'
import Messages from '../Messages'
import MessageInput from '../MessageInput'
import { messageContainerContext } from '../../../context/ContextApi'

function MessageContainer() {

  const { state, setState } = useContext(messageContainerContext)

  useEffect(() => {
    setState(() => ({ Boolean: true }))
  }, [])

  return (
    <>
      {
        state.Boolean ?
          <div className='d-flex justify-content-center flex-column align-items-center no-chat-selected'>
            <h3>Welcome HAHAHA <i className="fa-solid fa-handshake-angle" size="lg" /></h3>
            <h4>Select a chat to start Messaging</h4>
            <i className="fa-regular fa-message fs-3 mt-2" />
          </div>
          :
          <>
            <div className='message-container-main mt-3'>
              <div className="flex align-items-center ms-3">
                <div className="avatar online">
                  <div className="w-14 rounded-full">
                    <img className='img-fluid' src={state.profilePic} alt="Avatar" />
                  </div>
                </div>

                <div className='ms-3 mt-2'>
                  <p className='fw-bold'>{state.fullName}</p>
                </div>
              </div>
            </div>

            <div>
              <Messages />
            </div>
            <div style={{ height: '9vh' }}>
              <MessageInput />
            </div>
          </>

      }
    </>
  )
}

export default MessageContainer