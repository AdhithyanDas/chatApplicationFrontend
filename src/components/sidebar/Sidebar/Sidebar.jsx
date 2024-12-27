import React, { useState } from 'react';
import './Sidebar.css';
import SearchInput from '../SearchInput/SearchInput';
import People from '../People/People';

function Sidebar() {

  const [search, setSearch] = useState('');

  return (
    <div className="sidebar-main-container">
      <div className="sidebar-second-container">
        {/* SearchInput */}
        <div className="sidebar-search-input">
          <SearchInput search={search} setSearch={setSearch} />
        </div>

        {/* People */}
        <div className="sidebar-scroll-container">
          <People search={search} />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
