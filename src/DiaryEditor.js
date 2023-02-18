import { useState } from "react";

const DiaryEditor = () =>{
    const [author, setAuthor] = useState("김대호");
    return (
    <div className="DiaryEditor">
        <h2>오늘의 일기</h2>
        <div>
            <input value={author} onChange={(e) => { //값이 바뀌었을때 
                console.log(e)
            }}/>
        </div>
    </div>
    );
}

export default DiaryEditor;