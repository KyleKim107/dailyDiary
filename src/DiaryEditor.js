import { useState } from "react";

const DiaryEditor = () =>{
    const [author, setAuthor] = useState("김대호");
    return (
    <div className="DiaryEditor">
        <h2>오늘의 일기</h2>
        <div>
            <input 
            name = "author"
            value={author}
            onChange={(e) => { //값이 바뀌었을때 전달되는 event객체
                console.log(e.target.value) // evetn객체의 target의 value.
                console.log(e.target.name) // evetn객체의 target의 name
                setAuthor(e.target.value)
            }}
            />
        </div>
    </div>
    );
}


export default DiaryEditor;