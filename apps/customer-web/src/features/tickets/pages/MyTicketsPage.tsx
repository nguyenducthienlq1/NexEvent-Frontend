import { IconQrcode } from "@tabler/icons-react";
import { useMyTickets } from "@/features/tickets/hooks/useTickets";
import styles from "./MyTicketsPage.module.css";
import type { MyTicket } from "@/features/tickets/types/ticket.types";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("vi-VN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function MyTicketsPage() {
  const { data, isLoading, error } = useMyTickets();

  const tickets: MyTicket[] = data?.content || [];

  if (isLoading) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        Đang tải vé của bạn...
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{ padding: "40px", textAlign: "center", color: "var(--danger)" }}
      >
        Lỗi khi tải danh sách vé.
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Vé của tôi</h1>
      </div>

      {tickets.length === 0 ? (
        <div className={styles.emptyState}>
          <p>Bạn chưa có vé nào. Hãy khám phá các sự kiện đang hot nhé!</p>
        </div>
      ) : (
        <div className={styles.ticketList}>
          {tickets.map((t) => (
            <div key={t.id} className={styles.ticketCard}>
              <div className={styles.leftCol}>
                <div>
                  <div className={styles.ticketType}>{t.ticketTypeTitle}</div>
                  <h3 className={styles.eventTitle}>{t.eventTitle}</h3>
                </div>

                <div className={styles.metaRow}>
                  <div className={styles.metaGroup}>
                    <span className={styles.metaLabel}>Thời gian</span>
                    <span className={styles.metaValue}>
                      {formatDate(t.eventStartTime)}
                    </span>
                  </div>
                  <div className={styles.metaGroup}>
                    <span className={styles.metaLabel}>Địa điểm</span>
                    <span className={styles.metaValue}>{t.eventLocation}</span>
                  </div>
                  <div className={styles.metaGroup}>
                    <span className={styles.metaLabel}>Trạng thái</span>
                    <span className={styles.metaValue}>
                      {t.status === "VALID" ? "Hợp lệ" : "Đã sử dụng"}
                    </span>
                  </div>
                </div>
              </div>

              <div className={styles.rightCol}>
                <div className={styles.qrPlaceholder}>
                  <IconQrcode size={80} color="var(--n900)" />
                </div>
                <span className={styles.ticketCode}>{t.qrCode}</span>
                <div
                  className={`${styles.statusBadge} ${styles[`status_${t.status}`]}`}
                >
                  {t.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
