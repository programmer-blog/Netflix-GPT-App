import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux'

const SecondaryContainer = () => {
    const movies = useSelector((store) => store.movies);
        
    return (
            <div className="bg-black">
                <div className='-mt-112 pl-12 relative z-20'>
                <MovieList title="Now Playing" movies={movies?.nowPlayingMovies || []} />
                <MovieList title="Top Rated" movies={movies?.topRatedMovies || []} />
                <MovieList title="Popular" movies={movies?.popularMovies || []} />
                <MovieList title="Upcoming Movies" movies={movies?.upcoming || []} />
            </div>
            </div>
    ) 
    {/*
                movieList - Popular
                    MovieCards*n
                MoviewList - Now Playing
                MovieList - Trending
                MovieList - Horror

            */}
}

export default SecondaryContainer