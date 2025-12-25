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
      <section className={styles.chaseContainer}>
      <img src="/icons/rock.png" className={styles.rollingRock} alt="" />
    <img src="/icons/runbot1.png" className={`${styles.chaser} ${styles.c1}`} alt="" />
  </section>
      <h1 className={styles.mainTitle}> <img src="/icons/planet.png" /> ElectroFuture 2030 Rankings</h1>
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
  {/* The Robots */}
  <img src="/icons/robot.png" className={`${styles.robot} ${styles.r1}`} alt="" />
  <img src="/icons/robot2.png" className={`${styles.robot} ${styles.r2}`} alt="" />
  <img src="/icons/robot3.png" className={`${styles.robot} ${styles.r3}`} alt="" />

  {/* The Pond & Splashes */}
  <div className={styles.pondWrapper}>
    <div className={`${styles.splash} ${styles.s1}`}></div>
    <div className={`${styles.splash} ${styles.s2}`}></div>
    <div className={`${styles.splash} ${styles.s3}`}></div>
    <img src="/icons/pond.png" className={styles.pond} alt="pond" />
  </div>
</section>
    </div>
  );
}