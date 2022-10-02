import { useState } from "react";
import LoadingAnimation from "./loading-animation";
import { Link } from 'react-router-dom'
import RoundDot from "./round-dot";
import MovieGenre from "./movie-genre";

const MovieBanner = (props) => {

    const [isMovieBannerLoading, setIsMovieBannerLoading] = useState(true);
    const [updatedMovieBannerImageSrc, setUpdatedMovieBannerImageSrc] = useState(null);

    const [isMoviePosterImageLoading, setIsMoviePosterImageLoading] = useState(true);
    const [updatedPosterImageSrc, setUpdatedPosterImageSrc] = useState(null);

    const movieBannerOnloadEvent = event => {

        const imageElement = event.target;

        if (imageElement.complete && imageElement.naturalHeight !== 0) {
            setIsMovieBannerLoading(false);
        }
    };

    const bannerImageErrorEvent = (src) => {

        // Reload banner image
        setUpdatedMovieBannerImageSrc(src + '?v=' + Date.now())
    }

    const moviePosterOnloadEvent = event => {

        const imageElement = event.target;

        if (imageElement.complete && imageElement.naturalHeight !== 0) {
            setIsMoviePosterImageLoading(false);
        }
    };

    const posterImageErrorEvent = (src) => {
        
        // Reload poster image
        setUpdatedPosterImageSrc(src + '?v=' + Date.now())
    }

    const timeConvert = (n) => {
        var num = n;
        var hours = (num / 60);
        var rhours = Math.floor(hours);
        var minutes = (hours - rhours) * 60;
        var rminutes = Math.round(minutes);
        return rhours + "h" + rminutes + "m";
    }

    return (
        <>
            <div className='movie-banner'>
                <div className={`movie-banner-loader${isMovieBannerLoading === true ? ' active' : ''}`}>
                    <LoadingAnimation />
                </div>
                <div className="movie-banner-poster-container">
                    <img
                        alt={props.movie.title + ' banner image'}
                        className='movie-banner-poster'
                        src={updatedMovieBannerImageSrc === null ? props.posterUrl + props.movie.backdrop_path : updatedMovieBannerImageSrc}
                        onLoad={movieBannerOnloadEvent}
                        onError={() => bannerImageErrorEvent(props.posterUrl + props.movie.backdrop_path)}
                    />
                </div>
                <div className="movie-banner-content">
                    <div className="content-left">
                        <div className={`movie-banner-poster-small-loading${isMoviePosterImageLoading === true ? ' active' : ''}`}>
                            <LoadingAnimation />
                        </div>
                        <Link to={`/movie/${props.movie.id}`}>
                            <img
                                alt={props.movie.title + ' poster image'}
                                className="movie-banner-poster-small"
                                src={updatedPosterImageSrc === null ? props.posterUrl + props.movie.poster_path : updatedPosterImageSrc}
                                onLoad={moviePosterOnloadEvent}
                                onError={() => posterImageErrorEvent(props.posterUrl + props.movie.poster_path)}
                            />
                        </Link>
                    </div>
                    <div className="content-right">
                        <h1 className="movie-banner-title">{props.movie.title}</h1>
                        <div className="movie-banner-date-time-container">
                            <span className="movie-banner-date">{new Date(props.movie.release_date).toDateString()}</span>
                            {props.movie.runtime !== undefined ?
                                <>
                                    <RoundDot />
                                    <span className="movie-banner-time">{timeConvert(props.movie.runtime)}</span>
                                </>
                                : null}
                        </div>
                        <p className="movie-banner-overview">{props.movie.overview}</p>
                        {props.movie.genres !== undefined ?
                            <ul className="movie-banner-genre">
                                {props.movie.genres.map((genreItem, index) => {
                                    return <MovieGenre
                                        key={index}
                                        genreName={genreItem.name}
                                    />
                                })}
                            </ul>
                            : null}
                    </div>
                </div>
            </div>
        </>
    )
}

export default MovieBanner;