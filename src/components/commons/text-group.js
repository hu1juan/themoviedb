const TextGroup = (props) => {
    return (
        <div className="text-group">
            <h3 className="text-title">{props.title}</h3>
            <p className="text-value">{props.value || '-'}</p>
        </div>
    )
}

export default TextGroup;