import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import React from "react";

// Images
import noPosterImage from '../../assets/imgs/movies/no-image.png';

const MovieItem = (props) => {

    const [isMoviePosterImageLoading, setIsMoviePosterImageLoading] = useState(true);
    const [updatedImageSrc, setUpdatedImageSrc] = useState(null);
    const movies = useSelector(state => state.movies);
    const movie = props.movie;
    const movieItem = React.createRef();

    const posterLoadingEvent = event => {

        const imageElement = event.target;

        if (imageElement.complete && imageElement.naturalHeight !== 0) setIsMoviePosterImageLoading(false);
    };

    const posterImageErrorEvent = (src) => {

        // Reload image
        setUpdatedImageSrc(src + '?v=' + Date.now())
    }

    return (
        <>
            <li className={`movie-item${isMoviePosterImageLoading === true ? ' loading' : ''}`} ref={movieItem}>
                <Link to={`/movie/${movie.id}`}>
                    <div className='movie-item-loading'></div>
                    <img
                        className='movie-poster'
                        alt={movie.title + ' poster'}
                        src={movie.poster_path == null ? noPosterImage : (updatedImageSrc === null ? movies.posterUrl + movie.poster_path : updatedImageSrc)}
                        onLoad={posterLoadingEvent}
                        onError={() => posterImageErrorEvent(movies.posterUrl + movie.poster_path)}
                    />
                    <h1 className='movie-title'>{movie.title}</h1>
                    <span className='movie-date'>{new Date(movie.release_date).toDateString()}</span>
                </Link>
            </li>
        </>
    )
}

export default MovieItem;