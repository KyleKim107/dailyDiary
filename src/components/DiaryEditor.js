import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyHeader from "./MyHeader";
import MyButton from "./MyButton";
import EmotionItem from "./EmotionItem";
import { DiaryDispatchContext } from "../App";
import {emotionList} from "../util/emotion"

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";



const getStringDate = (date) =>{
    return date.toISOString().slice(0,10);
  }

const DiaryEditor = ({isEdit, originData, }) => {
    const navigate = useNavigate();
    const contentRef = useRef()
    const [content, setContent] = useState("");
    const [date, setDate] = useState(getStringDate(new Date()));
    const [emotion, setEmotion] = useState(3);
    const {onCreate, onEdit, onRemove} = useContext(DiaryDispatchContext);
    const handleSubmit = () =>{
        if(content.length < 1){
            contentRef.current.focus();
            return;
        }
        if(window.confirm(isEdit? "일기를 수정 하시겠습니까": "새 일기를 작성 하시겠습니까?")){
            if(!isEdit){
                onCreate(date,content,emotion);
            }else{
                onEdit(originData.id,date,content,emotion)
            }
        }
        navigate("/", {replace:true})
    }
    const handleRemove = () =>{
        if(window.confirm("정말 삭제하시겠습니까?")){
            onRemove(originData.id);
            navigate('/', {replace:true})
        }
    }
    const handleClickEmottion = (emotion) =>{
        setEmotion(emotion);
    };
    useEffect(()=>{
        if(isEdit){
            setDate(getStringDate(new Date(parseInt(originData.date))));
            setEmotion(originData.emotion);
            setContent(originData.content);
        }
    }, [isEdit, originData]) // dependency를 추가 안해주면 화면이 움직이지 않는다...
    return (
        <div className="DiaryEditor">
          <MyHeader 
          headText={isEdit ? "일기 수정하기" :"새 일기쓰기"}
          leftChild={<MyButton text={"< 뒤로가기"} onclick={() => navigate(-1)} />}
          rightChild={ isEdit && (<MyButton text={"삭제하기"} type={"negative"} onclick={handleRemove} />) }
           />
           <div>
              <section>
                <h4>오늘은 언제인가요?</h4>
                <div className="input-box">
                  <input 
                    className="input_date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    type="date"/>
                </div>
              </section>
              <section>
                <h4>오늘의 감정</h4>
                <div className="input_box emotion_list_wrapper">
                    {emotionList.map((it) =>(
                        <EmotionItem 
                            key={it.emotion_id} 
                            {...it} 
                            onclick={handleClickEmottion}
                            isSelected={it.emotion_id === emotion}
                        />
                    ))}
                </div>
              </section>
              <section>
                <h4>오늘의 일기</h4>
                <div className="input_box text_wrapper">
                        <textarea 
                        ref={contentRef}
                        placeholder="오늘은 어땠나요?"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}>
                        </textarea>
                </div>
              </section>
              <section>
                <div className="control_box">
                    <MyButton text={"취소하기"} onclick={() => navigate(-1)}/>
                    <MyButton text={"작성완료"} type={"positive"} onclick={handleSubmit}/>
                </div>
              </section>
           </div>
        </div>
      );
};

export default DiaryEditor