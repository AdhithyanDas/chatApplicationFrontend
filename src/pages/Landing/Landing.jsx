import React from 'react'
import './Landing.css'
import landingImg from '../../images/chat-bot.svg'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Landing() {
    return (
        <>
            <div className='landing-main-container d-flex justify-content-center'>
                <Row className='text-center'>
                    <Col sm={12} className='d-flex justify-content-center'>
                        <img src={landingImg} alt="landingimg" className='img-fluid landing-img' />
                    </Col>

                    <Col sm={12} className='d-flex flex-column'>
                        <h2>Connect easily with your family and friends over countries</h2>

                        <div className='d-flex flex-column'>
                            <p className='landing-terms-button btn btn-link text-decoration-none mt-4 mb-0'>Terms & Privacy Policy</p>
                            <Link to={'/auth'} className='landing-starting-button'>Start Messaging</Link>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default Landing