import { useState } from "react";
import type { FormEvent } from "react";
import { Badge } from "../../../components/common/Badge";
import { EmptyState } from "../../../components/common/EmptyState";
import { Modal } from "../../../components/ui/Modal";
import {
  formatDate,
  formatMoney,
  toApiDate,
  toInputDate,
} from "../../../lib/format";
import type { EventItem } from "../../events/types";
import { useDeleteTicketType, useSaveTicketType } from "../hooks/useTickets";
import type { TicketType, TicketTypePayload } from "../types";

const emptyTicket: TicketTypePayload = {
  eventId: 0,
  title: "",
  description: "",
  price: 0,
  totalQuantity: 1,
  startTime: "",
  endTime: "",
};

export function TicketTypesPage({
  events,
  selectedEventId,
  tickets,
  loading,
}: {
  events: EventItem[];
  selectedEventId: number;
  tickets: TicketType[];
  loading: boolean;
}) {
  const [editing, setEditing] = useState<TicketType | null>(null);
  const [isCreating, setCreating] = useState(false);
  const selectedEvent = events.find((event) => event.id === selectedEventId);
  const deleteMutation = useDeleteTicketType();

  return (
    <section className="constrainedPage">
      <div className="actionBar">
        <div>
          <h2>{selectedEvent ? selectedEvent.title : "Kho vé"}</h2>
          <p>Quản lý thời gian mở bán, số lượng và giá vé cho sự kiện.</p>
        </div>
        <button
          className="primaryButton"
          disabled={!selectedEventId}
          onClick={() => setCreating(true)}
        >
          + Thêm loại vé
        </button>
      </div>
      <div className="tablePanel">
        <table>
          <thead>
            <tr>
              <th>Loại vé</th>
              <th>Giá bán</th>
              <th>Đã bán</th>
              <th>Thời gian mở bán</th>
              <th>Trạng thái</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.id}>
                <td>
                  <strong>{ticket.title}</strong>
                  <span className="subtleText">
                    {ticket.description || "Không có mô tả"}
                  </span>
                </td>
                <td>{formatMoney(Number(ticket.price))}</td>
                <td>
                  {ticket.soldQuantity}/{ticket.totalQuantity}
                </td>
                <td>
                  {formatDate(ticket.startTime)}
                  <span className="subtleText">
                    đến {formatDate(ticket.endTime)}
                  </span>
                </td>
                <td>
                  <Badge value={ticket.status} />
                </td>
                <td className="rowActions">
                  <button
                    className="ghostButton"
                    onClick={() => setEditing(ticket)}
                  >
                    Sửa
                  </button>
                  <button
                    className="dangerButton"
                    onClick={() => deleteMutation.mutate(ticket.id)}
                  >
                    Ngừng bán
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {loading && (
          <EmptyState title="Đang tải dữ liệu" text="Đang lấy danh sách vé." />
        )}
        {!loading && tickets.length === 0 && (
          <EmptyState
            title="Chưa có loại vé nào"
            text="Hãy tạo các hạng vé cho sự kiện này."
          />
        )}
      </div>
      {(isCreating || editing) && selectedEventId > 0 && (
        <TicketModal
          eventId={selectedEventId}
          ticket={editing}
          onClose={() => {
            setCreating(false);
            setEditing(null);
          }}
        />
      )}
    </section>
  );
}

function TicketModal({
  eventId,
  ticket,
  onClose,
}: {
  eventId: number;
  ticket: TicketType | null;
  onClose: () => void;
}) {
  const mutation = useSaveTicketType(ticket?.id);
  const initial = ticket
    ? {
        eventId,
        title: ticket.title,
        description: ticket.description || "",
        price: Number(ticket.price),
        totalQuantity: ticket.totalQuantity,
        startTime: toInputDate(ticket.startTime),
        endTime: toInputDate(ticket.endTime),
      }
    : { ...emptyTicket, eventId };

  function submit(formEvent: FormEvent<HTMLFormElement>) {
    formEvent.preventDefault();
    const form = new FormData(formEvent.currentTarget);
    mutation.mutate(
      {
        eventId,
        title: String(form.get("title")),
        description: String(form.get("description")),
        price: Number(form.get("price")),
        totalQuantity: Number(form.get("totalQuantity")),
        startTime: toApiDate(String(form.get("startTime"))),
        endTime: toApiDate(String(form.get("endTime"))),
      },
      { onSuccess: onClose },
    );
  }

  return (
    <Modal isOpen={true} onClose={onClose}>
      <form className="modalPanel compact" onSubmit={submit}>
        <div className="panelHeader">
          <div>
            <h2>{ticket ? "Sửa loại vé" : "Tạo loại vé mới"}</h2>
            <p>Thời gian bán vé phải hợp lệ theo cấu hình hệ thống.</p>
          </div>
          <button type="button" className="ghostButton" onClick={onClose}>
            Đóng
          </button>
        </div>
        <div className="formGrid">
          <label>
            Tên loại vé
            <input name="title" defaultValue={initial.title} required />
          </label>
          <label>
            Giá bán
            <input
              name="price"
              type="number"
              min={0}
              defaultValue={initial.price}
              required
            />
          </label>
          <label>
            Số lượng
            <input
              name="totalQuantity"
              type="number"
              min={1}
              defaultValue={initial.totalQuantity}
              required
            />
          </label>
          <label>
            Bắt đầu bán
            <input
              name="startTime"
              type="datetime-local"
              defaultValue={initial.startTime}
              required
            />
          </label>
          <label>
            Kết thúc bán
            <input
              name="endTime"
              type="datetime-local"
              defaultValue={initial.endTime}
              required
            />
          </label>
          <label className="spanTwo">
            Mô tả
            <textarea
              name="description"
              rows={4}
              defaultValue={initial.description}
            />
          </label>
        </div>
        {mutation.isError && (
          <p className="formError">
            Không thể lưu loại vé. Vui lòng kiểm tra lại số lượng, giá và thời
            gian.
          </p>
        )}
        <div className="modalActions">
          <button type="button" className="ghostButton" onClick={onClose}>
            Hủy
          </button>
          <button className="primaryButton" disabled={mutation.isPending}>
            {mutation.isPending ? "Đang lưu..." : "Lưu loại vé"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
