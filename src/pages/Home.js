import { useContext, useEffect, useState } from "react";
import { Diarystatecontext } from "../App";
import MyButton from "../components/MyButton";
import MyHeader from "../components/MyHeader";
import DiaryList from "../components/DiaryList";

const Home = () =>{
    const diaryList = useContext(Diarystatecontext);

    const [data,setData] = useState([])
    const [curDate, setCurDate] = useState(new Date());
    const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;

    useEffect(()=>{
        const firstDay = new Date(curDate.getFullYear(),
        curDate.getMonth(),
        1 ).getTime();
        console.log(new Date(firstDay));

        const lastDay = new Date(
            curDate.getFullYear(),
            curDate.getMonth(),
            0
        );
        console.log(new Date(lastDay));

        // setData(diaryList.filter((it) => firstDay <= it.date && it.date <= lastDay));
        setData(diaryList);

    }, [diaryList,curDate]);

    useEffect( () => {
        console.log(data);
    },[data]
    )

    const increaseMonth = () =>{
    setCurDate(
        new Date(curDate.getFullYear(), curDate.getMonth() + 1 , curDate.getDate())
        ); 
    };
    const decreaseMonth = () =>{
    setCurDate(
        new Date(curDate.getFullYear(), curDate.getMonth() - 1 , curDate.getDate())
        ); 
    };

    return(
        <div>
            <MyHeader headText={headText}  
            leftChild={<MyButton text={"<"} onclick={decreaseMonth} />}
            rightChild={<MyButton text={">"} onclick={increaseMonth} />}
            />
            <DiaryList diaryList={data} />
        </div>
    )
};

export default Home;

