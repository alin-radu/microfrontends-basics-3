import React, { Suspense, useEffect, useState } from 'react';

import RountingContext from '../../../context/RoutingProvider.js';

import QuickBooking from '../QuickBooking/QuickBooking.jsx';

import './HomeContent.scss';

const MovieCard = React.lazy(() => import('components/MovieCard'));

const HomeContent = (props) => {
  const [movies, setMovies] = useState([]);

  useEffect(async () => {
    const response = await fetch('http://localhost:5555/movies');
    const data = await response.json();
    setMovies(data);
  }, []);

  const movieClicked = (item) => {
    if (typeof props.movieClicked === 'function') {
      props.movieClicked(item);
    }
  };

  const renderMovieList = () => {
    let items = movies.map((item) => {
      return (
        <div onClick={() => movieClicked(item)} key={item.name}>
          <MovieCard title={item.name} imageUrl={item.imageUrl} />
        </div>
      );
    });

    return items;
  };

  return (
    <RountingContext.Provider value={props.routing}>
      <div className="home-content-container">
        <QuickBooking></QuickBooking>
        <div className="movies-container">
          <Suspense fallback={<div>Loading...</div>}>{renderMovieList()}</Suspense>
        </div>
      </div>
    </RountingContext.Provider>
  );
};

export default HomeContent;
