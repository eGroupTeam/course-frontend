import MenuBar from "components/ui/MenuBar";
import style from "../../styles/Home.module.css";
import { useState, useEffect } from "react";

const TimePage = () => {
  let names: string[] = ["a", "b", "c"];
  //   const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [time, setTime] = useState<string>();
  const getTime = () => {
    setTime(new Date().toLocaleTimeString());
    console.log("time:", time);
  };
  useEffect(getTime, []);
  return (
    <div className={style.container}>
      <MenuBar />
      <main className={style.main}>
        <h1>Current Time</h1>
        <div>{time}</div>
        <div>{names}</div>
        <ul>
          {names.map((name, index) => (
            <li key={name}> {index}/{name}</li>
          ))}
        </ul>
        <button onClick={getTime}>點一下</button>
      </main>
    </div>
  );
};

export default TimePage;
