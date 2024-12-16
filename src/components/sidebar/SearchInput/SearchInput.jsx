import React from 'react'
import './SearchInput.css'

function SearchInput() {
  return (
    <>
      <div className='search-container'>
        <input type="text" id='searchinp' required />
        <label htmlFor="searchinp">Search...</label>
        <i className="fa-solid fa-magnifying-glass" />
      </div>
    </>
  )
}

export default SearchInput