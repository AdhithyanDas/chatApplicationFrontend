import React from 'react'
import { Row, Col } from 'react-bootstrap'
import SearchInput from '../SearchInput/SearchInput'
import Peoples from '../Peoples/Peoples'
import './Sidebar.css'

function Sidebar() {
    return (
        <>
            <div className='sidebar-main-container'>
                <Row className='sidebar-second-container'>
                    <Col sm={12} className='sidebar-search-input'>
                        <SearchInput />
                    </Col>
                    <Col sm={12} className='sidebar-scroll-container'>
                        <Peoples />
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default Sidebar