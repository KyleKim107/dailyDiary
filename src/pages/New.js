import React, { useState, useEffect } from "react";
import DiaryEditor from "../components/DiaryEditor";

const New = () => {

  useEffect(()=>{
    const titleElement = document.getElementsByTagName('title')[0]; // 0번째가 타이틀
    titleElement.innerHTML = `감정 일기장 - 새 일기`;
  },[]);

  return (
    <div>
      <DiaryEditor/>
    </div>
  );
};

export default New;
