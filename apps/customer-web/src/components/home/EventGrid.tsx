import type { Event } from "@/types/event.types";
import EventCard from "./EventCard";
import styles from "./EventGrid.module.css";

interface Props {
  events: Event[];
  total: number;
}

export default function EventGrid({ events, total }: Props) {
  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <span className={styles.title}>Sắp diễn ra</span>
        <span className={styles.count}>{total} sự kiện</span>
      </div>
      <div className={styles.grid}>
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
