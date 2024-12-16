import React, { useState } from 'react'
import './MessageContainer.css'
import Messages from '../Messages'
import MessageInput from '../MessageInput'

function MessageContainer() {

  const [state, setState] = useState(false)

  return (
    <>
      {
        state ?
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
                    <img className='img-fluid' src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="Avatar" />
                  </div>
                </div>

                <div className='ms-3 mt-2'>
                  <p className='fw-bold'>HAHAhaha</p>
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