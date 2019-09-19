import React from "react";
import "./Search.css";
const Search = props => {
  return (
    <form className="Form">
      <input
        className="Input"
        type="text"
        value={props.value}
        placeholder="Find a city"
        onChange={props.change}
      />
    </form>
  );
};

export default Search;
