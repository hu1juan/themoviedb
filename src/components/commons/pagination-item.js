import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
const queryString = require('query-string');

const PaginationItem = (props) => {

    const location = useLocation();

    const getToLocation = (page) => {

        let toLocationPath = '';

        const queries = queryString.parse(location.search);

        let queriesString = '';

        for (let [key, value] of Object.entries(queries)) {
            if (key != 'page') queriesString += key + '=' + value + '&';
        }

        if (props.isPageQuery) {

            toLocationPath = location.pathname;

            if (queriesString != '') toLocationPath += '?' + queriesString.substring(0, queriesString.length - 1) + '&page=' + page;
            else toLocationPath += '?page=' + page;
        }
        else toLocationPath = '/' + page;

        return toLocationPath;
    }

    return (
        <>
            <li className={`${props.isNumber === true ? 'pagination-item-number ' : ''}pagination-item${props.isActive === true ? ' active' : ''}`}>
                <Link to={getToLocation(props.page)}>
                    <button
                        className="pagination-button"
                        onClick={() => {
                            props.setCurrentPage(Number(props.page));
                            props.pageClickDispatchFunction(props.pageClickFunction({ page: props.page }))
                        }
                        }>
                        {props.text}
                    </button>
                </Link>
            </li>
        </>
    )
};

export default PaginationItem;