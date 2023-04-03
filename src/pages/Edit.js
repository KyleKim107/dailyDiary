import {Navigate, useNavigate, useSearchParams} from 'react-router-dom';
const Edit = () =>{
    const [searchParams, setSearchPaarmas] = useSearchParams();
    const id  = searchParams.get("id");
    console.log("id : ", id)
    const mode = searchParams.get("mode");
    console.log("mode ", mode)

    const navigate = useNavigate();
    return(
        <div>
            <h1>Edit</h1>
            <p>이곳은 일기 수정 페이지 입니다</p>
            <button onClick={() => setSearchPaarmas({who: "dehoKim"})}>쿼리 스트링 바꾸기</button>
            <button onClick={() => {
                navigate("/home")
            }}>Home으로 가기</button>
            <button onClick={() => {
                navigate(-1)
            }}>뒤로 가기</button>
        </div>
    )
};

export default Edit;


