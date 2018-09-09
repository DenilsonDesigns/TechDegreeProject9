import React, { Component } from "react";
import "./App.css";
import "./css/index.css";
import Config from "./config";
import GifList from "./components/GifList";
import SearchForm from "./components/SearchForm";

let apiKey = Config.apiKey;

class App extends Component {
  constructor() {
    super();
    this.state = {
      gifs: []
    };
  }

  componentDidMount() {
    let apiTag = "computer";
    const apiCall = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${apiTag}&per_page=24&extras=url_c&format=json&nojsoncallback=1`;

    fetch(apiCall)
      .then(response => response.json())
      .then(responseData => {
        this.setState({ gifs: responseData.photos.photo });
      })
      .catch(err => {
        console.error("Error with fetching Flickr", err);
      });
  }

  performSearch = query => {
    const apiCall = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&extras=url_c&format=json&nojsoncallback=1`;
    fetch(apiCall)
      .then(response => response.json())
      .then(responseData => {
        this.setState({ gifs: responseData.photos.photo });
      })
      .catch(err => {
        console.error("Error with fetching Flickr", err);
      });
  };

  render() {
    return (
      <React.Fragment>
        <SearchForm onSearch={this.performSearch} />
        <nav className="main-nav">
          <ul>
            <li>
              <a>Cats</a>
            </li>
            <li>
              <a>Dogs</a>
            </li>
            <li>
              <a>Computers</a>
            </li>
          </ul>
        </nav>

        <h2>Results</h2>
        <div className="photo-container">
          <GifList data={this.state.gifs} />
        </div>
      </React.Fragment>
    );
  }
}

export default App;
