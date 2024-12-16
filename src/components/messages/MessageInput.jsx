import React from 'react'
import './MessageInput.css'

function MessageInput() {
    return (
        <>
            <div className='input-container'>
                <input type="text" placeholder='Type a message...' className='messageinp' />
                <button className='btn message-btn'>
                    <i className="fa-solid fa-paper-plane send-icon" />
                </button>
            </div>
        </>
    )
}

export default MessageInput