import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";

import Home from './pages/Home';
import Edit from './pages/Edit';
import New from './pages/New';
import Diary from './pages/Diary';
import MyButton from './components/MyButton';
import MyHeader from './components/MyHeader';

function App() {
  
  // const env = ProcessingInstruction.env;
  // env.PUBLIC_URL = env.PUBLIC_URL || "";
  return (
    <BrowserRouter>
      <div className="App">
        <MyHeader 
          headText={"APP"}
          leftChild={
            <MyButton
            text={"왼쪽버튼"}
            onclick={()=> alert("왼쪽버튼")}
            />
          }
          rightChild={
            <MyButton
              text={"오른쪽버튼"}
              onclick={()=> alert("오른쪽버튼")}
            />
          }
        />
        <h2>App.js</h2>

        <MyButton text={"버튼"}
        onclick={()=> alert("버튼 클릭")}
        type={"positive"}
         />
        <MyButton text={"버튼"}
        onclick={()=> alert("버튼 클릭")}
        type={"negative"}
         />
        <MyButton text={"버튼"}
        onclick={()=> alert("버튼 클릭")}
        type={"nega"}
         />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<New />} />
          <Route path="/diary/:id" element={<Diary />} />
          <Route path="/edit" element={<Edit />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}


export default App;
