// ────────────────────────────────────────────────────────────
// Ticket types — map từ ResTicketDTO, ResTicketCheckInDTO
// ────────────────────────────────────────────────────────────

export type StatusTicket = "VALID" | "USED" | "CANCELLED" | "EXPIRED";

export interface MyTicket {
  id: number;
  qrCode: string;
  status: StatusTicket;
  eventTitle: string;
  eventLocation: string;
  eventStartTime: string;
  ticketTypeTitle: string;
  ticketTypePrice: number;
}

// Backend response wrapper (from RestResponse<T>)
export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}
