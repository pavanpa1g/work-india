import React from 'react'


import "./index.css"

const CastCardLoader = () => {
  return (
    <div className="loader-cast-card skeleton">
      <div className="skeleton-image"></div>
      <div className="skeleton-name"></div>
      <div className="skeleton-character"></div>
    </div>
  );
}

export default CastCardLoader