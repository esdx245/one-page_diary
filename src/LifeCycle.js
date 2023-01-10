import React, { useEffect, useState } from "react";

const UnMountTest = () => {
  useEffect(() => {
    console.log("Mount");

    return () => {
      console.log("UnMount");
    }; // 이 리턴 값은 UnMoun 되었을때 실행된다.
  }, []);

  return <div>UnMountTest</div>;
};

const LifeCycle = () => {
  // eslint-disable-next-line no-unused-vars
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const toggel = () => setIsVisible(!isVisible);

  /*useEffect(() => {
        console.log("Mount");
    }, []) // Mount 되었을때 만 하고 싶은 경우 Dependency Array에 빈 배열을 전달한다.
    
    useEffect(() => {
        console.log("Update");
    }) // Update 되었을때 만 하고 싶은 경우 Dependency Array에 아무것도 넣지 않는다. 이 경우 Props나 State가 변경될때마다 실행된다.

    useEffect(() => {
        console.log("Count Update");
    }, [count]) // 특정 State나 Props가 변경될때만 하고 싶은 경우 Dependency Array에 해당 State나 Props를 전달한다.
    */
  return (
    <div style={{ padding: 20 }}>
      {/*<div>
            {count}
            <button onClick={() => setCount(count + 1)}>+</button>
        </div>
        <div>
            <input value = {text} onChange={(e)=> setText(e.target.value)}/>
        </div>*/}
      <div>
        <button onClick={toggel}>Toggle</button>
        {isVisible && <UnMountTest />}
      </div>
    </div>
  );
};

export default LifeCycle;
