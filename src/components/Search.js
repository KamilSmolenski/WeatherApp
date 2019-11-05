import React from "react";
import "./Search.scss";
import ReactTypingEffect from "react-typing-effect";
function handleSubmit(e) {
  e.preventDefault();
}
const Search = props => {
  return (
    <div className="SearchPanel">
      <ReactTypingEffect
        eraseDelay={3000}
        speed={200}
        text={["for today.", "forecast for tomorrow.", "for next 5 days."]}
        staticText="Get weather"
        className="Typing"
      />
      <form onSubmit={handleSubmit}>
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
