import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { searchMovie } from "../../store/moviesReducer";
const queryString = require('query-string');

const SearchMovieBar = () => {
    const dispatchAction = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [keyword, setKeyword] = useState('');

    let searchTimeoutId = null;

    const searchInputKeydownEvent = (event) => {

        if (searchTimeoutId != null) clearTimeout(searchTimeoutId);

        searchTimeoutId = setTimeout(() => searchMovieByKeyword(event.target.value), 300);
    };

    const searchMovieByKeyword = (keyword) => {

        const isKeywordEmpty = keyword.trim().length === 0;

        if (isKeywordEmpty === true) {
            navigate('/');
            return;
        }

        navigate('/search?query=' + keyword);

        dispatchAction(searchMovie({
            keyword,
            page: 1
        }));
    }

    useEffect(()=>{

        const queries = queryString.parse(location.search);

        if(queries.query === undefined) return;

        setKeyword(queries.query);
    },[])

    return (
        <>
            <input className='search-movie-input' type='text' defaultValue={keyword} placeholder='Search movie' onChange={searchInputKeydownEvent}/>
        </>
    )
};

export default SearchMovieBar;