import { useContext, useEffect, useState } from "react";
import { Diarystatecontext } from "../App";
import MyButton from "../components/MyButton";
import MyHeader from "../components/MyHeader";
import DiaryList from "../components/DiaryList";

const Home = () =>{
    const diaryList = useContext(Diarystatecontext);

    const [data,setData] = useState([])
    const [curDate, setCurDate] = useState(new Date());
    const headText = `${curDate.getDate() + 1} / ${curDate.getMonth() + 1} / ${curDate.getFullYear()}`;

    useEffect(()=>{
        const titleElement = document.getElementsByTagName('title')[0]; // 0번째가 타이틀
        titleElement.innerHTML = `감정 일기장`;
      },[]);

    useEffect(()=>{
        if(diaryList.length >= 1){
            const firstDay = new Date(
                curDate.getFullYear(),
                curDate.getMonth(),
                1
            ).getTime();

        const lastDay = new Date(
            curDate.getFullYear(),
            curDate.getMonth() + 1,
            0,
            23, // 시
            59 // 분
            ,59 // 초
            );

            setData(diaryList.filter((it) => firstDay <= it.date && it.date <= lastDay));
        }
        // setData(diaryList);

    }, [diaryList,curDate]);

    useEffect( () => {
        console.log(data);
    },[data]
    )

    const increaseMonth = () =>{
    setCurDate(
        new Date(curDate.getFullYear(), curDate.getMonth() + 1 , curDate.getDate())
        ); // 날짜를 바꾸면 home컴포넌트 자체에서 변화가 일어난다.
    };
    const decreaseMonth = () =>{
    setCurDate(
        new Date(curDate.getFullYear(), curDate.getMonth() - 1 , curDate.getDate())
        ); 
    };

    return(
        <div>
            <MyHeader 
                headText={headText}
                leftChild={<MyButton text={"<"} onclick={decreaseMonth} />}
                rightChild={<MyButton text={">"} onclick={increaseMonth} />}
            />
            <DiaryList diaryList={data} />
        </div>
    )
};

export default Home;

