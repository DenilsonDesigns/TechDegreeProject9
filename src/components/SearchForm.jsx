import React, { Component } from "react";
import "../css/index.css";

class SearchForm extends Component {
  state = {
    searchText: ""
  };

  onSearchChange = e => {
    this.setState({ searchText: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    e.currentTarget.reset();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="search-form">
        <label hidden htmlFor="search">
          Search
        </label>
        <input
          onChange={this.onSearchChange}
          name="search"
          placeholder="Search..."
          type="search"
        />

        <button type="submit" id="submit">
          Submit
        </button>
      </form>
    );
  }
}

export default SearchForm;
