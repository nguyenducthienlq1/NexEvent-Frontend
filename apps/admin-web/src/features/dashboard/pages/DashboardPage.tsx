import { EmptyState } from "../../../components/common/EmptyState";
import { API_BASE_URL, API_PREFIX } from "../../../lib/apiClient";
import { formatDate, formatMoney } from "../../../lib/format";
import type { EventItem } from "../../events/types";
import type { TicketType } from "../../tickets/types";

export function DashboardPage({
  activeEventId,
  events,
  tickets,
}: {
  activeEventId: number;
  events: EventItem[];
  tickets: TicketType[];
}) {
  const selectedEvent = events.find((event) => event.id === activeEventId);
  const stats = {
    activeEvents: events.filter((event) => event.active).length,
    totalEvents: events.length,
    ticketTypes: tickets.length,
    totalCapacity: tickets.reduce((sum, item) => sum + item.totalQuantity, 0),
    sold: tickets.reduce((sum, item) => sum + item.soldQuantity, 0),
    revenue: tickets.reduce(
      (sum, item) => sum + item.soldQuantity * Number(item.price),
      0,
    ),
  };

  const capacityPercent =
    stats.totalCapacity > 0
      ? Math.round((stats.sold / stats.totalCapacity) * 100)
      : 0;

  return (
    <div className="pageContent pageStack">
      {/* Unified KPI Section */}
      <section className="kpiPanel">
        <div className="kpiItem">
          <span className="kpiLabel">Tổng số sự kiện</span>
          <span className="kpiValue">{stats.totalEvents}</span>
          <span className="kpiSub">{stats.activeEvents} đang hoạt động</span>
        </div>
        <div className="kpiItem">
          <span className="kpiLabel">Vé đã bán</span>
          <span className="kpiValue">{stats.sold}</span>
          <span className="kpiSub positive">{capacityPercent}% sức chứa</span>
        </div>
        <div className="kpiItem">
          <span className="kpiLabel">Tổng doanh thu</span>
          <span className="kpiValue">{formatMoney(stats.revenue)}</span>
          <span className="kpiSub">Dự kiến</span>
        </div>
        <div className="kpiItem">
          <span className="kpiLabel">Loại vé</span>
          <span className="kpiValue">{stats.ticketTypes}</span>
          <span className="kpiSub">Đang mở</span>
        </div>
      </section>

      <div className="splitGrid">
        {/* Inventory Health / Top Tickets */}
        <section className="panel">
          <div className="panelHeader">
            <div>
              <h2>Tình trạng kho vé</h2>
              <p>Sức chứa và trạng thái bán theo loại vé.</p>
            </div>
          </div>
          <div className="miniRows">
            {tickets.length > 0 ? (
              tickets.slice(0, 6).map((ticket) => {
                const percent =
                  ticket.totalQuantity > 0
                    ? Math.min(
                        100,
                        Math.round(
                          (ticket.soldQuantity / ticket.totalQuantity) * 100,
                        ),
                      )
                    : 0;

                return (
                  <div key={ticket.id} className="miniRow">
                    <div className="miniRowHeader">
                      <strong>{ticket.title}</strong>
                      <span>{percent}% sức chứa</span>
                    </div>
                    <div className="progressTrack">
                      <span style={{ width: `${percent}%` }} />
                    </div>
                    <span className="subtleText">
                      Đã bán {ticket.soldQuantity} / {ticket.totalQuantity}{" "}
                      &bull; {formatMoney(Number(ticket.price))}
                    </span>
                  </div>
                );
              })
            ) : (
              <EmptyState
                title="Chưa có loại vé"
                text="Vui lòng thêm số lượng vé trước khi mở bán."
              />
            )}
          </div>
        </section>

        {/* Event Readiness */}
        <section className="panel">
          <div className="panelHeader">
            <div>
              <h2>Trạng thái sự kiện</h2>
              <p>Kiểm tra nhanh thông tin cho sự kiện được chọn.</p>
            </div>
            {selectedEvent && (
              <span
                className={`badge ${selectedEvent.active ? "good" : "neutral"}`}
              >
                {selectedEvent.active ? "HOẠT ĐỘNG" : "ĐÃ ĐÓNG"}
              </span>
            )}
          </div>

          {selectedEvent ? (
            <div className="readiness">
              <h3>{selectedEvent.title}</h3>
              <p>{selectedEvent.location}</p>
              <dl>
                <div>
                  <dt>Bắt đầu</dt>
                  <dd>{formatDate(selectedEvent.startTime)}</dd>
                </div>
                <div>
                  <dt>Kết thúc</dt>
                  <dd>{formatDate(selectedEvent.endTime)}</dd>
                </div>
                <div>
                  <dt>Ban tổ chức</dt>
                  <dd>{selectedEvent.organizerName || "-"}</dd>
                </div>
              </dl>
            </div>
          ) : (
            <EmptyState
              title="Chưa chọn sự kiện"
              text="Hãy tạo hoặc chọn một sự kiện để cấu hình vé."
            />
          )}
        </section>
      </div>

      <section className="panel">
        <div className="panelHeader">
          <div>
            <h2>Luồng dữ liệu trực tiếp</h2>
            <p>
              Dữ liệu được cập nhật theo thời gian thực (SSE) khi có khách điểm
              danh.
            </p>
          </div>
        </div>
        <code className="endpoint">
          {activeEventId
            ? `${API_BASE_URL}${API_PREFIX}/dashboard/events/${activeEventId}/live-stream`
            : "Chưa chọn sự kiện"}
        </code>
      </section>
    </div>
  );
}
