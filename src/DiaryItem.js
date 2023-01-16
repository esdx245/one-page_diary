import React, { useState, useRef } from "react";

const DiaryItem = ({
  removeDiary,
  editDiary,
  author,
  content,
  emotionRate,
  create_date,
  id,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const togglesEdit = () => {
    setIsEdit(!isEdit);
  };
  const [localContent, setLocalContent] = useState(content);
  const localContentRef = useRef();

  const removeHandler = () => {
    if (window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까?`)) {
      removeDiary(id);
    }
  };

  const notEditHandler = () => {
    setIsEdit(false);
    setLocalContent(content);
  };

  const editCompleteHandler = () => {
    if (localContent.length < 5) {
      localContentRef.current.focus();
      return;
    }
    if (window.confirm(`${id}번째 일기를 정말 수정하시겠습니까?`)) {
      editDiary(id, localContent);
      togglesEdit();
    }
  };
  return (
    <div className="DiaryItem">
      <div className="info">
        <span>
          | author : {author} | emotionRate : {emotionRate} |
        </span>
        <br />
        <span className="date">{new Date(create_date).toLocaleString()}</span>
      </div>
      <div className="content">
        {isEdit ? (
          <textarea
            ref={localContentRef}
            value={localContent}
            onChange={(e) => setLocalContent(e.target.value)}
          ></textarea>
        ) : (
          <>{content}</>
        )}
      </div>
      {isEdit ? (
        <>
          <button onClick={notEditHandler} className="noteditbutton">
            수정 취소
          </button>
          <button onClick={editCompleteHandler} className="editcompletebutton">
            수정 완료
          </button>
        </>
      ) : (
        <>
          <button onClick={removeHandler} className="removebutton">
            삭제하기
          </button>
          <button onClick={togglesEdit} className="editbutton">
            수정하기
          </button>
        </>
      )}
    </div>
  );
};

export default React.memo(DiaryItem);
