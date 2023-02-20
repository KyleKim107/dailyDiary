import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';
import { useState, useRef, useEffect } from 'react';


//https://jsonplaceholder.typicode.com/comments


function App() {
  const [data , setData] = useState([]);
  const dataId = useRef(0); // 0번 인덱스 부 시작한다.
  
  const getData = async() =>{
    const res = await fetch(`https://jsonplaceholder.typicode.com/comments`).then((res) =>res.json());
    console.log(res)

    const initData = res.slice(0,20).map((it)=>{
      return {
        authorL : it.email,
        content : it.body,
        emotion : Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime(),
        id : dataId.current++,
      }
    });
    setData(initData);
  };
  
useEffect(() =>{
  getData();
} ,[])

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
      <DiaryEditor onCreate = {onCreate} />
      <DiaryList diaryList={data} onRemove = {onRemove} onEdit ={onEdit} />
    </div>
  );
}

export default App;
