import React,{ useState, useEffect } from "react";

const CounterA= React.memo(({count}) =>{
    useEffect(() => {
        console.log(`Counter A Update  - count : ${count}`)
    })

    return <div>{count}</div>
});
// 새로운 값이 메겨지지는 않지만 obj는 객체기 때문에 
const CounterB= ({obj}) =>{
    useEffect(() => {
        console.log(`Counter B Update  - count : ${obj.count}`)
    })

    return <div>{obj.count}</div>
};

const areEqual = (prevProps , nextProps) =>{
    return prevProps === nextProps;
}
const MemorizedCounterB =  React.memo(CounterB , areEqual);

const OptimizeTest = () =>{
    const [count,setCount] = useState(1);
    const [obj,setObj] = useState({
        count: 1
    });

return (
    <div style={{padding:50}}>
        <div>
            <h2>Counter A</h2>
            <CounterA count={count}/>
            <button onClick={()=> setCount(count + 1 )}>+</button>
        </div>
        <div>
            <h2>Counter B</h2>
            <MemorizedCounterB obj={obj}/>
            <button value={obj} onChange={() => setObj({
                    count: obj.count
                })} >B Button</ button>
        </div>
    </div>
);
}

export default OptimizeTest;