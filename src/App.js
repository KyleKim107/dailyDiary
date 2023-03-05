import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';
import { useState, useRef, useEffect, useMemo } from 'react';


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

const getDiaryAnalysis = useMemo(
  () =>{
  console.log("일기 분석 시작");

  const goodCount = data.filter((it) => it.emotion >= 3).length;
  const badCount = data.length - goodCount;
  const goodRatio = ( goodCount / badCount ) * 100;

  return {goodCount,badCount,goodRatio};
} , [data.length] // length가 바뀔대 재실행 된다.
);// useMemo를 사용하는 순간 함수가 아니라 콜백을 받아서 메기는 값이다.

//State바뀔때마다 리렌더되면서 함수 재호출
// 하지만 이 수치는 매번 리렌더 할 필요 없다. 그러므로 useMemo()를 사용하자.
const  {goodCount,badCount,goodRatio} = getDiaryAnalysis;

  return (
    <div className="App">
      <DiaryEditor onCreate = {onCreate} />
      <div>전체 일기 : {data.length}</div>
      <div>기분 좋은 일기 개수 : {goodCount}</div>
      <div>기분 나쁜 일기 개수 : {badCount}</div>
      <div>기분 좋은 일기 비율 : {goodRatio}</div>
      <DiaryList diaryList={data} onRemove = {onRemove} onEdit ={onEdit} />
    </div>
  );
}

export default App;
