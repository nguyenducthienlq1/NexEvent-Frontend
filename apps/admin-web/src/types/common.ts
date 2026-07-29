export type Page<T> = {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
};

export type ViewKey = "dashboard" | "events" | "tickets" | "checkin";
