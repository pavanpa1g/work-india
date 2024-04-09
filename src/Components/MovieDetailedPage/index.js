import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {useSelector} from "react-redux"


import "./index.css";
import CastCardLoader from "../CastCardLoader";
import MovieDetailsTopLoader from "../MovieDetailsTopLoader";
import { data } from "../../helper/data";
import Slider from "../Slider";
import SearchComponent from "../SearchComponent";

const apiConstants = {
  initial: "initial",
  inProgress: "inProgress",
  success: "success",
  failure: "failure",
};

const MovieDetailedPage = () => {
  const [apiStatus, setApiStatus] = useState(apiConstants.initial);
  const [castApiStatus, setCastApiStatus] = useState(apiConstants.initial);
  const [movieDetails, setMovieDetails] = useState({});
  const [movieCast, setMovieCast] = useState({});
  const params = useParams();
  const { id } = params;

  const fetchMovieDetails = async () => {
    setApiStatus(apiConstants.inProgress);
    const api = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;

    try {
      const response = await fetch(api);

      if (response.ok) {
        const data = await response.json();
        setApiStatus(apiConstants.success);
        setMovieDetails(data);
      } else {
        setApiStatus(apiConstants.failure);
      }
    } catch (error) {
      console.log(error);
      setApiStatus(apiConstants.failure);
    }
  };

  const fetchMovieCastDetails = async () => {
    setCastApiStatus(apiConstants.inProgress);
    const api = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;

    try {
      const response = await fetch(api);
      if (response.ok) {
        const data = await response.json();
        setMovieCast(data);
        setCastApiStatus(apiConstants.success);
      } else {
        console.log(response);
        setCastApiStatus(apiConstants.failure);
      }
    } catch (error) {
      console.log(error);
      setCastApiStatus(apiConstants.failure);
    }
  };
  useEffect(() => {
    fetchMovieDetails();
    fetchMovieCastDetails();
  }, []);

  const renderCastSuccess = () => {
    return (
      <div className="cast-container">
        {/* {movieCast.cast && */}
        {movieCast.cast.map((cast) => {
          return (
            <div className="cast-card" key={cast.id}>
              <img
                src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
                alt={cast.name}
                className="cast-image"
              />
              <p className="cast-name">{cast.name}</p>
              <p className="cast-character">Character: {cast.character}</p>
            </div>
          );
        })}
      </div>
    );
  };

  const renderCastFailure = () => {
    return (
      <div className="failure-container">
        <p>Something went wrong. Please try again later</p>
        <button onClick={fetchMovieCastDetails}>Try Again</button>
      </div>
    );
  };

  const renderCastInProgress = () => {
    return (
      <div className="cast-container">
        {data.map((data) => {
          return <CastCardLoader key={data.id} />;
        })}
      </div>
    );
  };

  const renderCast = () => {
    switch (castApiStatus) {
      case apiConstants.success:
        return renderCastSuccess();
      case apiConstants.failure:
        return renderCastFailure();
      case apiConstants.inProgress:
        return renderCastInProgress();
      default:
        return null;
    }
  };

  const renderInProgress = () => <MovieDetailsTopLoader />;

  const renderSuccess = () => {
    return (
      <div className="top-container">
        <div>
          <div className="movie-details">
            <img
              src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
              alt={movieDetails.original_title}
              className="movie-poster-detail"
            />
            <div>
              <h1 className="movie-title-dt">{movieDetails.original_title}</h1>
              <p className="rating-dt">Rating: {movieDetails.vote_average}</p>
              <span className="runtime rating-dt">
                {movieDetails.runtime} min{" "}
              </span>
              {movieDetails.genres &&
                movieDetails.genres.map((genre, i) => {
                  return (
                    <span className="rating-dt" key={genre.id}>
                      {genre.name}
                      {movieDetails.genres.length - 1 !== i ? ", " : ""}
                    </span>
                  );
                })}
              <p className="rating-dt">{movieDetails.release_date}</p>
            </div>
          </div>
          <div>
            <h1 className="overview-head">Overview</h1>
            <p className="overview-para">{movieDetails.overview}</p>
          </div>
        </div>
        <img
          src={`https://image.tmdb.org/t/p/w500${movieDetails.backdrop_path}`}
          alt={movieDetails.original_title}
          className="backdrop-poster"
        />
      </div>
    );
  };

  const renderFailure = () => {
    return (
      <div className="failure-container">
        <p>Something went wrong. Please try again later</p>
        <button onClick={fetchMovieDetails}>Try Again</button>
      </div>
    );
  };

  const renderMovieDetails = () => {
    switch (apiStatus) {
      case apiConstants.success:
        return renderSuccess();
      case apiConstants.failure:
        return renderFailure();
      case apiConstants.inProgress:
        return renderInProgress();
      default:
        return null;
    }
  };

  const slider = useSelector((state) => state.searchSlice.slideOpen);
  const searchInput = useSelector((state) => state.searchSlice.searchInput);

  return (
    <div className="movie-detailed-bg-container">
      {slider && <Slider />}

      {searchInput ? (
        <SearchComponent />
      ) : (
        <>
          {renderMovieDetails()}

          <h3 className="cast">Cast</h3>

          {renderCast()}
        </>
      )}
    </div>
  );
};

export default MovieDetailedPage;
