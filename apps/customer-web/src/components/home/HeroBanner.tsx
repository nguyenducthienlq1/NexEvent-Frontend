import { useNavigate } from "react-router-dom";
import {
  IconFlame,
  IconCalendar,
  IconMapPin,
  IconUsers,
  IconTicket,
} from "@tabler/icons-react";
import type { Event } from "@/types/event.types";
import styles from "./HeroBanner.module.css";

interface Props {
  event: Event;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("vi-VN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function HeroBanner({ event }: Props) {
  const navigate = useNavigate();

  return (
    <div className={styles.hero}>
      {/* Cover image background */}
      {event.cover && (
        <div
          className={styles.heroBg}
          style={{ backgroundImage: `url(${event.cover})` }}
        />
      )}
      <div className={styles.heroOverlay} />

      <div className={styles.heroContent}>
        <div className={styles.left}>
          <div className={styles.eyebrow}>
            <IconFlame size={11} />
            Hot this week
          </div>
          <h1 className={styles.title}>{event.title}</h1>
          <div className={styles.meta}>
            <span className={styles.metaItem}>
              <IconCalendar size={13} />
              {formatDate(event.startTime)}
            </span>
            <span className={styles.metaItem}>
              <IconMapPin size={13} />
              {event.location}
            </span>
            {event.organizerName && (
              <span className={styles.metaItem}>
                <IconUsers size={13} />
                {event.organizerName}
              </span>
            )}
          </div>
          <button
            className={styles.cta}
            onClick={() => navigate(`/events/${event.id}`)}
          >
            <IconTicket size={15} />
            Mua vé ngay
          </button>
        </div>

        <div className={styles.visual}>
          <div className={styles.visIcon}>
            <IconTicket size={22} color="var(--g200)" />
          </div>
          <div className={styles.visDate}>
            {new Date(event.startTime).toLocaleDateString("vi-VN", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </div>
          <div className={styles.visLabel}>{event.location}</div>
        </div>
      </div>
    </div>
  );
}
