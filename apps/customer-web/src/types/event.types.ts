// ────────────────────────────────────────────────────────────
// Event types — map từ EventResDTO, EventReqDTO
// ────────────────────────────────────────────────────────────

export interface Event {
  id: number;
  title: string;
  description: string;
  date: string; // ISO 8601 datetime
  cover: string; // URL ảnh bìa
  location: string;
  startTime: string; // ISO 8601 datetime
  endTime: string; // ISO 8601 datetime
  active: boolean;
  organizerName: string;
}

export interface EventRequest {
  title: string;
  description: string;
  date: string;
  cover: string;
  location: string;
  startTime: string;
  endTime: string;
}

// Spring Page wrapper
export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number; // current page (0-indexed)
}
