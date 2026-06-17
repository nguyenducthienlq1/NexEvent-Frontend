import { NavLink } from "react-router-dom";
import {
  IconTicket,
  IconHome,
  IconCalendarEvent,
  IconChartBar,
} from "@tabler/icons-react";

const navItems = [
  { to: "/", label: "Home", icon: IconHome },
  { to: "/events", label: "Events", icon: IconCalendarEvent },
  { to: "/profit", label: "Profit", icon: IconChartBar },
];

const NavBar = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
      <NavLink
        to="/"
        className="flex items-center gap-2 text-lg font-bold text-gray-800"
      >
        <div className="bg-green-500 p-2 rounded-md">
          <IconTicket size={15} color="#057922" />
        </div>
        <span>
          Nex<span>Event</span>
        </span>
      </NavLink>
      <ul className="flex items-center gap-6">
        {navItems.map(({ to, label, icon: Icon }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-1.5 text-sm font-medium transition-colors
                                ${isActive ? "text-green-600" : "text-gray-600"} 
                                hover:text-gray-900 `
              }
            >
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
      <button className="bg-red-500 hover:bg-red-400 text-white py-1 px-3 rounded-md">
        Logout
      </button>
    </nav>
  );
};
export default NavBar;
