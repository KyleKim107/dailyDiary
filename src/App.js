import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';
import { useState, useRef } from 'react';
import LifeCycle from './LifeCycle';

function App() {
  const [data , setData] = useState([]);

  const dataId = useRef(0); // 0번 인덱스 부 시작한다.
  
  const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current,
    };
    dataId.current += 1;
    setData([newItem , ...data]); // 만약 추가한걸 가장 위에 두고 싶은 경우
    // setData([ ...data , newItem ]); 만약 추가한걸 가장 밑에 두고 싶은 경우
  }

  const onRemove = ({targetId}) => {
    console.log(`${targetId}가 삭제되었습니다.`);
    const newDiaryList = data.filter((it) => it.id !== targetId);
    console.log(newDiaryList);
    setData(newDiaryList);
  }

  const onEdit = (targetId , newContent) =>{
    setData(
      data.map((it) => it.id === targetId ? {...it , content:newContent} : it )
    );
}

  return (
    <div className="App">
      <LifeCycle/>
      <DiaryEditor onCreate = {onCreate} />
      <DiaryList diaryList={data} onRemove = {onRemove} onEdit ={onEdit} />
    </div>
  );
}

export default App;
