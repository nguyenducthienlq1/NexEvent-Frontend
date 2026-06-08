import styles from "./StatsBar.module.css";

const STATS = [
  { num: "2,400+", lbl: "Sự kiện" },
  { num: "180+", lbl: "Thành phố" },
  { num: "1.2M", lbl: "Vé đã bán" },
  { num: "4.9 ★", lbl: "Đánh giá TB" },
];

export default function StatsBar() {
  return (
    <div className={styles.bar}>
      {STATS.map((s) => (
        <div key={s.lbl} className={styles.item}>
          <div className={styles.num}>{s.num}</div>
          <div className={styles.lbl}>{s.lbl}</div>
        </div>
      ))}
    </div>
  );
}
