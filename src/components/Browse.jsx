import useNowPlayingMovies from '../hooks/useNowPlayingMovies'
import Header from './Header'
import React from 'react'
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import usePopularMovies from '../hooks/usePopularMovies';
import useTopRatedMovies from '../hooks/useTopRatedMovies';
import useUpcomingMovies from '../hooks/useUpcoming';

const Browse = () => {
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();
  return (
    <div>
    <Header />
    <MainContainer />
    <SecondaryContainer />
    </div>
   
  )
  { /*
      MainContainer
        - videobackground
        - Vidoe Title
      Secondary container
        - Movie List * n
          - Cards * n
     */
  }
}

export default Browse