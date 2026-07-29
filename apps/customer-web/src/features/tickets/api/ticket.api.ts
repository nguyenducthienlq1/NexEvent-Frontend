import axiosInstance from "@/lib/apiClient";
import type {
  MyTicket,
  StatusTicket,
} from "@/features/tickets/types/ticket.types";
import type { Page } from "@/features/events/types/event.types";

export const ticketApi = {
  getMyTickets: (params?: {
    status?: StatusTicket;
    page?: number;
    size?: number;
  }) => axiosInstance.get<Page<MyTicket>>("/ticket/me", { params }),
};
