import React from "react";

import "./index.css";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const { poster_path, title, vote_average,id } = movie;

  return (
    <Link to={`/movie/${id}`} className="movie-card-bg-container">
      <img
        src={`https://image.tmdb.org/t/p/w500${poster_path}`}
        alt={title}
        className="movie-poster"
      />
      <div className="movie-card-content-container">
        <p className="title">{title.lengnth> 40 ? title.substr(0, 0) + "..." : title}</p>
        <p className="rating">Rating: {vote_average}</p>
      </div>
    </Link>
  );
};

export default MovieCard;
