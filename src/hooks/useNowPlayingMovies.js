import { useEffect } from 'react'
import { API_OPTIONS, API_URL } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { addNowPlayingMovies } from '../utils/moviesSlice'


//Fetch Data from TMDB API
const useNowPlayingMovies = async () => {
    const dispatch = useDispatch();
    const getNowPlayingMovies = async () => {
        const data = await fetch(API_URL, API_OPTIONS);
        const json = await data.json();
        dispatch(addNowPlayingMovies(json.results));
    };

    useEffect(() => {
        getNowPlayingMovies();
    }, []);
}


export default useNowPlayingMovies;