import { NavLink } from "react-router-dom";
import { useState } from "react";
import {
  IconTicket,
  IconHome,
  IconCalendarEvent,
  IconChartBar,
  IconMenu2,
  IconX,
} from "@tabler/icons-react";

const navItems = [
  { to: "/", label: "Home", icon: IconHome },
  { to: "/events", label: "Events", icon: IconCalendarEvent },
  { to: "/profit", label: "Profit", icon: IconChartBar },
];

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="relative flex items-center justify-between px-6 bg-white border-b border-gray-200 h-16 z-50">
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
      <ul className="hidden md:flex items-center gap-6">
        {navItems.map(({ to, label, icon: Icon }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-1.5 text-lg font-medium transition-colors
                                ${isActive ? "text-green-600 border-b-2 border-green-600" : "text-gray-900"} 
                                hover:text-gray-900 `
              }
            >
              <Icon size={25} />
              <span>{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
      <button className="hidden md:block bg-red-500 hover:bg-red-400 text-white py-1 px-3 rounded-md">
        Logout
      </button>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
      >
        {isOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
      </button>
      {isOpen && (
        <div
          className={`absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-xl md:hidden transition-all duration-300 ease-in-out transform origin-top
                    ${isOpen ? "opacity-100 scale-y-100 visible" : "opacity-0 scale-y-0 invisible h-0"}`}
        >
          <ul className="flex flex-col p-4 gap-1">
            {navItems.map(({ to, label, icon: Icon }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? "text-green-600 bg-green-50"
                        : "text-gray-600 hover:bg-gray-50"
                    }`
                  }
                >
                  <Icon size={18} />
                  <span>{label}</span>
                </NavLink>
              </li>
            ))}
            <li className="pt-2 border-t border-gray-100">
              <button className="w-full bg-red-500 hover:bg-red-400 text-white py-2 px-3 rounded-md text-sm font-medium">
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};
export default NavBar;
