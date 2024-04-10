import React, { useEffect, useState } from "react";

import MovieCard from "../MovieCard";
import {useLocation} from "react-router-dom"
import { useSelector } from "react-redux";

import "./index.css";
import MovieCardLoader from "../MovieCardLoader";
import { API_KEY } from "../../constants";
import Pagination from "../Pagination";

const apiConstants = {
  initial: "initial",
  inProgress: "inProgress",
  success: "success",
  failure: "failure",
};

const SearchComponent = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pathName,setPathName] = useState("")

  const params = useLocation()
  

  const [apiStatus, setApiStatus] = useState(apiConstants.initial);

  const searchInput = useSelector((state) => state.searchSlice.searchInput);

  const loadAllImages = async (currentPage) => {
    setApiStatus(apiConstants.inProgress);
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${params.pathname.slice(
      8
    )}&page=${currentPage}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setApiStatus(apiConstants.success);
        setMovies(data);
      } else {
        setApiStatus(apiConstants.failure);
        console.log(response);
      }
    } catch (error) {
      setApiStatus(apiConstants.failure);
      console.log(error);
    }
  };
  useEffect(() => {
    setPathName(params.pathname.slice(8));
    loadAllImages(currentPage);
  }, [currentPage, searchInput, params.pathname]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchInput]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderSuccess = () => {
    return (
      <div>
        <div className="movie-card-container">
          {movies.results.map((movie) => {
            return <MovieCard key={movie.id} movie={movie} />;
          })}
        </div>
        {movies.results.length > 0 && (
          <div className="pagination-container">
            <Pagination
              totalPages={movies.total_pages}
              onPageChange={handlePageChange}
              currentPage={currentPage}
            />
          </div>
        )}

        {movies.results.length === 0 && (
          <div className="no-results">
            <h3>
              No movies were found for the search{" "}
              <span className="search-span">{pathName}</span>
            </h3>
            <p className="try-again">Please try a different search term</p>
          </div>
        )}
      </div>
    );
  };

  const loadData = [
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
    {
      id: 4,
    },
    {
      id: 5,
    },
    {
      id: 6,
    },
    {
      id: 7,
    },
    {
      id: 8,
    },
  ];

  const renderInProgress = () => {
    return (
      <div className="movie-card-container">
        {loadData.map((data) => {
          return <MovieCardLoader key={data.id} />;
        })}
      </div>
    );
  };

  const renderMovies = () => {
    switch (apiStatus) {
      case apiConstants.success:
        return renderSuccess();
      case apiConstants.failure:
        return <div>Something went wrong. Please try again later</div>;
      case apiConstants.inProgress:
        return renderInProgress();
      default:
        return null;
    }
  };

  return <div className="home-bg-container">{renderMovies()}</div>;
};

export default SearchComponent;
