import React from 'react'
const Search = props => {
  return (
    <form>
      <input
        type='text'
        value={props.value}
        placeholder='Find a city'
        onChange={props.change}
      />
    </form>
  )
}

export default Search
