import { useState } from "react";
import type { FormEvent } from "react";
import { EmptyState } from "../../../components/common/EmptyState";
import { Modal } from "../../../components/ui/Modal";
import { formatDate, toApiDate, toInputDate } from "../../../lib/format";
import { useDeleteEvent, useSaveEvent } from "../hooks/useEvents";
import type { EventItem, EventPayload } from "../types";

const emptyEvent: EventPayload = {
  title: "",
  description: "",
  cover: "",
  location: "",
  startTime: "",
  endTime: "",
};

export function EventsPage({
  events,
  loading,
}: {
  events: EventItem[];
  loading: boolean;
}) {
  const [editing, setEditing] = useState<EventItem | null>(null);
  const [isCreating, setCreating] = useState(false);
  const deleteMutation = useDeleteEvent();

  return (
    <section className="constrainedPage">
      <div className="actionBar">
        <div>
          <h2>Danh sách sự kiện</h2>
          <p>Tạo mới, cập nhật và ẩn các sự kiện trên trang khách hàng.</p>
        </div>
        <button className="primaryButton" onClick={() => setCreating(true)}>
          + Tạo sự kiện mới
        </button>
      </div>
      <div className="tablePanel">
        <table>
          <thead>
            <tr>
              <th>Sự kiện</th>
              <th>Địa điểm</th>
              <th>Bắt đầu</th>
              <th>Trạng thái</th>
              <th>Ban tổ chức</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td>
                  <div className="entityCell">
                    <img src={event.cover || "/favicon.svg"} alt="" />
                    <div>
                      <strong>{event.title}</strong>
                      <span>#{event.id}</span>
                    </div>
                  </div>
                </td>
                <td>{event.location}</td>
                <td>{formatDate(event.startTime)}</td>
                <td>
                  <span className={`badge ${event.active ? "good" : "danger"}`}>
                    {event.active ? "HOẠT ĐỘNG" : "ĐÃ ẨN"}
                  </span>
                </td>
                <td>{event.organizerName || "-"}</td>
                <td className="rowActions">
                  <button
                    className="ghostButton"
                    onClick={() => setEditing(event)}
                  >
                    Sửa
                  </button>
                  <button
                    className="dangerButton"
                    onClick={() => deleteMutation.mutate(event.id)}
                  >
                    Ẩn
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {loading && (
          <EmptyState
            title="Đang tải dữ liệu"
            text="Đang lấy danh sách sự kiện."
          />
        )}
        {!loading && events.length === 0 && (
          <EmptyState
            title="Chưa có sự kiện nào"
            text="Hãy tạo sự kiện đầu tiên để bắt đầu bán vé."
          />
        )}
      </div>
      {(isCreating || editing) && (
        <EventModal
          event={editing}
          onClose={() => {
            setCreating(false);
            setEditing(null);
          }}
        />
      )}
    </section>
  );
}

function EventModal({
  event,
  onClose,
}: {
  event: EventItem | null;
  onClose: () => void;
}) {
  const mutation = useSaveEvent(event?.id);
  const initial = event
    ? {
        title: event.title,
        description: event.description || "",
        cover: event.cover || "",
        location: event.location,
        startTime: toInputDate(event.startTime),
        endTime: toInputDate(event.endTime),
      }
    : emptyEvent;

  function submit(formEvent: FormEvent<HTMLFormElement>) {
    formEvent.preventDefault();
    const form = new FormData(formEvent.currentTarget);
    mutation.mutate(
      {
        title: String(form.get("title")),
        description: String(form.get("description")),
        cover: String(form.get("cover")),
        location: String(form.get("location")),
        startTime: toApiDate(String(form.get("startTime"))),
        endTime: toApiDate(String(form.get("endTime"))),
      },
      { onSuccess: onClose },
    );
  }

  return (
    <Modal isOpen={true} onClose={onClose}>
      <form className="modalPanel" onSubmit={submit}>
        <div className="panelHeader">
          <div>
            <h2>{event ? "Sửa sự kiện" : "Tạo sự kiện mới"}</h2>
            <p>
              Đảm bảo thông tin tiêu đề, ảnh bìa, địa điểm và lịch trình chính
              xác.
            </p>
          </div>
          <button type="button" className="ghostButton" onClick={onClose}>
            Đóng
          </button>
        </div>
        <div className="formGrid">
          <label>
            Tiêu đề
            <input name="title" defaultValue={initial.title} required />
          </label>
          <label>
            Địa điểm
            <input name="location" defaultValue={initial.location} required />
          </label>
          <label className="spanTwo">
            Link ảnh bìa
            <input name="cover" defaultValue={initial.cover} />
          </label>
          <label>
            Thời gian bắt đầu
            <input
              name="startTime"
              type="datetime-local"
              defaultValue={initial.startTime}
              required
            />
          </label>
          <label>
            Thời gian kết thúc
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
              rows={5}
              defaultValue={initial.description}
            />
          </label>
        </div>
        {mutation.isError && (
          <p className="formError">
            Không thể lưu sự kiện. Vui lòng kiểm tra các trường bắt buộc và thời
            gian.
          </p>
        )}
        <div className="modalActions">
          <button type="button" className="ghostButton" onClick={onClose}>
            Hủy
          </button>
          <button className="primaryButton" disabled={mutation.isPending}>
            {mutation.isPending ? "Đang lưu..." : "Lưu sự kiện"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
