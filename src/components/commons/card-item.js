import { useState } from "react";
import LoadingAnimation from "./loading-animation";
import TextGroup from "./text-group";

const CardItem = (props) => {

    const [isImageLoading, setIsImageLoading] = useState(true);
    const [updatedImageSrc, setUpdatedImageSrc] = useState(null);

    const imageOnLoadingEvent = event => {

        const imageElement = event.target;

        if (imageElement.complete && imageElement.naturalHeight !== 0) setIsImageLoading(false);
    };

    const imageErrorEvent = (src) => {

        // Reload image
        setUpdatedImageSrc(src + '?v=' + Date.now())
    }

    return (
        <li className="card-item">
            <div className={`card-picture-loader${isImageLoading === true ? ' active' : ''}`}>
                <LoadingAnimation/>
            </div>
            <img alt={props.title + ' image'} className="card-picture" src={updatedImageSrc === null ? props.src : updatedImageSrc} 
            onLoad={imageOnLoadingEvent}
            onError={() => imageErrorEvent(props.src)}
            />
            <TextGroup
                title={props.title}
                value={props.value}
            />
        </li>
    )
}

export default CardItem;