import React,{ useRef,useState } from 'react';

const DiaryEditor = ({addDiary}) => {
    const authorRef = useRef();/*useRef는 DOM을 직접적으로 건드리는 방법으로 MutableRefObject을 반환. 이는 HTML부분에 접근할 수 있는것임 */
    const contentRef = useRef();
    const [state, setState ] = useState({
        author: "",
        content: "",
        emotionRate:1,
    })
    const handleChange = (e) => {
        setState({
            ...state,/*번저 이것을 선언하고 아래에 변경할 내용을 적어야함. 코드는 위-> 아래로 실행 */
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = () => {
        if (state.author.length < 1) {
            authorRef.current.focus();
            return;/*return을 쓰면 함수를 끝내고 아래 코드는 실행하지 않음 */
        }
        if (state.content.length < 5) {
            contentRef.current.focus();
            return;
        }
        addDiary(state.author, state.content, state.emotionRate);
        alert("저장 성공!");
        setState({
            author: "",
            content: "",
            emotionRate: 1,
        })
    }

    return <div className="DiaryEditor">
        <h2>오늘의 일기</h2>
        <div>{/*이름을 입력하는 부분 */}
            <input
                ref = {authorRef} /*ref를 사용하면 authorRef를 사용할 수 있음 */
                name='author'
                value={state.author} 
                onChange={handleChange} /*값이 변화하면 그 입력된 값을 author로 변화하는 함수, 이 함수를 사용하지 않으면 아무리 입력창에 입력해도 초기값에서 변경되지 않음*/
            /> {/* 입력값을 처리해야하므로 state임 */}
        </div>
        <div>{/*일기 내용을 입력하는 부분 */}
            <textarea
                ref = {contentRef}
                name='content'
                value={state.content}
                onChange={handleChange}
            />
        </div>
        <div>{/*감정점수를  입력하는 부분 */}
            <span>오늘의 감정 점수 : </span>
            <select name='emotionRate' value={state.emotionRate} onChange={handleChange}> 
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
            </select>
        </div>
        <div>{/*저장하는 부분 */}
            <button onClick={handleSubmit}>일기 저장하기</button>
        </div>
    </div>;
};

export default DiaryEditor;