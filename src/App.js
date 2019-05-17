import React, { Component } from "react";
import Movie from "./Movie";
import "./App.css";

class App extends Component {
  state = {};

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        movies: [
          {
            title: "Avangers : Assemble",
            poster:
              "https://images-na.ssl-images-amazon.com/images/I/71%2BNoq4xpNL._SY679_.jpg"
          },
          {
            title: "Avangers : Age of Ultron",
            poster:
              "https://images-na.ssl-images-amazon.com/images/I/71SIYxcSNOL._SY606_.jpg"
          },
          {
            title: "Avangers : Infinity War",
            poster:
              "https://images-na.ssl-images-amazon.com/images/I/A1krsAMZ4qL._SL1500_.jpg"
          },
          {
            title: "Avangers : End Game",
            poster:
              "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_.jpg"
          },
          {
            title: "SPIDER-MAN: FAR FROM HOME",
            poster:
              "https://d13ezvd6yrslxm.cloudfront.net/wp/wp-content/images/spider-man-far-from-home-posters-2.jpeg"
          }
        ]
      });
    }, 5000);
  }

  _renderMovies = () => {
    const movies = this.state.movies.map((movie, index) => {
      return <Movie title={movie.title} poster={movie.poster} key={index} />;
    });
    return movies;
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
