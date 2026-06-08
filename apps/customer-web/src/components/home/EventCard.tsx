import { useNavigate } from "react-router-dom";
import { IconCalendar, IconMapPin, IconHeart } from "@tabler/icons-react";
import type { Event } from "@/types/event.types";
import styles from "./EventCard.module.css";

interface Props {
  event: Event;
}

function formatShortDate(iso: string) {
  return new Date(iso).toLocaleDateString("vi-VN", {
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatPrice(price?: number) {
  if (!price) return null;
  return new Intl.NumberFormat("vi-VN").format(price) + "đ";
}

// Màu thumbnail cycle theo id
const THUMB_COLORS = [
  { bg: "#EAF3DE", color: "#639922" },
  { bg: "#E6F0FB", color: "#185FA5" },
  { bg: "#FEF3E7", color: "#BA7517" },
  { bg: "#EEEDFE", color: "#534AB7" },
  { bg: "#FBE8F0", color: "#993556" },
];

export default function EventCard({ event }: Props) {
  const navigate = useNavigate();
  const thumbColor = THUMB_COLORS[event.id % THUMB_COLORS.length];

  return (
    <div
      className={styles.card}
      onClick={() => navigate(`/events/${event.id}`)}
    >
      {/* Thumbnail */}
      <div
        className={styles.thumb}
        style={
          event.cover
            ? {
                backgroundImage: `url(${event.cover})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : { background: thumbColor.bg }
        }
      >
        {!event.cover && (
          <span style={{ fontSize: 28, color: thumbColor.color }}>🎪</span>
        )}
        <button
          className={styles.wish}
          onClick={(e) => {
            e.stopPropagation();
          }}
          aria-label="Yêu thích"
        >
          <IconHeart size={12} />
        </button>
      </div>

      {/* Body */}
      <div className={styles.body}>
        <div className={styles.cat} style={{ color: thumbColor.color }}>
          {event.organizerName}
        </div>
        <div className={styles.title}>{event.title}</div>
        <div className={styles.info}>
          <div className={styles.infoRow}>
            <IconCalendar size={12} />
            {formatShortDate(event.startTime)}
          </div>
          <div className={styles.infoRow}>
            <IconMapPin size={12} />
            {event.location}
          </div>
        </div>
        <div className={styles.footer}>
          <div className={styles.price}>
            {formatPrice(undefined) ?? "Xem vé"}
            <span> / vé</span>
          </div>
          <button
            className={styles.btn}
            style={{
              background: thumbColor.bg,
              borderColor: thumbColor.color + "66",
              color: thumbColor.color,
            }}
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/events/${event.id}`);
            }}
          >
            Mua vé
          </button>
        </div>
      </div>
    </div>
  );
}
