import React from 'react';

const BirdNav = () => {
  return(
    <div className="birdnav">
      <div className="birdtab"><a href="/sbird/recent">Recent</a></div>
      <div className="birdtab"><a href="/sbird/notable">Notable</a></div>
      <div className="birdtab"><a href="/sbird/all-time">All</a></div>
    </div>
  )
}

export default BirdNav