import { useEffect } from "react";
import { useParams } from "react-router-dom";
import MovieBanner from "../commons/movie-banner";
import { useDispatch, useSelector } from 'react-redux';
import PageLoader from "../commons/page-loader";
import { getMovieDetails } from "../../store/moviesReducer";
import MovieNotFound from "./movie-not-found";
import Head from "../commons/head";
import TextGroup from "../commons/text-group";
import TextList from "../commons/text-list";
import CardItem from "../commons/card-item";
import noImage from '../../assets/imgs/movies/no-image.png';

const MovieDetails = () => {

    const movies = useSelector(state => state.movies);
    const dispatchAction = useDispatch();
    const params = useParams();

    useEffect(() => {

        const movieId = params.id;
        
        dispatchAction(getMovieDetails({ movieId }));
    }, [dispatchAction, params.id])

    return (
        <>
            <Head />
            <PageLoader isActive={movies.isMovieDetailsLoading} />
            {movies.movieDetails != null ?
                <>
                    <MovieBanner
                        posterUrl={movies.posterUrl}
                        movie={movies.movieDetails}
                    />
                    <div className="movie-details-container">
                        <div className="left-movie-details">
                            <div className="cast-container">
                                <h1 className="cast-title">Cast ({movies.movieDetails.credits.cast.length})</h1>
                                <ul className="cast-list">
                                    {movies.movieDetails.credits.cast.map((cast,index)=>{
                                        return <CardItem
                                            key={cast.id + cast.character + index}
                                            src={cast.profile_path != null ? movies.posterUrl + cast.profile_path : noImage}
                                            title={cast.name}
                                            value={cast.character}
                                        />
                                    })}
                                </ul>
                            </div>
                            <div className="crew-container">
                                <h1 className="crew-title">Crew ({movies.movieDetails.credits.crew.length})</h1>
                                <ul className="crew-list">
                                    {movies.movieDetails.credits.crew.map((crew,index)=>{
                                        return <CardItem
                                            key={crew.id + crew.department + index}
                                            src={crew.profile_path != null ? movies.posterUrl + crew.profile_path : noImage}
                                            title={crew.name}
                                            value={crew.department}
                                        />
                                    })}
                                </ul>
                            </div>
                        </div>
                        <div className="right-movie-details">
                            <TextGroup
                                title={'Status'}
                                value={movies.movieDetails.status}
                            />
                            <TextGroup
                                title={'Original Language'}
                                value={movies.movieDetails.original_language}
                            />
                            <TextGroup
                                title={'Budget'}
                                value={movies.movieDetails.budget}
                            />
                            <TextGroup
                                title={'Revenue'}
                                value={(movies.movieDetails.revenue).toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                  })}
                            />
                            {typeof movies.movieDetails.production_companies == 'object' ?
                                <TextList
                                    title={'Production Companies'}
                                    list={movies.movieDetails.production_companies.map(company => company.name)}
                                />
                                :
                                null}
                            <TextGroup
                                title={'User Score'}
                                value={parseInt(movies.movieDetails.vote_average * 10) + '%'}
                            />
                        </div>
                    </div>

                </>
                :
                <MovieNotFound />
            }
        </>
    )
}

export default MovieDetails;