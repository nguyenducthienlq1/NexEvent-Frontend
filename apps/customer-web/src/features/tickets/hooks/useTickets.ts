import { useQuery } from "@tanstack/react-query";
import { ticketApi } from "@/features/tickets/api/ticket.api";
import type { StatusTicket } from "@/features/tickets/types/ticket.types";

export function useMyTickets(params?: {
  status?: StatusTicket;
  page?: number;
  size?: number;
}) {
  return useQuery({
    queryKey: ["my-tickets", params],
    queryFn: () => ticketApi.getMyTickets(params).then((r) => r.data.data),
  });
}
