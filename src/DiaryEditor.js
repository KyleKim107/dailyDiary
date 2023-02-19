import { useRef, useState } from "react";

const DiaryEditor = ({onCreate}) =>{
    const authorInput = useRef();
    const contentInput = useRef();
    const [state, setState] = useState({ // setState들을 하나로 묶는다
        author:"",
        content:"",
        emotion: 1,
    });
    const  handleChangeState = (e) =>{
        console.log(e.target.name);
        console.log(e.target.value);
        setState({
            ...state,
            [e.target.name]: e.target.value,
        })
    }
    const handleSubmit = () => {
        if(state.author.length < 1){
            authorInput.current.focus(); //focus
            return;
        }
        if(state.content.length < 5){
            contentInput.current.focus(); //focus
            return;
        }
        onCreate(state.author, state.content , state.emotion);
        alert("저장성공");
        setState({ //저장 후 데이터 모두 삭제.
            author: "",
            content: "",
            emotion: 1,
        });
    }

    return (
    <div className="DiaryEditor">
        <h2>오늘의 일기</h2>
        <div>
            <input 
            ref={authorInput}
            name = "author"
            value={state.author}
            onChange={handleChangeState}
            />
        </div>
        <div>
            <textarea 
                ref={contentInput}
                name="content"
                type="text"
                value={state.content} 
                onChange={handleChangeState}
            />
        </div>
        <div>
        <span>오늘의 감정점수 : </span>
            <select 
            name ="emotion"
            value={state.author.emotion}
            onChange={handleChangeState}
            >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            </select>
        </div>
        <div>
            <button onClick={handleSubmit}>일기 저장하기</button>
        </div>
    </div>
    );
}


export default DiaryEditor;