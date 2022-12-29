import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

const templist = [
  {
    id: 1,
    author: "김선혁",
    content: "1번째 일기",
    emotionRate: 1,
    create_date: new Date().getTime(),
  },{
    id: 2,
    author: "김선우",
    content: "2번째 일기",
    emotionRate: 1,
    create_date: new Date().getTime(),
  },
];

function App() {
  return (
    <div className="App">
      <DiaryEditor />
      <DiaryList diaryList={templist}/>
    </div>
  );
}

export default App;
