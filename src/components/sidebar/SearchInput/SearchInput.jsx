import React, { useState } from 'react'
import './SearchInput.css'

function SearchInput({ search, setSearch }) {
  const [loading, setLoading] = useState(false)

  const handleSearchChange = (e) => {
    setSearch(e.target.value)
    setLoading(true) // Show spinner while searching

    // Simulate a delay for loading (you can replace this with an actual API call)
    setTimeout(() => {
      setLoading(false) // Hide spinner after the delay
    }, 500) // 1-second delay for simulation
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

      {/* Conditionally render the spinner or search icon */}
      {loading ? (
        <div className="spinner fa-solid fa-spinner fa-spin"></div>  // Show spinner when loading
      ) : (
        <i className="fa-solid fa-magnifying-glass"></i>  // Show search icon when not loading
      )}
    </div>
  )
}

export default SearchInput
