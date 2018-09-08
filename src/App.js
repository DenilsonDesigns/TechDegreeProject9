import React, { Component } from "react";
import "./App.css";
import Config from "./config";
import GifList from "./components/GifList";

let apiKey = Config.apiKey;
let apiTag = "cats";
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
        this.setState({ gifs: responseData });
      });
  }

  render() {
    return (
      <div className="App">
        <GifList data={this.state.gifs} />
        {/* <p>{this.state.gifs.photos.photo[0]}</p> */}
      </div>
    );
  }
}

export default App;
