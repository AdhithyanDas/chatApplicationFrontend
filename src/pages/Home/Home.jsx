import React from 'react'
import './Home.css'
import { Row, Col } from 'react-bootstrap'
import Sidebar from '../../components/sidebar/Sidebar/Sidebar'
import MessageContainer from '../../components/messages/MessageContainer/MessageContainer'

function Home() {
  return (
    <>
      <div className='home-main-container'>
        <div className='home-second-container'>
          <Row>
            <Col sm={12} md={12} lg={3}>
              <Sidebar />
            </Col>

            <Col sm={12} md={12} lg={9} className='home-message-container ps-0'>
              <MessageContainer />
            </Col>
          </Row>
        </div>
      </div>
    </>
  )
}

export default Home