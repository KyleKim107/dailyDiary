import React,{ useState, useEffect } from "react";

//State변경시 TextView와 CountView둘다 리렌더가 발생한다. 
const TextView = ({text}) => {
    useEffect(()=>{
        console.log(`Update :: Text : ${text}`);
    })
    return <div>{text}</div>
};
const CountView = ({count}) => {
    useEffect(()=>{
        console.log(`Update :: Count : ${count}`);
    })
    return <div>{count}</div>
};


const OptimizeTest = () =>{
    const [count,setCount] = useState(1);
    const [text,setText] = useState("");

return (
    <div style={{padding:50}}>
        <div>
            <h2>count</h2>
            <CountView count={count} />
            <button onClick={()=> setCount(count + 1 )}>+</button>
        </div>
        <div>
            <h2>text</h2>
            <TextView text={text}/>
            <input value={text} onChange={(e) => setText(e.target.value)} />
        </div>
    </div>
);
}

export default OptimizeTest;