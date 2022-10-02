import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MovieItem from '../../commons/movie-item';
import Pagination from '../../commons/pagination';
import { searchMovie } from '../../../store/moviesReducer';
import MovieNotFound from '../../pages/movie-not-found';

const SearchedMovies = (props) => {

    const movies = useSelector(state => state.movies);
    const dispatchAction = useDispatch();

    useEffect(() => {
        dispatchAction(searchMovie({
            keyword: props.keyword,
            page: props.page
        }));

    }, [props.page])

    return (
        <>
            {movies.searchedMovies.length != 0 ?
                <>
                    <h1 className='searched-movies-title'>Search results ({movies.searchTotalResults})</h1>
                    <ul className='searched-movies-list'>
                        {movies.searchedMovies.map(movie => {
                            return <MovieItem key={movie.id} movie={movie} />
                        })}
                    </ul>
                    <Pagination
                        startPage={props.page}
                        maxPage={movies.searchTotalPages > movies.searchMaxPages ? movies.searchMaxPages : movies.searchTotalPages}
                        pageClickDispatchFunction={() => { }}
                        pageClickFunction={() => { }}
                        maxButtons={10}
                        isPageQuery={true}
                    />
                </>
                : (movies.isSearchingDone === true ? <MovieNotFound /> : null)}
        </>
    )
}

export default SearchedMovies;