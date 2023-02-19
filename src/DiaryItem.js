import { useState, useRef } from "react";

const DiaryItem = ({id,author , content, created_date , emotion, onRemove, onEdit}) =>{

    const localContentInput = useRef()
    const [isEdit , setIsEdit] = useState(false);// 수정중인지 아닌지 체크하기 위해서
    const toggleIsEdit = () => setIsEdit(!isEdit); //토글을 하면 isEdit의 값을 바꿔준다.

    const [ localContent , setLocalContent ] = useState(content);

    const handleRemove = () =>{
        console.log(id)
            if(window.confirm(`${id}번째 일기를 정말 삭제 하시겟습니까?`)){
                onRemove(id);
            }
    };
    const handleQuitEdit = () =>{
        setIsEdit(false);
        setLocalContent(content);
    }
    const handleEdit = () =>{
        if(localContent.length < 5){
            localContentInput.current.focus();
            return;
        }
        if(window.confirm(`${id}번 째 일기를 수정하시겠습니까?`)){
        onEdit(id , localContent);
        toggleIsEdit();
    }
    }

    return (<div className = "DiaryItem">
<div key={id}> 
        <div className="info" > 
            <span>
                작성자 : {author} | 감정점수 : {emotion} 
            </span>
            <span className= "date">{new Date(created_date).toLocaleString}</span>
        </div>
        <div className="content"> 일기 : {isEdit ? (<>
        <textarea 
        ref={localContentInput}
        value={localContent} onChange={(e) => {
            setLocalContent(e.target.value);
        }}/></>)
        : (<>{content}</>) }
        </div>
        {isEdit? 
        (<>
            <button onClick={handleQuitEdit}>취소</button>
            <button onClick={handleEdit}>수정 완료</button>
        </>) 
        :(<>
            <button onClick={handleRemove}>삭제하기</button>
            <button onClick={toggleIsEdit}>수정하기</button>
        </>) }
    </div>
    </div>);
}

export default DiaryItem;


