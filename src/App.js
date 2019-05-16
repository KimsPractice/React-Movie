import React, { Component } from "react";
import Movie from "./Movie";
import "./App.css";

const movies = [
  {
    id: 1,
    title: "Avangers : Assemble",
    poster:
      "https://images-na.ssl-images-amazon.com/images/I/71%2BNoq4xpNL._SY679_.jpg"
  },
  {
    id: 2,
    title: "Avangers : Age of Ultron",
    poster:
      "https://images-na.ssl-images-amazon.com/images/I/71SIYxcSNOL._SY606_.jpg"
  },
  {
    id: 3,
    title: "Avangers : Infinity War",
    poster:
      "https://images-na.ssl-images-amazon.com/images/I/A1krsAMZ4qL._SL1500_.jpg"
  },
  {
    title: "Avangers : End Game",
    poster:
      "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_.jpg"
  }
];

class App extends Component {
  render() {
    return (
      <div className="App">
        {movies.map((movie, index) => {
          return (
            <Movie title={movie.title} poster={movie.poster} key={index} />
          );
        })}
      </div>
    );
  }
}

export default App;
