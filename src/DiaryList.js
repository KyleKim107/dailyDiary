import DiaryItem from "./DiaryItem";

const DiaryList = ({diaryList}) =>{
    return (
        <div className = "DiaryList">
            <h2>일기 리스트</h2>
            <h4>{diaryList.length}개의 일기가 있습니다.</h4>
            <div>
                {diaryList.map( (it) => (
                    <DiaryItem key={it.id} {...it} /> // {...it}으로  모든 값들을 보낸다. ex> {id,author , content, created_date , emotion}
                    
                ))}
            </div>
        </div>
    );
};

DiaryList.defaultProps ={
    diaryList:[]
};

export default DiaryList;