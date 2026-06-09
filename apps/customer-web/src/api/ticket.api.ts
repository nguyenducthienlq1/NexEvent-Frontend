import axiosInstance from "@/api/axiosInstance";
import type { MyTicket, StatusTicket } from "@/types/ticket.types";
import type { Page } from "@/types/event.types";

export const ticketApi = {
  getMyTickets: (params?: {
    status?: StatusTicket;
    page?: number;
    size?: number;
  }) => axiosInstance.get<Page<MyTicket>>("/ticket/me", { params }),
};
