const DiaryItem = ({id,author , content, created_date , emotion, onDelete}) =>{
    return (<div className = "DiaryItem">
<div key={id}> 
        <div className="info" > 
            <span>
                작성자 : {author} | 감정점수 : {emotion} 
            </span>
            <span className= "date">{new Date(created_date).toLocaleString}</span>
        </div>
        <div className="content"> 일기 : {content} </div>
        <button onClick={()=>{
            console.log(id)
            if(window.confirm(`${id}번째 일기를 정말 삭제 하시겟습니까?`)){
                onDelete(id)
            }
        }}>삭제하기</button>
    </div>
    </div>);
}

export default DiaryItem;


