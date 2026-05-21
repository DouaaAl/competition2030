"use client";
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import { getTeams } from "../../../lib/actions";

export default function Leaderboard() {
  const [teams, setTeams] = useState([]);

  const refresh = async () => {
    const res = await getTeams();
    setTeams(res);
  };

  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.bg}>
      {/* Bug chasing the microchip */}
      <section className={styles.chaseContainer}>
        <img 
          src="https://img.icons8.com/nolan/96/bug.png" 
          className={styles.rollingRock} 
          alt="Software Bug" 
        />
        <img 
          src="https://img.icons8.com/nolan/96/microchip.png" 
          className={`${styles.chaser} ${styles.c1}`} 
          alt="Microchip" 
        />
      </section>

      <h1 className={styles.mainTitle}> 
        <img 
          src="https://img.icons8.com/nolan/96/processor.png" 
          alt="CPU" 
        /> 
        Intelligent Embedded Systems Rankings
      </h1>

      <div className={styles.list}>
        {teams.map((team, index) => (
          <div key={team.id} className={`${styles.row} ${index === 0 ? styles.first : ""}`}>
            <span className={styles.rank}>#{index + 1}</span>
            <span className={styles.name}>{team.name}</span>
            <span className={styles.points}>{team.totalScore}%</span>
          </div>
        ))}
      </div>

      <section className={styles.animationContainer}>
        {/* Data Packets / Bots Jumping */}
        <img 
          src="https://img.icons8.com/nolan/96/bot.png" 
          className={`${styles.robot} ${styles.r1}`} 
          alt="Bot 1" 
        />
        <img 
          src="https://img.icons8.com/nolan/96/bot.png" 
          className={`${styles.robot} ${styles.r2}`} 
          alt="Bot 2" 
        />
        <img 
          src="https://img.icons8.com/nolan/96/bot.png" 
          className={`${styles.robot} ${styles.r3}`} 
          alt="Bot 3" 
        />

        {/* The Server & Electronic Pulses */}
        <div className={styles.pondWrapper}>
          <div className={`${styles.splash} ${styles.s1}`}></div>
          <div className={`${styles.splash} ${styles.s2}`}></div>
          <div className={`${styles.splash} ${styles.s3}`}></div>
          <img 
            src="https://img.icons8.com/nolan/128/server.png" 
            className={styles.pond} 
            alt="Server" 
          />
        </div>
      </section>
    </div>
  );
}