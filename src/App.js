import React, { Component } from "react";
import "./App.css";
import "./css/index.css";
import Config from "./config";
import GifList from "./components/GifList";

let apiKey = Config.apiKey;
let apiTag = "dogs";
const apiCall = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${apiTag}&per_page=24&extras=url_o&format=json&nojsoncallback=1`;

class App extends Component {
  constructor() {
    super();
    this.state = {
      gifs: []
    };
  }

  componentDidMount() {
    fetch(apiCall)
      .then(response => response.json())
      .then(responseData => {
        this.setState({ gifs: responseData.photos.photo });
      });
  }

  render() {
    return (
      <div className="photo-container">
        <GifList data={this.state.gifs} />
      </div>
    );
  }
}

export default App;
