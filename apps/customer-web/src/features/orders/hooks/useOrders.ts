import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { orderApi, ticketTypeApi } from "@/features/orders/api/order.api";
import type { OrderRequest } from "@/features/orders/types/order.types";

// ── Order Mutations ───────────────────────────────────────────

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: OrderRequest) => orderApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}

export function useCancelOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (idOrder: number) => orderApi.cancel(idOrder),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}

export function usePayOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (idOrder: number) => orderApi.pay(idOrder),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}

// ── Ticket Type Queries ───────────────────────────────────────

export function useTicketTypesByEvent(
  eventId: number,
  params?: { page?: number; size?: number; sortBy?: string },
) {
  return useQuery({
    queryKey: ["ticket-types", eventId, params],
    queryFn: () =>
      ticketTypeApi.getByEvent(eventId, params).then((r) => r.data),
    enabled: !!eventId,
  });
}

// ── Ticket Type Mutations ─────────────────────────────────────

export function useCreateTicketType() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ticketTypeApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ticket-types"] });
    },
  });
}

export function useUpdateTicketType() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: Parameters<typeof ticketTypeApi.update>[1];
    }) => ticketTypeApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ticket-types"] });
    },
  });
}

export function useDeleteTicketType() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => ticketTypeApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ticket-types"] });
    },
  });
}
