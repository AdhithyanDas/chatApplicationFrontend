import React from 'react'
import './Home.css'
import Sidebar from '../../components/sidebar/Sidebar/Sidebar'
import MessageContainer from '../../components/messages/MessageContainer/MessageContainer'

function Home() {

  return (
    <>
      <div className='home-main-container'>
        <div className='home-second-container flex'>
          {/* Sidebar */}
          <div className='pe-0 home-sidebar-container'>
            <Sidebar />
          </div>

          {/* MessageContainer */}
          <div className='home-message-container ps-0'>
            <MessageContainer />
          </div>
        </div>
      </div>
    </>
  )
}

export default Home