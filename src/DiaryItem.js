const DiaryItem = ({ author, content, emotionRate, create_date, id }) => {
    return (
        <div className="DiaryItem">
            <div className="info">
                <span>| author : {author} | emotionRate : {emotionRate} |</span><br/>
                <span className="date">{new Date(create_date).toLocaleString()}</span>
            </div>
            <div className="content">{content}</div>
        </div>
    )
}

export default DiaryItem;