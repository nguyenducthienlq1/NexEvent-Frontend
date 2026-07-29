import styles from "./StatsBar.module.css";

interface Props {
  totalEvents: number;
  uniqueLocations: number;
}

export default function StatsBar({ totalEvents, uniqueLocations }: Props) {
  const stats = [
    { num: totalEvents || 0, lbl: "Sự kiện sắp tới" },
    { num: uniqueLocations > 0 ? uniqueLocations : 0, lbl: "Thành phố" },
  ];

  return (
    <div className={styles.bar}>
      <div className={styles.container}>
        {stats.map((s) => (
          <div key={s.lbl} className={styles.item}>
            <div className={styles.num}>{s.num}</div>
            <div className={styles.lbl}>{s.lbl}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
