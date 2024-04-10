import React, { useEffect, useState } from "react";
import MovieCard from "../MovieCard";
import { useSelector, useDispatch } from "react-redux";
import {API_KEY} from "../../constants"
import "./index.css";
import MovieCardLoader from "../MovieCardLoader";
import SearchComponent from "../SearchComponent";
import { apiConstants, loadData } from "../../helper/data";
import Slider from "../Slider";
import { setSearchInput } from "../../store/features/searchSlice";
import Pagination from "../Pagination";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [apiStatus, setApiStatus] = useState(apiConstants.initial);

  const dispatch = useDispatch();

  const searchInput = useSelector((state) => state.searchSlice.searchInput);

  const loadAllImages = async (currentPage) => {
    setApiStatus(apiConstants.inProgress);
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage}`;

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
    loadAllImages(currentPage);
    dispatch(setSearchInput(""));
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const totalPages = 500;

  const renderSuccess = () => {
    return (
      <div>
        <div className="movie-card-container">
          {movies.results.map((movie) => {
            return <MovieCard key={movie.id} movie={movie} />;
          })}
        </div>
        <div className="pagination-container">
          <Pagination
            totalPages={500}
            onPageChange={handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  };

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

  const slider = useSelector((state) => state.searchSlice.slideOpen);


  

  return (
    <div className="home-bg-container">
      {slider && <Slider />}
      {searchInput ? <SearchComponent /> : renderMovies()}
    </div>
  );
};

export default Home;
