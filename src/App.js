import './App.css';
import React, {useState, useRef} from 'react';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

// const templist = [
//   {
//     id: 1,
//     author: "김선혁",
//     content: "1번째 일기",
//     emotionRate: 1,
//     create_date: new Date().getTime(),
//   },{
//     id: 2,
//     author: "김선우",
//     content: "2번째 일기",
//     emotionRate: 1,
//     create_date: new Date().getTime(),
//   },
// ];

function App() {
  const [data, setData] = useState([]);
  const idCount = useRef(0);

  const addDiary = (author, content, emotionRate) => {
    const create_date = new Date().getTime();
    const newdiary = {
      author,
      content,
      emotionRate,
      create_date,
      id : idCount.current++,
    }
    setData([newdiary, ...data]);
  }

  const deleteDiary = (targetId) => {
    setData(data.filter((it) => it.id !== targetId));
    alert(`${targetId}번 일기가 삭제되었습니다.`);
  }

  return (
    <div className="App">
      <DiaryEditor addDiary={addDiary} />
      <DiaryList diaryList={data} deleteDiary={deleteDiary} />
    </div>
  );
}

export default App;
