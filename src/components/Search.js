import React from "react";
import "./Search.scss";
const Search = props => {
  return (
    <div className="SearchPanel">
      <h1>Get current weather </h1>
      <form>
        <input
          type="text"
          value={props.value}
          placeholder="Find a city"
          onChange={props.change}
        />
      </form>
    </div>
  );
};

export default Search;
