import React from "react";
import PropTypes from "prop-types";
import "./Movie.css";

function Movie({ title, poster, genre, overview }) {
  return (
    <div className="movie">
      <div className="movie__column">
        <MoviePoster poster={poster} alt={title} />
      </div>
      <div className="movie__column">
        <h1>{title}</h1>
        <div className="movie_genre">
          {genre.map((genre, index) => (
            <MovieGenre genre={genre} key={index} />
          ))}
        </div>
        <div className="movie__overview">{overview}</div>
      </div>
    </div>
  );
}

Movie.propTypes = {
  title: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired
};

function MoviePoster({ poster, alt }) {
  return (
    <div>
      <img src={poster} alt={alt} title={alt} className="movie__poster" />
    </div>
  );
}

MoviePoster.propTypes = {
  poster: PropTypes.string.isRequired
};

function MovieGenre({ genre }) {
  return <span className="movie__genre">{genre}, </span>;
}

MovieGenre.propTypes = {
  genre: PropTypes.array.isRequired
};

export default Movie;
