import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PopularMovies from '../page-components/index/popular-movies';
import Head from '../commons/head';
import { useParams } from 'react-router-dom';
import PageNotFound from './page-not-found';
import { getFeaturedMovieData } from '../../store/moviesReducer';
import MovieBanner from '../commons/movie-banner';

const Index = () => {

    const movies = useSelector(state => state.movies);
    const dispatchAction = useDispatch();
    const params = useParams();

    useEffect(() => {
        dispatchAction(getFeaturedMovieData());
    }, [movies.popular])

    return (
        <>
            {
                params.page > movies.popularMaxPages ?
                    <PageNotFound /> :
                    <>
                        <Head />
                        {
                            movies.popular.length > 0 && movies.featuredMovieData != null
                                ?
                                <MovieBanner posterUrl={movies.posterUrl} movie={movies.featuredMovieData} />
                                :
                                null
                        }
                        
                        <PopularMovies page={params.page != undefined ? params.page : 1} />
                    </>
            }
        </>
    )
}

export default Index;