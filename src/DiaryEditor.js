import { useState } from "react";

const DiaryEditor = () =>{
    const [state, setState] = useState({ // setState들을 하나로 묶는다
        author:"",
        content:"",
    });
    // const [author, setAuthor] = useState("");
    // const [content , setContent] = useState("")
    return (
    <div className="DiaryEditor">
        <h2>오늘의 일기</h2>
        <div>
            <input 
            name = "author"
            value={state.author}
            onChange={(e) => { //값이 바뀌었을때 전달되는 event객체
                setState({
                    author: e.target.value,
                    content: state.content
                })
            }}
            />
        </div>
        <div>
            <textarea 
                value={state.content} 
                onChange={(e) => { //값이 바뀌었을때 전달되는 event객체
                    setState({
                        author: state.content ,
                        content: e.target.value,
                    })
                }
            }
            />
        </div>
    </div>
    );
}


export default DiaryEditor;