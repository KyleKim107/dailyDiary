const DiaryItem = ({id,author , content, created_date , emotion}) =>{
    return (<div className = "DiaryItem">
<div key={id}> 
                        <div className="info" > 
                            <span>
                                작성자 : {author} | 감정점수 : {emotion} 
                            </span>
                            <span className= "date">{new Date(created_date).toLocaleString}</span>
                        </div>
                        <div className="content"> 일기 : {content} </div>
                    </div>


    </div>);
}

export default DiaryItem;


