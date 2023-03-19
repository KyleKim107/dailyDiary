import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';
import { useReducer, useRef, useEffect, useMemo, useCallback } from 'react';
// state 상태변화 직전의 데이터 
// action: 상태변화를 일으킬 조건.
const reducer = (state, action) =>{
  switch(action.type){
    case 'INIT':{
      return action.data // action객체에서 데이터를 가져오면 새로운 state가 된다.
    }
    case 'CREATE':{
      const created_date = new DataTransfer().getTime();
      const newItem ={
        ...action.data
        ,created_date
      }
      return [newItem , ...state]
    }
    case 'REMOVE':{
      return state.filter((it) => it.id !== action.targetId);
    }
    case 'EDIT':
      return state.map((it) => it.id === action.targetId? {...it , content: action.newContent} : it ); //변경된 DairyItem값만 변경됨,
    default:

  }
}

function App() {
  // const [data , setData] = useState([]);
  const [data , dispatch] = useReducer(reducer, []);
  const dataId = useRef(0); // 0번 인덱스 부 시작한다.
  
  const getData = async() =>{
    const res = await fetch(`https://jsonplaceholder.typicode.com/comments`).then((res) =>res.json());

    const initData = res.slice(0,20).map((it)=>{
      return {
        authorL : it.email,
        content : it.body,
        emotion : Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime(),
        id : dataId.current++,
      }
    });
    dispatch({type:"INIT" , data:initData})
  };


useEffect(() =>{
  getData();
} ,[])

  const onCreate = useCallback(
    (author, content, emotion) => {
      dispatch({type:'CREATE', data:{author,content,emotion,id: dataId.current }})
    const created_date = new Date().getTime();
    dataId.current += 1;
    // setData([ ...data , newItem ]); 만약 추가한걸 가장 밑에 두고 싶은 경우
  },[]
  );

  const onRemove = useCallback(({targetId}) => {
    console.log(`${targetId}가 삭제되었습니다.`);
    dispatch({type:'REMOVE', targetId  })
    // setData((data) => data.filter((it) => it.id !== targetId));
  },
  []
  );

  const onEdit = useCallback((targetId , newContent) =>{
    dispatch({type:'EDIT' , targetId ,newContent })
},
[]
)

const getDiaryAnalysis = useMemo(() => {
  if (data.length === 0) {
    return { goodcount: 0, badCount: 0, goodRatio: 0 };
  }
  console.log("일기 분석 시작");

  const goodCount = data.filter((it) => it.emotion >= 3).length;
  const badCount = data.length - goodCount;
  const goodRatio = (goodCount / data.length) * 100.0;
  return { goodCount, badCount, goodRatio };
}, [data.length]); // length가 바뀔대 재실행 된다.
 // useMemo를 사용하는 순간 함수가 아니라 콜백을 받아서 메기는 값이다.

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
