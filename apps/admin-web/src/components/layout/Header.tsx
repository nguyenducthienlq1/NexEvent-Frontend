import { navItems } from "../../app/router";
import type { EventItem } from "../../features/events/types";
import type { ViewKey } from "../../types/common";

export function Header({
  currentView,
  events,
  activeEventId,
  onSelectEvent,
  onRefresh,
  onNavigate,
}: {
  currentView: ViewKey;
  events: EventItem[];
  activeEventId: number;
  onSelectEvent: (eventId: number) => void;
  onRefresh: () => void;
  onNavigate?: (view: ViewKey) => void;
}) {
  return (
    <header className="topbar">
      <div className="topbarLeft">
        <h1>{navItems.find((item) => item.id === currentView)?.label}</h1>
      </div>
      <div className="topbarActions">
        <select
          value={activeEventId}
          onChange={(event) => onSelectEvent(Number(event.target.value))}
        >
          {events.length === 0 ? (
            <option value={0}>Không có sự kiện</option>
          ) : (
            events.map((event) => (
              <option key={event.id} value={event.id}>
                {event.title}
              </option>
            ))
          )}
        </select>
        <button className="ghostButton" onClick={onRefresh}>
          Làm mới
        </button>
        {currentView === "dashboard" && onNavigate && (
          <button
            className="primaryButton"
            onClick={() => onNavigate("events")}
          >
            + Tạo sự kiện mới
          </button>
        )}
      </div>
    </header>
  );
}
