import React from "react";
import Gif from "./Gif";

const GifList = props => {
  const results = props.data;
  let gifs = results.map(gif => <Gif key={gif.id} url={gif.url_c} />);
  return (
    <div>
      <h2>{props.title}</h2>
      <ul>{gifs}</ul>
    </div>
  );
};

export default GifList;
