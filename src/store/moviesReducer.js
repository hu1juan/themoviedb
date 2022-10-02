import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getPopularMovies = createAsyncThunk(
    'movies/getPopularMovies',
    async (obj, { rejectWithValue, fulfillWithValue }) => {

        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=8d1ee66d5f4a30eabf5b1b0333deee7c&language=en-US&page=${obj.page}`).then(
                response => response.json()
            );

            if (response.success === false) return rejectWithValue(response);

            return fulfillWithValue(response);
        }
        catch (err) {

            return rejectWithValue({
                success: false,
                status_message: 'Something went wrong'
            });
        }
    }
);

export const searchMovie = createAsyncThunk(
    'movies/searchMovie',
    async (obj, { rejectWithValue, fulfillWithValue, getState }) => {

        const state = getState();

        const keyword = state.movies.searchKeyword || obj.keyword;

        try {
            const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=8d1ee66d5f4a30eabf5b1b0333deee7c&language=en-US&page=${obj.page}&include_adult=false&query=${keyword}`).then(
                response => response.json()
            );

            if (response.success === false) return rejectWithValue(response);

            return fulfillWithValue(response);
        }
        catch (err) {

            return rejectWithValue({
                success: false,
                status_message: 'Something went wrong'
            });
        }
    }
);

export const getMovieDetails = createAsyncThunk(
    'movies/getMovieDetails',
    async (obj, { rejectWithValue, fulfillWithValue, getState }) => {

        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${obj.movieId}?api_key=8d1ee66d5f4a30eabf5b1b0333deee7c&language=en-US&append_to_response=credits`).then(
                response => response.json()
            );

            if (response.success === false) return rejectWithValue(response);

            return fulfillWithValue(response);
        }
        catch (err) {

            return rejectWithValue({
                success: false,
                status_message: 'Something went wrong'
            });
        }
    }
);

export const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        posterUrl: 'https://image.tmdb.org/t/p/original',
        popular: [],
        popularTotalPages: 0,
        popularMaxPages: 500,
        searchedMovies: [],
        searchTotalPages: 0,
        searchMaxPages: 500,
        searchTotalResults: 0,
        searchKeyword: null,
        isSearchingDone: false,
        isPopularMoviesLoading: false,
        featuredMovieData: null,
        isMovieDetailsLoading: false,
        movieDetails: null
    },
    reducers: {
        setSearchKeyword: (state, action) => {
            state.searchKeyword = action.payload.keyword;
        },
        getFeaturedMovieData: (state) => {

            if(state.popular.length == 0) return;

            let movieData = null;

            while(movieData == null)
            {
                const randomIndex = Math.floor(Math.random() * state.popular.length);
                const tmpMovieData = state.popular[randomIndex];

                if(tmpMovieData.backdrop_path !== null && tmpMovieData.poster_path !== null) movieData = tmpMovieData;

            }

            state.featuredMovieData = movieData;
        }
    },
    extraReducers: builder => {

        // getPopularMovies
        builder
            .addCase(getPopularMovies.pending, state => {
                state.isPopularMoviesLoading = true;
            })
            .addCase(getPopularMovies.fulfilled, (state, action) => {
                state.popular = action.payload.results;
                state.popularTotalPages = action.payload.total_pages;
                state.isPopularMoviesLoading = false;
            })
            .addCase(getPopularMovies.rejected, state => {
                state.isPopularMoviesLoading = false;
            })

            // searchMovie
            .addCase(searchMovie.pending, state => {
                state.isSearchingDone = false;
            })
            .addCase(searchMovie.fulfilled, (state, action) => {
                state.searchedMovies = action.payload.results;
                state.searchTotalPages = action.payload.total_pages;
                state.searchTotalResults = action.payload.total_results;
                state.isSearchingDone = true;
            })
            .addCase(searchMovie.rejected, state => {
                state.isSearchingDone = false;
            })

            // getMovieDetails
            .addCase(getMovieDetails.pending, state => {
                state.isMovieDetailsLoading = true;
            })
            .addCase(getMovieDetails.fulfilled, (state, action) => {
                state.movieDetails = action.payload;
                state.isMovieDetailsLoading = false;
            })
            .addCase(getMovieDetails.rejected, state => {
                state.isMovieDetailsLoading = false;
            })
    }
});

export const { getFeaturedMovieData, setSearchKeyword } = moviesSlice.actions;

export default moviesSlice.reducer;