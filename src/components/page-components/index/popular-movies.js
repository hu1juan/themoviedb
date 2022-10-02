import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPopularMovies, addMovie } from '../../../store/moviesReducer';
import MovieItem from '../../commons/movie-item';
import PageLoader from '../../commons/page-loader';
import Pagination from '../../commons/pagination';

const PopularMovies = (props) => {

    const dispatchAction = useDispatch();
    const movies = useSelector(state => state.movies);

    useEffect(() => {
        dispatchAction(getPopularMovies({page: props.page}));
    }, [dispatchAction])

    useEffect(()=> {
        dispatchAction(getPopularMovies({page: props.page}));
    },[props.page])

    return (
        <div className='popular-movies-container'>
            <h1 className='popular-movies-title'>Popular Movies ({movies.popular.length})</h1>
            <ul className='popular-movies-list'>
                {movies.popular.map(movie => {
                    return <MovieItem key={movie.id} movie={movie} />
                })}
            </ul>
            <PageLoader isActive={movies.isPopularMoviesLoading} />
            <Pagination
                startPage={props.page}
                maxPage={movies.popularTotalPages > movies.popularMaxPages ? movies.popularMaxPages : movies.popularTotalPages}
                pageClickDispatchFunction={dispatchAction}
                pageClickFunction={getPopularMovies}
                maxButtons={10}
                isPageQuery={false}
            />
        </div>
    )
}

export default PopularMovies;