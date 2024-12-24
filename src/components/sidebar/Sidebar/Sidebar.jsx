import React, { useState } from 'react';
import SearchInput from '../SearchInput/SearchInput';
import People from '../People/People';
import './Sidebar.css';

function Sidebar() {
  const [search, setSearch] = useState('');

  return (
    <div className="sidebar-main-container">
      <div className="sidebar-second-container">
        <div className="sidebar-search-input">
          <SearchInput search={search} setSearch={setSearch} />
        </div>
        <div className="sidebar-scroll-container">
          <People search={search} />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
