"use client";
import { useState, useEffect } from "react";
import styles from "./page.module.css";

export default function Timer() {
  const [seconds, setSeconds] = useState(15 * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning && seconds > 0) {
      timer = setInterval(() => setSeconds((s) => s - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, seconds]);

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
        <button onClick={() => { setIsRunning(false); setSeconds(15 * 60); }} className={styles.resetBtn}>
          RESET
        </button>
      </div>
    </div>
  );
}