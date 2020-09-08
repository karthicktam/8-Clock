// Inspired by this dribbble shot https://dribbble.com/shots/5958443-Alarm-clock -->
import React, { useState, useEffect } from "react";
import "./styles.css";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

export default function App() {
  const [mode, setMode] = useState(false);
  const [hour, setHour] = useState("translate(-50%, -100%) rotate(0deg)");
  const [minute, setMinute] = useState("translate(-50%, -100%) rotate(0deg)");
  const [second, setSecond] = useState("translate(-50%, -100%) rotate(0deg)");
  const [time, setTime] = useState("11:54");
  const [day, setDay] = useState("");
  const [date, setDate] = useState(0);

  const clickHandler = () => {
    setMode(!mode);
  };

  // StackOverflow https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
  const scale = (num, in_min, in_max, out_min, out_max) => {
    return (num - in_min) * ((out_max - out_min) / (in_max - in_min)) + out_min;
  };

  const setTimeHandler = () => {
    const time = new Date();
    const month = time.getMonth();
    const day = time.getDay();
    const date = time.getDate();
    const hours = time.getHours();
    const hoursForClock = hours % 12;
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    setHour(
      `translate(-50%, -100%) rotate(${scale(hoursForClock, 0, 11, 0, 360)}deg)`
    );
    setMinute(
      `translate(-50%, -100%) rotate(${scale(minutes, 0, 59, 0, 360)}deg)`
    );
    setSecond(
      `translate(-50%, -100%) rotate(${scale(seconds, 0, 59, 0, 360)}deg)`
    );

    setTime(
      `${hours < 10 ? `0${hours}` : hours} : ${
        minutes < 10 ? `0${minutes}` : minutes
      }`
    );

    setDay(`${days[day]}, ${months[month]}`);

    setDate(date);
  };

  useEffect(() => {
    let interval = setInterval(setTimeHandler, 1000);
    return () => clearInterval(interval);
  });

  return (
    <div className={mode === true ? "app dark" : "app"}>
      <button className="toggle" onClick={clickHandler}>
        {mode === false ? "Dark Mode" : "Light Mode"}
      </button>
      <div className="clock-container">
        <div className="clock">
          <div
            className="needle hour"
            style={{
              transform: hour
            }}
          ></div>
          <div
            className="needle minute"
            style={{
              transform: minute
            }}
          ></div>
          <div
            className="needle second"
            style={{
              transform: second
            }}
          ></div>
          <div className="center-point"></div>
        </div>
        <div className="time">{time}</div>
        <div className="date">
          {day} <span className="circle">{date}</span>
        </div>
      </div>
    </div>
  );
}
