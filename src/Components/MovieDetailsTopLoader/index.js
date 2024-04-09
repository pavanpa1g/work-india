import React from "react";
import "./index.css"; // Assuming you have a separate CSS file for the skeleton loader styles

const MovieDetailsTopLoader = () => {
  return (
    <div className="top-container skeleton-top">
      <div>
        <div className="movie-details skeleton-top">
          <div className="skeleton-image" />
          <div className="sk-detail">
            <div className="skeleton-title" />
            <div className="skeleton-rating" />
            <div className="skeleton-runtime" />
            {/* <div className="skeleton-genres" /> */}
            <div className="skeleton-release-date" />
          </div>
        </div>
        <div>
          <div className="skeleton-overview-head" />
          <div className="skeleton-overview-para" />
          <div className="skeleton-overview-para" />
        </div>
      </div>
      <div className="skeleton-backdrop-poster" />
    </div>
  );
};

export default MovieDetailsTopLoader;
