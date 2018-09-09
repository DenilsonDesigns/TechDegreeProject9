import React from "react";
import Gif from "./Gif";

const GifList = props => {
  const results = props.data;
  let gifs = results.map(gif => <Gif url={gif.url_o} />);
  return <ul>{gifs}</ul>;
};

export default GifList;
