import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useContext,useEffect, useState } from "react";
import { Diarystatecontext } from "../App";
import {getStringDate} from "../util/date";
import {emotionList} from "../util/emotion";
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";

const Diary = () => {
  const { id } = useParams();
  const diaryList = useContext(Diarystatecontext);
  const navigate = useNavigate();
  const [data, setData] = useState();

  useEffect(()=>{
    const titleElement = document.getElementsByTagName('title')[0]; // 0번째가 타이틀
    titleElement.innerHTML = `감정 일기장 - ${id}번 일기`;
  },[]);

  useEffect(() =>{
    if(diaryList.length >= 1){
      const targetDiary = diaryList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );
      console.log(targetDiary)
      if(targetDiary){
        setData(targetDiary);
      }else{
        alert("없는 일기입니다.")
        navigate('/', {replace:true});
      }
    }
  },[id,diaryList]);
  
  if(!data){
    return <div className="DiaryPage">로딩중입니다.....</div>;
  }else{
    const currEmotionData = emotionList.find(
        (it) => parseInt(it.emotion_id) === parseInt(data.emotion)
      );
    console.log(currEmotionData);

    return (
      <div className="DiaryPage">
        <MyHeader headText={`${getStringDate(new Date(data.date))} 기록`} 
        leftChild={
          <MyButton text={"< 뒤로가기"} onclick={() => navigate(-1)} />
        }
        rightChild={
          <MyButton text={"수정"} onclick={() => navigate(`/edit/${data.id}`)} />
        }
        />
      <article>
        <section>
          <h4>오늘의 감정</h4>
          <div className={["diary_img_wrapper", `diary_img_wrapper_${currEmotionData.emotion_id}`].join(" ")}>
            <img src={currEmotionData.emotion_img} />
            <div className="emotion_descript">
              {currEmotionData.emotion_descrpt}
            </div>
            <div className="emotion_descript">
              {currEmotionData.emotion_descript}
            </div>
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <div className="diary_content_wrapper">
            <p>{data.content}</p>
          </div>
        </section>
      </article>
      </div>
    );
  }
};

export default Diary;
