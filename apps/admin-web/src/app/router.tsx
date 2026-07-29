import type { ViewKey } from "../types/common";

export const navItems: Array<{ id: ViewKey; label: string; hint: string }> = [
  { id: "dashboard", label: "Tổng quan", hint: "Tổng hợp" },
  { id: "events", label: "Sự kiện", hint: "Quản lý" },
  { id: "tickets", label: "Loại vé", hint: "Bảng giá" },
  { id: "checkin", label: "Điểm danh", hint: "Kiểm soát" },
];
