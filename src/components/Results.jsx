import React from "react";
import Gif from "./Gif";
import SearchForm from "./SearchForm";

const Results = props => {
  const results = props.data;
  let gifs = results.map(gif => <Gif key={gif.id} url={gif.url_c} />);
  return (
    <div>
      <SearchForm />
      <h2>Results</h2>
      <ul>{gifs}</ul>
    </div>
  );
};

export default Results;
