import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authStore } from "../../../stores/auth.store";
import { ticketsApi } from "../api/tickets.api";
import type { TicketTypePayload } from "../types";

export function useTicketTypes(eventId: number) {
  return useQuery({
    queryKey: ["ticket-types", eventId],
    queryFn: () => ticketsApi.listByEvent(eventId, { page: 0, size: 100 }),
    enabled: !!authStore.getToken() && eventId > 0,
  });
}

export function useSaveTicketType(ticketId?: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: TicketTypePayload) =>
      ticketId
        ? ticketsApi.update(ticketId, payload)
        : ticketsApi.create(payload),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["ticket-types"] }),
  });
}

export function useDeleteTicketType() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ticketsApi.delete,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["ticket-types"] }),
  });
}
