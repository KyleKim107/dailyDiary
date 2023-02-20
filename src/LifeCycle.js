import React, {useEffect , useState} from "react";

const LifeCycle = () => {

    const [count,setCount] = useState(0);
    const [text,setText]= useState("");

    useEffect(() =>{ // 컴포넌트가 마운트 될따 작업을 하고 싶으면 두번째 인자에 빈 배열을 리턴하고 콜백함수에 뭔가를 넣어라.
        console.log("Mount!")
    }, []);

    useEffect(() => { // Component가 업데이트 되는 순간에 어떤 작업을 수행하고 싶다면 callback함수에 작업을 넣어라.
        console.log("Update")
    })

    useEffect(() =>{
        console.log(`count is update : ${count}`)
    } ,[count] )// 두번째 인자에 있는 배열에 인지하고 싶은 인자만 배열에 넣어버 리턴하자.

    useEffect(() =>{
        console.log(`text is update : ${text}`)
    } ,[text] )

    return <div style={{padding:20}}>
        <div>
        {count}
        <button onClick={()=> setCount(count+1)}> + </button>
        </div>
        <div>
            <input value={text} onChange={(e) => setText(e.target.value)}/>
        </div>
    </div>;
}

export default LifeCycle;