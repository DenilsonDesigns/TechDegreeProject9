import React from "react";
import Gif from "./Gif";

// https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg

const GifList = props => {
  const results = props.data;
  let gifs = results.map(gif => <Gif key={gif.id} url={gif.url_c} />);
  return <ul>{gifs}</ul>;
};

export default GifList;
