import React from 'react'
import Message from './Message'

function Messages() {
  return (
    <>
      <div className='mt-3' style={{overflow:'auto', height:'57vh'}}>
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
      </div>
    </>
  )
}

export default Messages