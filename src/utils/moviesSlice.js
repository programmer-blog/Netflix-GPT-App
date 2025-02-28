import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
    name: "movies",
    initialState: {
        nowPlayingMovies: null,
        popularMovies: null,
        topRatedMovies: null,
        upcoming: null,
        trailerVideo: null
    },
    reducers: {
        addNowPlayingMovies: (state, action) => {
            state.nowPlayingMovies = action.payload;
        },
        addPopularMovies: (state, action) => {
            state.popularMovies = action.payload;
        },
        addTopRatedMovies: (state, action) => {
            state.topRatedMovies = action.payload;
        },
        addUpcomingMovies: (state, action) => {
            state.upcoming = action.payload;
        },
        addTrailerVideo: (state, action) => {
            state.trailerVideo = action.payload;
        }
    }
});

export const { addPopularMovies, addTopRatedMovies, addUpcomingMovies, addNowPlayingMovies, addTrailerVideo } = moviesSlice.actions;

export default moviesSlice.reducer;