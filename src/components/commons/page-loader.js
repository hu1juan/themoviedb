import LoadingAnimation from "./loading-animation";

const PageLoader = (props) => {

    return (
        <div className={`page-loader${props.isActive === true ? ' active' : ''}`}>
            <LoadingAnimation/>
        </div>
    )
}

export default PageLoader;