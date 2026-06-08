import axiosInstance from "@/api/axiosInstance";
import type {
  OrderRequest,
  OrderResponse,
  OrderPaidResponse,
  TicketType,
  TicketTypeRequest,
} from "@/types/order.types";
import type { Page } from "@/types/event.types";

// ── Order ─────────────────────────────────────────────────────

export const orderApi = {
  create: (data: OrderRequest) =>
    axiosInstance.post<OrderResponse>("/orders", data),

  cancel: (idOrder: number) => axiosInstance.patch<void>(`/orders/${idOrder}`),

  pay: (idOrder: number) =>
    axiosInstance.post<OrderPaidResponse>(`/orders/${idOrder}/complete`),
};

// ── Ticket Type ───────────────────────────────────────────────

export const ticketTypeApi = {
  getByEvent: (
    eventId: number,
    params?: { page?: number; size?: number; sortBy?: string },
  ) =>
    axiosInstance.get<Page<TicketType>>(`/events/${eventId}/ticket-types`, {
      params,
    }),

  // Admin only
  getAllByEventAdmin: (
    eventId: number,
    params?: { page?: number; size?: number; sortBy?: string },
  ) =>
    axiosInstance.get<Page<TicketType>>(
      `/admin/events/${eventId}/ticket-types`,
      {
        params,
      },
    ),

  create: (data: TicketTypeRequest) =>
    axiosInstance.post<TicketType>("/ticket-types", data),

  update: (id: number, data: TicketTypeRequest) =>
    axiosInstance.put<TicketType>(`/ticket-types/${id}`, data),

  delete: (id: number) => axiosInstance.delete(`/ticket-types/${id}`),
};
