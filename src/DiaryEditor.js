import { useState } from "react";

const DiaryEditor = () =>{
    const [state, setState] = useState({ // setState들을 하나로 묶는다
        author:"",
        content:"",
    });
    const  handleChangeState = (e) =>{
        console.log(e.target.name);
        console.log(e.target.value);
    }

    return (
    <div className="DiaryEditor">
        <h2>오늘의 일기</h2>
        <div>
            <input 
            name = "author"
            value={state.author}
            onChange={(e) => { //값이 바뀌었을때 전달되는 event객체
                setState({
                    //State는 두개의 값,content와 author,을 가지고 있기 때문에 한번 설정해 줄때 두가지를 한번에 설정해 줘야한다.
                    //하지만 ...state를 해주면 알아서 펼쳐준다.
                    ...state,
                    author: e.target.value,
                })
            }}
            />
        </div>
        <div>
            <textarea 
                value={state.content} 
                onChange={(e) => { //값이 바뀌었을때 전달되는 event객체
                    setState({
                        ...state,
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