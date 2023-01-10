import "./App.css";
import React, { useState, useRef, useEffect, useMemo } from "react";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
// import LifeCycle from './LifeCycle';

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
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());
    //console.log(res);
    const initData = res.slice(0, 20).map((it) => {
      return {
        author: it.email,
        content: it.body,
        emotionRate: Math.floor(Math.random() * 5) + 1,
        create_date: new Date().getTime(),
        id: idCount.current++,
      };
    });
    setData(initData);
  };

  useEffect(() => {
    getData();
  }, []);

  const addDiary = (author, content, emotionRate) => {
    const create_date = new Date().getTime();
    const newdiary = {
      author,
      content,
      emotionRate,
      create_date,
      id: idCount.current++,
    };
    setData([newdiary, ...data]);
  };

  const removeDiary = (targetId) => {
    setData(data.filter((it) => it.id !== targetId));
    alert(`${targetId}번 일기가 삭제되었습니다.`);
  };

  const editDiary = (targetId, newContent) => {
    setData(
      data.map((it) =>
        it.id === targetId ? { ...it, content: newContent } : it
      )
    );
  };

  const getDiaryAnalysis = useMemo(
    () => {
      const goodCount = data.filter((it) => it.emotionRate >= 3).length;
      const badCount = data.length - goodCount;
      const goodRatio = (goodCount / data.length) * 100;
      console.log(
        `데이터 분석 시작 / 좋은 일기 개수 ${goodCount}개 / 나쁜 일기 개수 ${badCount}개 / 좋은 일기 비율 ${goodRatio}%`
      );
      return { goodCount, badCount, goodRatio };
    },
    [data.length] // data.length가 변경될때만 실행된다. 또한 useMemo는 값을 return 받으므로 더이상 getDiaryAnalysis는 함수가 아닌 값이다.
  );

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis; // 이 코드는 처음 생성될때 1번 실행되고, data가 init된 이후 1번 실행되고, data가 변경될때마다 실행된다.

  return (
    <div className="App">
      {/*<LifeCycle/> 라이프사이클 테스트 코드*/}
      <DiaryEditor addDiary={addDiary} />
      <div>전체 일기 개수 : {data.length}</div>
      <div>기분 좋은 일기 개수 : {goodCount}</div>
      <div>기분 나쁜 일기 개수 : {badCount}</div>
      <div>기분 좋은 일기 비율 : {goodRatio}%</div>
      <DiaryList
        diaryList={data}
        removeDiary={removeDiary}
        editDiary={editDiary}
      />
    </div>
  );
}

export default App;

const change_data = () => {};
