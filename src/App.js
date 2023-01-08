import './App.css';
import React, {useState, useRef, useEffect} from 'react';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';
// import LifeCycle from './LifeCycle';

// https://jsonplaceholder.typicode.com/comments

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

  const getData = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/comments').then((res) => res.json());
    //console.log(res);
    const initData = res.slice(0, 20).map((it) => {
      return {
        author: it.email,
        content: it.body,
        emotionRate: Math.floor(Math.random() * 5) + 1,
        create_date: new Date().getTime(),
        id : idCount.current++,
      }
    })
    setData(initData);
  }

  useEffect(() => {
    getData();
  }, []
  )

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

  const removeDiary = (targetId) => {
    setData(data.filter((it) => it.id !== targetId));
    alert(`${targetId}번 일기가 삭제되었습니다.`);
  }

  const editDiary = (targetId, newContent) => {
    setData(data.map((it) => it.id === targetId ? {...it, content: newContent} : it));
  }

  return (
    <div className="App">
      {/*<LifeCycle/> 라이프사이클 테스트 코드*/}
      <DiaryEditor addDiary={addDiary} />
      <DiaryList diaryList={data} removeDiary={removeDiary} editDiary = {editDiary} />
    </div>
  );
}

export default App;
