import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Movie.css";

function Movie({ title, poster }) {
  return (
    <div>
      <MoviePoster poster={poster} />
      <h1>{title}</h1>
    </div>
  );
}

Movie.propTypes = {
  title: PropTypes.string.isRequired,
  poster: PropTypes.string
};

function MoviePoster({ poster }) {
  return (
    <div>
      <img src={poster} alt="Movie Poster" />
    </div>
  );
}

MoviePoster.propTypes = {
  poster: PropTypes.string.isRequired
};
export default Movie;
