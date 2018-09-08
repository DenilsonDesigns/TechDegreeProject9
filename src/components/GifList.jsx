import React from "react";
import Gif from "./Gif";

const GifList = props => {
  const results = props.data;
  let gifs = results.map(gif => <Gif />);
  return (
    <ul>
      <Gif />
    </ul>
  );
};

export default GifList;
