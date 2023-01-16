import React from "react";
const DiaryAnalysis = ({ data }) => {
  const goodCount = data.filter((it) => it >= 3).length;
  const badCount = data.length - goodCount;
  const goodRatio = (goodCount / data.length) * 100;
  console.log("분석");
  return (
    <div className="DiaryAnalysis">
      <div>전체 일기 개수 : {data.length}</div>
      <div>기분 좋은 일기 개수 : {goodCount}</div>
      <div>기분 나쁜 일기 개수 : {badCount}</div>
      <div>기분 좋은 일기 비율 : {goodRatio}%</div>
    </div>
  );
};

export default React.memo(DiaryAnalysis);
