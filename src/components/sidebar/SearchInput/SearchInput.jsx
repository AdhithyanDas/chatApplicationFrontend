import React, { useState } from 'react'
import './SearchInput.css'

function SearchInput({ search, setSearch }) {

  const [loading, setLoading] = useState(false) // loading-spinner

  const handleSearchChange = (e) => {
    setSearch(e.target.value)
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
    }, 500)
  }

  return (
    <div className='search-container'>
      <input
        type="text"
        id='searchinp'
        required
        value={search}
        onChange={handleSearchChange}
      />

      <label htmlFor="searchinp">Search...</label>

      {loading ? (
        <div className="spinner fa-solid fa-spinner fa-spin"></div>
      ) : (
        <i className="fa-solid fa-magnifying-glass"></i>
      )}
    </div>
  )
}

export default SearchInput
