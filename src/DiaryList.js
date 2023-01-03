import DiaryItem from "./DiaryItem";

const DiaryList = ({ removeDiary,diaryList,editDiary }) => {
    return (<div className="DiaryList">
        <h2>일기 리스트</h2>
        <h4>{diaryList.length}개의 일기가 저장되어 있습니다.</h4>
        <div>
            {diaryList.map((it) => (
                <DiaryItem removeDiary={removeDiary} key={it.id} editDiary = {editDiary} {...it} />
            ))}
        </div>
    </div>
    );
}

DiaryList.defaultProps = {
    diaryList: []
};

export default DiaryList;