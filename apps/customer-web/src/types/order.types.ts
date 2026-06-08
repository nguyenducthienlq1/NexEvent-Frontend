// ────────────────────────────────────────────────────────────
// Order types — map từ OrderReqDTO, OrderResDTO, ResOrderPaidDTO
// ────────────────────────────────────────────────────────────

export interface OrderItemRequest {
  ticketTypeId: number;
  quantity: number;
}

export interface OrderRequest {
  items: OrderItemRequest[];
}

export interface OrderResponse {
  id: number;
  status: string;
  totalAmount: number;
  createdAt: string;
}

export interface OrderPaidResponse {
  orderId: number;
  ticketCodes: string[];
  totalAmount: number;
}

// ────────────────────────────────────────────────────────────
// TicketType types — map từ TicketTypeResDTO, TicketTypeReqDTO
// ────────────────────────────────────────────────────────────

export type TicketTypeStatus = "ACTIVE" | "INACTIVE" | "SOLD_OUT";

export interface TicketType {
  id: number;
  title: string;
  description: string;
  price: number;
  totalQuantity: number;
  soldQuantity: number;
  remainQuantity: number;
  startTime: string;
  endTime: string;
  status: TicketTypeStatus;
}

export interface TicketTypeRequest {
  eventId: number;
  title: string;
  description: string;
  price: number;
  totalQuantity: number;
  startTime: string;
  endTime: string;
}
