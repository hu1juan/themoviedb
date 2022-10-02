import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchKeyword } from '../../store/moviesReducer'

import SearchedMovies from '../page-components/search-movie/searched-movies';

import Head from '../commons/head';
import { useLocation } from 'react-router-dom';
import PageNotFound from './page-not-found';
const queryString = require('query-string');

const SearchMoviePage = () => {

    const movies = useSelector(state => state.movies);
    const dispatchAction = useDispatch();
    const [page, setPage] = useState(0);
    const [keyword, setKeyword] = useState(null);

    const location = useLocation();

    useEffect(() => {
        
        const queries = queryString.parse(location.search);
        let tmpPage = queries.page;
        let tmpKeyword = queries.query;

        if (queries.query === undefined) return;

        if (queries.page === undefined) tmpPage = 1;

        setPage(tmpPage);
        setKeyword(tmpKeyword);
        dispatchAction(setSearchKeyword(tmpKeyword));

    }, [location])

    return (
        <>
            <Head />
            {page === 0 || keyword === null || page > movies.searchMaxPages
                ?
                <PageNotFound />
                :
                <SearchedMovies
                    page={page}
                    keyword={keyword}
                />
            }
        </>
    )
}

export default SearchMoviePage;