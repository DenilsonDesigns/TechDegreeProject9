import React, { Component } from "react";
import "./App.css";
import "./css/index.css";
import Config from "./config";
import GifList from "./components/GifList";
import SearchForm from "./components/SearchForm";
import NavBar from "./components/NavBar";
import { Route, Redirect, Switch } from "react-router-dom";
import NotFound from "./components/NotFound";
import Spinner from "./components/UI/Spinner";

let apiKey = Config.apiKey;

class App extends Component {
  constructor() {
    super();
    this.state = {
      cats: [],
      dogs: [],
      computers: [],
      searchResults: [],
      loading: false,
      searchedOnce: false
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
    this.setState({ loading: true });
    const apiCall = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&extras=url_c&format=json&nojsoncallback=1`;
    fetch(apiCall)
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          searchResults: responseData.photos.photo,
          loading: false,
          searchedOnce: true
        });
      })
      .catch(err => {
        console.error("Error with fetching Flickr", err);
        this.setState({ loading: false, searchedOnce: true });
      });
  };

  render() {
    let searchAppend = (
      <GifList title="Search Results" data={this.state.searchResults} />
    );

    if (this.state.loading) {
      searchAppend = <Spinner />;
    } else if (
      this.state.searchResults.length === 0 &&
      this.state.searchedOnce
    ) {
      searchAppend = <h2>No results</h2>;
    }

    return (
      <React.Fragment>
        {/* <SearchForm onSearch={this.performSearch} /> */}
        <NavBar />

        <div className="photo-container">
          <Switch>
            <Route
              exact
              path="/cats"
              render={() => (
                <GifList title="Kitty Pics" data={this.state.cats} />
              )}
            />
            <Route
              exact
              path="/dogs"
              render={() => (
                <GifList title="Doggo Pics" data={this.state.dogs} />
              )}
            />
            <Route
              exact
              path="/computers"
              render={() => (
                <GifList title="CPU Pics" data={this.state.computers} />
              )}
            />
            <Route
              exact
              path="/results"
              render={() => (
                <React.Fragment>
                  <SearchForm onSearch={this.performSearch} />
                  {searchAppend}
                </React.Fragment>
              )}
            />

            <Redirect from="/" exact to="/cats" />
            <Route path="/" component={NotFound} />
            {/* <Redirect to="/not-found" /> */}
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
