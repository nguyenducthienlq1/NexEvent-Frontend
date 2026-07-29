import {
  IconLayoutGrid,
  IconMusic,
  IconBallFootball,
  IconPalette,
  IconDeviceDesktop,
  IconTheater,
  IconAdjustmentsHorizontal,
} from "@tabler/icons-react";
import styles from "./CategoryFilter.module.css";

export type Category = "all" | "music" | "sport" | "art" | "tech" | "comedy";

interface Props {
  active: Category;
  onChange: (cat: Category) => void;
}

const CATEGORIES: { id: Category; label: string; icon: React.ReactNode }[] = [
  { id: "all", label: "Tất cả", icon: <IconLayoutGrid size={12} /> },
  { id: "music", label: "Âm nhạc", icon: <IconMusic size={12} /> },
  { id: "sport", label: "Thể thao", icon: <IconBallFootball size={12} /> },
  { id: "art", label: "Nghệ thuật", icon: <IconPalette size={12} /> },
  { id: "tech", label: "Tech", icon: <IconDeviceDesktop size={12} /> },
  { id: "comedy", label: "Comedy", icon: <IconTheater size={12} /> },
];

export default function CategoryFilter({ active, onChange }: Props) {
  return (
    <div className={styles.bar}>
      <div className={styles.container}>
        <div className={styles.filterGroup}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className={`${styles.pill} ${active === cat.id ? styles.pillOn : styles.pillOff}`}
              onClick={() => onChange(cat.id)}
            >
              {cat.icon}
              {cat.label}
            </button>
          ))}
        </div>
        <div className={styles.sep} />
        <button className={styles.sortBtn}>
          <IconAdjustmentsHorizontal size={14} />
          Lọc & Sắp xếp
        </button>
      </div>
    </div>
  );
}
