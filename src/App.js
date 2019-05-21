import React, { Component } from "react";
import Movie from "./Movie";
import dotenv from "dotenv";
import "./App.css";
dotenv.config();

class App extends Component {
  state = {};

  componentDidMount() {
    this._getMovies();
  }

  _renderMovies = () => {
    const movies = this.state.movies.map(movie => {
      return (
        <Movie
          title={movie.title}
          poster={"https://image.tmdb.org/t/p/w300/" + movie.poster_path}
          key={movie.id}
          genre={movie.genre_ids}
          overview={movie.overview}
        />
      );
    });
    return movies;
  };

  _getGenre = () => {
    const GENRE_API_URL =
      "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
      process.env.REACT_APP_API_KEY +
      "&language=ko";
    return fetch(GENRE_API_URL)
      .then(genre => genre.json())
      .catch(err => console.log(err));
  };

  _getMovies = async () => {
    const movies = await this._callApi();
    const genre = await this._getGenre();

    console.log(movies);

    this.setState({
      movies
    });
  };

  _callApi = () => {
    const API_URL =
      "https://api.themoviedb.org/3/movie/top_rated?api_key=" +
      process.env.REACT_APP_API_KEY +
      "&language=ko";

    return fetch(API_URL)
      .then(res => res.json())
      .then(json => json.results)
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="App">
        {this.state.movies ? this._renderMovies() : "Loading !!"}
      </div>
    );
  }
}

export default App;
