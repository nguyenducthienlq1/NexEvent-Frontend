import { navItems } from "../../app/router";
import { authStore } from "../../stores/auth.store";
import type { UserLogin } from "../../features/auth/types";
import type { ViewKey } from "../../types/common";

export function Sidebar({
  currentView,
  user,
  onNavigate,
  onSignOut,
}: {
  currentView: ViewKey;
  user: UserLogin | null;
  onNavigate: (view: ViewKey) => void;
  onSignOut: () => void;
}) {
  const mainNav = navItems.filter((i) => i.id !== "checkin");
  const opsNav = navItems.filter((i) => i.id === "checkin");

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brandMark">NX</div>
        <div>
          <strong>NexEvent</strong>
          <span>Quản trị</span>
        </div>
      </div>

      <div className="sidebarNavGroup">
        <h3>Hệ thống</h3>
        <nav className="navList" aria-label="Main navigation">
          {mainNav.map((item) => (
            <button
              key={item.id}
              className={currentView === item.id ? "navItem active" : "navItem"}
              onClick={() => onNavigate(item.id)}
            >
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="sidebarNavGroup">
        <h3>Vận hành</h3>
        <nav className="navList" aria-label="Operations navigation">
          {opsNav.map((item) => (
            <button
              key={item.id}
              className={currentView === item.id ? "navItem active" : "navItem"}
              onClick={() => onNavigate(item.id)}
            >
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="sidebarFooter">
        <span>
          {user?.email || authStore.getUser()?.email || "Đã đăng nhập"}
        </span>
        <button
          className="ghostButton"
          onClick={onSignOut}
          style={{ width: "100%" }}
        >
          Đăng xuất
        </button>
      </div>
    </aside>
  );
}
