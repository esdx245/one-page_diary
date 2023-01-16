import "./App.css";
import React, { useState, useRef, useEffect, useMemo } from "react";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
//import OptimizeTest from "./OptimizeTest";
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
    const res = await fetch("http://43.201.21.188:3000/byebye").then((res) =>
      res.json()
    );
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

  // 컴포넌트 최적화를 위해 일기 리스트에서 일기를 삭제했을 때 일기를 추가하는 DiaryEditor가 리렌더링 하지 않게 하는방법
  // 1. useMemo ? => 안된다. y? => useMemo는 값을 return 받으므로 함수를 반환할 수 없다.
  // 2. useCallback ? => 안된다. y? =>
  //                              1. useCallback을 사용하기 위해 Dependency Array에 빈 값을 줄 경우 삭제하면 리렌더링 되는 문제는 해결된다. 하지만 새로 일기를 추가할 경우 Dependency Array가 빈값이므로 이 함수가 기억하는 data는 처음 생성되어 초기화된 []이므로 이전 값이 전부 날아가고 새로 만든 데이터 1개만 출력된다.
  //                              2. useCallback을 사용하기 위해 Dependency Array에 data를 줄 경우 삭제하면 data가 변하므로 리렌더링되어 문제를 해결할 수 없다.
  // 함수형 업데이트를 사용하면 된다. useState에서 set하는 함수에 함수를 넣어주는 것을 함수형 업데이트라고 한다. 이때 함수 인자에 업데이트 되어야 하는 인자를 넣을 경우 이전 값을 받아서 업데이트 할 수 있다.
  // 그리고 useCallback을 사용하면 함수를 기억하므로 함수를 반환할 수 있다. 이 때 Dependency Array에 빈 배열을 넣어주면 된다.
  const addDiary = React.useCallback((author, content, emotionRate) => {
    const create_date = new Date().getTime();
    const newdiary = {
      author,
      content,
      emotionRate,
      create_date,
      id: idCount.current++,
    };
    setData((data) => [newdiary, ...data]);
  }, []);

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
      return { goodCount, badCount, goodRatio };
    },
    [data.length] // data.length가 변경될때만 실행된다. 또한 useMemo는 값을 return 받으므로 더이상 getDiaryAnalysis는 함수가 아닌 값이다.
  );

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis; // 이 코드는 처음 생성될때 1번 실행되고, data가 init된 이후 1번 실행되고, data가 변경될때마다 실행된다.

  return (
    <div className="App">
      {/*<OptimizeTest />*/}
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
