import TextListItem from "./text-list-item";

const TextList = (props) => {
    return (
        <div className="text-list">
            <h3 className="text-title">{props.title}</h3>
            {props.list.length > 0 ?
                props.list.map((listItem, index) => <TextListItem key={index} value={listItem} />)
                : '-'}

        </div>
    )
}

export default TextList;