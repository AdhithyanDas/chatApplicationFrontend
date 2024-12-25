import React from 'react'
import './Home.css'
import { Row, Col } from 'react-bootstrap'
import Sidebar from '../../components/sidebar/Sidebar/Sidebar'
import MessageContainer from '../../components/messages/MessageContainer/MessageContainer'

function Home() {
  
  return (
    <>
      <div className='home-main-container'>
        <div className='home-second-container flex'>
          <div className='pe-0 home-sidebar-container'>
            <Sidebar />
          </div>

          <div className='home-message-container ps-0'>
            <MessageContainer />
          </div>
        </div>
      </div>
    </>
  )
}

export default Home