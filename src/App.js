import React, { Component } from "react";
import "./App.css";
import "./css/index.css";
import Config from "./config";
import GifList from "./components/GifList";
import SearchForm from "./components/SearchForm";
import NavBar from "./components/NavBar";
import { Route, Redirect, Switch } from "react-router-dom";
import NotFound from "./components/NotFound";

let apiKey = Config.apiKey;

class App extends Component {
  constructor() {
    super();
    this.state = {
      cats: [],
      dogs: [],
      computers: [],
      searchResults: []
    };
  }

  componentDidMount() {
    const apiCatCall = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=cats&per_page=24&extras=url_c&format=json&nojsoncallback=1`;
    const apiDogCall = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=dogs&per_page=24&extras=url_c&format=json&nojsoncallback=1`;
    const apiCpuCall = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=computers&per_page=24&extras=url_c&format=json&nojsoncallback=1`;

    fetch(apiCatCall)
      .then(response => response.json())
      .then(responseData => {
        this.setState({ cats: responseData.photos.photo });
      })
      .catch(err => {
        console.error("Error with fetching Flickr", err);
      });
    fetch(apiDogCall)
      .then(response => response.json())
      .then(responseData => {
        this.setState({ dogs: responseData.photos.photo });
      })
      .catch(err => {
        console.error("Error with fetching Flickr", err);
      });
    fetch(apiCpuCall)
      .then(response => response.json())
      .then(responseData => {
        this.setState({ computers: responseData.photos.photo });
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
        this.setState({ searchResults: responseData.photos.photo });
      })
      .catch(err => {
        console.error("Error with fetching Flickr", err);
      });
    // this.props.history.push("/results");
  };

  render() {
    return (
      <React.Fragment>
        <SearchForm onSearch={this.performSearch} />
        <NavBar />

        <h2>Results</h2>
        <div className="photo-container">
          <Switch>
            <Route
              exact
              path="/cats"
              render={() => <GifList data={this.state.cats} />}
            />
            <Route
              exact
              path="/dogs"
              render={() => <GifList data={this.state.dogs} />}
            />
            <Route
              exact
              path="/computers"
              render={() => <GifList data={this.state.computers} />}
            />
            <Route
              exact
              path="/results"
              render={() => <GifList data={this.state.searchResults} />}
            />
            <Redirect from="/" exact to="/cats" />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
