const DiaryItem = ({ deleteDiary,author, content, emotionRate, create_date, id }) => {
    return (
        <div className="DiaryItem">
            <div className="info">
                <span>| author : {author} | emotionRate : {emotionRate} |</span><br/>
                <span className="date">{new Date(create_date).toLocaleString()}</span>
            </div>
            <div className="content">{content}</div>
            <button onClick ={() => {
                if (window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까?`)) {
                    deleteDiary(id);
                }
            }
            } className="deletebutton">삭제하기</button>
        </div>
    )
}

export default DiaryItem;