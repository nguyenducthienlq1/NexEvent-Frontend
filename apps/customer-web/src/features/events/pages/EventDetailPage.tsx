import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { IconCalendar, IconMapPin, IconUsers } from "@tabler/icons-react";
import {
  useEventDetail,
  useTicketTypes,
} from "@/features/events/hooks/useEvents";
import { orderApi } from "@/features/orders/api/order.api";
import type { TicketType } from "@/features/orders/types/order.types";
import { Button } from "@/components/ui/Button";
import styles from "./EventDetailPage.module.css";

function formatMoney(amount: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("vi-VN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const eventId = Number(id);

  const eventQuery = useEventDetail(eventId);
  const ticketsQuery = useTicketTypes(eventId);

  const [quantities, setQuantities] = useState<Record<number, number>>({});

  const createOrder = useMutation({
    mutationFn: orderApi.create,
    onSuccess: (res) => {
      // Pass total amount to checkout via state, since API doesn't have getById
      navigate(`/checkout/${res.data.id}`, {
        state: { totalAmount: res.data.totalAmount },
      });
    },
    onError: (err) => {
      alert("Đặt vé thất bại. Vui lòng thử lại.");
      console.error(err);
    },
  });

  const event = eventQuery.data;
  const tickets: TicketType[] = ticketsQuery.data || [];

  const handleQtyChange = (ticketId: number, delta: number) => {
    setQuantities((prev) => {
      const current = prev[ticketId] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [ticketId]: next };
    });
  };

  const totalAmount = useMemo(() => {
    return tickets.reduce((sum, t) => {
      const qty = quantities[t.id] || 0;
      return sum + qty * t.price;
    }, 0);
  }, [tickets, quantities]);

  const totalItems = Object.values(quantities).reduce((a, b) => a + b, 0);

  const handleBook = () => {
    if (totalItems === 0) return;
    const items = Object.entries(quantities)
      .filter(([_, qty]) => qty > 0)
      .map(([ticketTypeId, quantity]) => ({
        ticketTypeId: Number(ticketTypeId),
        quantity,
      }));

    createOrder.mutate({ items });
  };

  if (eventQuery.isLoading || ticketsQuery.isLoading) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        Đang tải chi tiết sự kiện...
      </div>
    );
  }

  if (!event) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        Sự kiện không tồn tại.
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.leftCol}>
        {event.cover && (
          <img
            src={event.cover}
            alt={event.title}
            className={styles.heroImage}
          />
        )}
        <div className={styles.content}>
          <h1 className={styles.title}>{event.title}</h1>
          <div className={styles.meta}>
            <div className={styles.metaItem}>
              <IconCalendar size={18} />
              {formatDate(event.startTime)}
            </div>
            <div className={styles.metaItem}>
              <IconMapPin size={18} />
              {event.location}
            </div>
            {event.organizerName && (
              <div className={styles.metaItem}>
                <IconUsers size={18} />
                {event.organizerName}
              </div>
            )}
          </div>
          <p className={styles.description}>{event.description}</p>
        </div>
      </div>

      <div className={styles.ticketBox}>
        <h3>Thông tin vé</h3>
        {tickets.length === 0 ? (
          <p style={{ color: "var(--n600)" }}>Sự kiện chưa mở bán vé.</p>
        ) : (
          <div className={styles.ticketList}>
            {tickets.map((t) => {
              const remain = t.totalQuantity - t.soldQuantity;
              const isSoldOut = remain <= 0 || t.status === "SOLD_OUT";
              const qty = quantities[t.id] || 0;

              return (
                <div key={t.id} className={styles.ticketItem}>
                  <div className={styles.ticketInfo}>
                    <h4>{t.title}</h4>
                    <div className={styles.ticketPrice}>
                      {formatMoney(t.price)}
                    </div>
                    <div className={styles.ticketRemain}>
                      {isSoldOut ? "Hết vé" : `Còn ${remain} vé`}
                    </div>
                  </div>
                  <div className={styles.quantityControls}>
                    <button
                      className={styles.qtyBtn}
                      disabled={qty === 0 || isSoldOut}
                      onClick={() => handleQtyChange(t.id, -1)}
                    >
                      -
                    </button>
                    <span className={styles.qtyValue}>{qty}</span>
                    <button
                      className={styles.qtyBtn}
                      disabled={isSoldOut || qty >= remain}
                      onClick={() => handleQtyChange(t.id, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className={styles.totalRow}>
          <span className={styles.totalLabel}>Tạm tính</span>
          <span className={styles.totalValue}>{formatMoney(totalAmount)}</span>
        </div>

        <Button
          variant="primary"
          className={styles.bookBtn}
          disabled={totalItems === 0 || createOrder.isPending}
          onClick={handleBook}
        >
          {createOrder.isPending ? "Đang xử lý..." : "Đặt vé ngay"}
        </Button>
      </div>
    </div>
  );
}
