import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import SearchInput from '../SearchInput/SearchInput';
import People from '../People/People';
import './Sidebar.css';

function Sidebar() {
  const [search, setSearch] = useState('');

  return (
    <div className="sidebar-main-container">
      <Row className="sidebar-second-container">
        <Col sm={12} className="sidebar-search-input">
          <SearchInput search={search} setSearch={setSearch} />
        </Col>
        <Col sm={12} className="sidebar-scroll-container">
          <People search={search} />
        </Col>
      </Row>
    </div>
  );
}

export default Sidebar;
