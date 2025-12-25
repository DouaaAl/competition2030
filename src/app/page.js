import { getTeams, createTeam, updateScore } from "../../lib/actions";
import styles from "./page.module.css";

export default async function JudgesPage() {
  const teams = await getTeams();

  const categories = [
    { id: "sustainability", label: "Sustainability (20%)" },
    { id: "prototype", label: "Working Prototype (30%)" },
    { id: "originality", label: "Originality (15%)" },
    { id: "application", label: "Real Life App (15%)" },
    { id: "finance", label: "Financial Model (10%)" },
    { id: "presentation", label: "Presentation (10%)" },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Judge Panel - ElectroFuture 2030</h1>
      
      <form action={createTeam} className={styles.addForm}>
        <input name="name" placeholder="New Team Name..." className={styles.input} required />
        <button type="submit" className={styles.addButton}>Add Team</button>
      </form>

      <div className={styles.teamList}>
        {teams.map((team) => (
          <div key={team.id} className={styles.teamCard}>
            <div className={styles.cardHeader}>
              <h2>{team.name}</h2>
              <span className={styles.totalBadge}>{team.totalScore}%</span>
            </div>

            <div className={styles.grid}>
              {categories.map((cat) => (
                <div key={cat.id} className={styles.scoreBox}>
                  <label>{cat.label}</label>
                  <div className={styles.controls}>
                    <form action={updateScore.bind(null, team.id, cat.id, -1)}>
                      <button className={styles.minusBtn}>-</button>
                    </form>
                    <span className={styles.scoreValue}>{team[cat.id]}</span>
                    <form action={updateScore.bind(null, team.id, cat.id, 1)}>
                      <button className={styles.plusBtn}>+</button>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}