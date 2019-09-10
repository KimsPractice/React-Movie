import React from "react";
import SearchPresenter from "./SearchPresenter";
import { movieApi, tvApi } from "../../api";

export default class extends React.Component {
  state = {
    movieResults: null,
    tvResults: null,
    searchTerm: "",
    error: null,
    loading: false
  };

  handleSubmiit = event => {
    event.preventDefault();
    const { searchTerm } = this.state;
    if (searchTerm !== "") {
      this.searchByterm();
    }
  };

  updateTerm = event => {
    const {
      target: { value }
    } = event;

    this.setState({
      searchTerm: value
    });
  };

  searchByterm = async () => {
    const { searchTerm } = this.state;
    this.setState({
      loading: true
    });
    try {
      const {
        data: { results: movieResults }
      } = await movieApi.searchMovie(searchTerm);
      const {
        data: { results: tvResults }
      } = await tvApi.searchTv(searchTerm);
      this.setState({
        movieResults,
        tvResults
      });
    } catch (error) {
      this.setState({
        error: "Can't find results"
      });
    } finally {
      this.setState({
        loading: false
      });
    }
  };

  render() {
    const { movieResults, tvResults, searchTerm, error, loading } = this.state;
    return (
      <SearchPresenter
        movieResults={movieResults}
        tvResults={tvResults}
        searchTerm={searchTerm}
        error={error}
        loading={loading}
        handleSubmiit={this.handleSubmiit}
        updateTerm={this.updateTerm}
      />
    );
  }
}
