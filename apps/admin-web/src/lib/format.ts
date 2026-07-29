export function toInputDate(value?: string) {
  if (!value) return "";
  return value.slice(0, 16);
}

export function toApiDate(value: string) {
  return value.length === 16 ? `${value}:00` : value;
}

export function formatDate(value?: string) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("vi-VN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export function formatMoney(value?: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value || 0);
}
