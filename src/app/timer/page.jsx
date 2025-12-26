"use client";
import { useState, useEffect } from "react";
import styles from "./page.module.css";

export default function Timer() {
  const [seconds, setSeconds] = useState(7 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [tseconds, tsetSeconds] = useState(5 * 60);
  const [tisRunning, tsetIsRunning] = useState(false);


  useEffect(() => {
    let timer;
    if (isRunning && seconds > 0) {
      timer = setInterval(() => setSeconds((s) => s - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, seconds]);
    useEffect(() => {
    let ttimer;
    if (tisRunning && tseconds > 0) {
      ttimer = setInterval(() => tsetSeconds((s) => s - 1), 1000);
    }
    return () => clearInterval(ttimer);
  }, [tisRunning, tseconds]);

  const format = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.clock} ${seconds < 60 ? styles.danger : ""}`}>
        {format(seconds)}
      </div>
      <div className={styles.btnGroup}>
        <button onClick={() => setIsRunning(!isRunning)} className={styles.startBtn}>
          {isRunning ? "PAUSE" : "START"}
        </button>
        <button onClick={() => { setIsRunning(false); setSeconds(7 * 60); }} className={styles.resetBtn}>
          RESET
        </button>
      </div>
        <div className={`${styles.clock} ${tseconds < 60 ? styles.danger : ""}`}>
        {format(tseconds)}
      </div>
      <div className={styles.btnGroup}>
        <button onClick={() => tsetIsRunning(!tisRunning)} className={styles.startBtn}>
          {tisRunning ? "PAUSE" : "START"}
        </button>
        <button onClick={() => { tsetIsRunning(false); tsetSeconds(5 * 60); }} className={styles.resetBtn}>
          RESET
        </button>
      </div>
    </div>
  );
}