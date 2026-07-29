import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import styles from "./Pagination.module.css";

interface Props {
  page: number; // 0-indexed (Spring)
  totalPages: number;
  onChange: (page: number) => void;
}

export default function Pagination({ page, totalPages, onChange }: Props) {
  if (totalPages <= 1) return null;

  const current = page + 1; // display 1-indexed
  const pages: (number | "…")[] = [];

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (current > 3) pages.push("…");
    for (
      let i = Math.max(2, current - 1);
      i <= Math.min(totalPages - 1, current + 1);
      i++
    ) {
      pages.push(i);
    }
    if (current < totalPages - 2) pages.push("…");
    pages.push(totalPages);
  }

  return (
    <div className={styles.pager}>
      <button
        className={styles.pg}
        disabled={page === 0}
        onClick={() => onChange(page - 1)}
        aria-label="Trang trước"
      >
        <IconChevronLeft size={12} />
      </button>

      {pages.map((p, i) =>
        p === "…" ? (
          <span
            key={`ellipsis-${i}`}
            className={styles.pg}
            style={{ letterSpacing: 1, fontSize: 10 }}
          >
            ···
          </span>
        ) : (
          <button
            key={p}
            className={`${styles.pg} ${p - 1 === page ? styles.pgOn : ""}`}
            onClick={() => onChange((p as number) - 1)}
          >
            {p}
          </button>
        ),
      )}

      <button
        className={styles.pg}
        disabled={page >= totalPages - 1}
        onClick={() => onChange(page + 1)}
        aria-label="Trang sau"
      >
        <IconChevronRight size={12} />
      </button>
    </div>
  );
}
