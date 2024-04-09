import React from 'react'


import "./index.css"

const MovieCardLoader = () => {
  return (
    <div className="skeleton-loader">
      {/* Skeleton loader elements */}
      <div className="skeleton-poster"></div>
      <div className="skeleton-title"></div>
      <div className="skeleton-rating"></div>
    </div>
  );
}

export default MovieCardLoader