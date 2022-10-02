import { useEffect, useState } from "react";
import PaginationItem from "./pagination-item";

const Pagination = (props) => {

    const [currentPage, setCurrentPage] = useState(0);
    const [maxPage, setMaxPage] = useState(0);
    const [pageButtons, setPageButtons] = useState([]);

    useEffect(() => {
        setPageButtons(createPageList());
    }, [currentPage, maxPage])

    useEffect(() => {
        setCurrentPage(Number(props.startPage));
    }, [props.startPage]);

    useEffect(() => {
        setMaxPage(props.maxPage);
    }, [props.maxPage])

    const createPageList = () => {

        const pageList = [];

        let startPage = 0;
        let endPage = 0;

        // Get start page end page
        for (let x = 0; x < props.maxPage; x++) {
            startPage = x * props.maxButtons;
            endPage = startPage + props.maxButtons;

            if (currentPage >= startPage && currentPage <= endPage) break;
        }

        if (currentPage === endPage) {
            startPage = currentPage;
            endPage = startPage + props.maxButtons;
        }

        for (let page = startPage; page <= endPage; page++) {
            if (page > maxPage) break;
            if (page != 0) pageList.push(page);
        }

        return pageList;
    }

    return (
        <>
            {pageButtons.length != 0 ?
                <div className="pagination-container">
                    <ul className="pagination-list">
                        {currentPage != 1 ?
                            <>
                                <PaginationItem
                                    pageClickDispatchFunction={props.pageClickDispatchFunction}
                                    pageClickFunction={props.pageClickFunction}
                                    page={1}
                                    setCurrentPage={setCurrentPage}
                                    text={'First'}
                                    isPageQuery={props.isPageQuery}
                                />
                                <PaginationItem
                                    pageClickDispatchFunction={props.pageClickDispatchFunction}
                                    pageClickFunction={props.pageClickFunction}
                                    page={currentPage - 1}
                                    setCurrentPage={setCurrentPage}
                                    text={'Previous'}
                                    isPageQuery={props.isPageQuery}
                                />
                            </>
                            : null}

                        {pageButtons.map(pageNumber => {
                            return <PaginationItem
                                isNumber={true}
                                key={pageNumber}
                                isActive={currentPage === pageNumber}
                                pageClickDispatchFunction={props.pageClickDispatchFunction}
                                pageClickFunction={props.pageClickFunction}
                                page={pageNumber}
                                setCurrentPage={setCurrentPage}
                                text={pageNumber}
                                isPageQuery={props.isPageQuery}
                            />
                        })}

                        {currentPage != maxPage ?
                            <>
                                <PaginationItem
                                    pageClickDispatchFunction={props.pageClickDispatchFunction}
                                    pageClickFunction={props.pageClickFunction}
                                    page={currentPage + 1}
                                    setCurrentPage={setCurrentPage}
                                    text={'Next'}
                                    isPageQuery={props.isPageQuery}
                                />

                                <PaginationItem
                                    pageClickDispatchFunction={props.pageClickDispatchFunction}
                                    pageClickFunction={props.pageClickFunction}
                                    page={maxPage}
                                    setCurrentPage={setCurrentPage}
                                    text={'Last'}
                                    isPageQuery={props.isPageQuery}
                                />
                            </>
                            : null}
                    </ul>
                </div>
                : null}
        </>
    )
}

export default Pagination;