import { useQuery } from "@tanstack/react-query";
import { eventApi } from "@/features/events/api/event.api";

export function useEvents(params?: {
  page?: number;
  size?: number;
  sortBy?: string;
}) {
  return useQuery({
    queryKey: ["events", params],
    // Backend bọc response trong object { statusCode, data } nên cần trích xuất r.data.data
    queryFn: () => eventApi.getAll(params).then((r) => r.data.data),
  });
}

export function useEventSearch(
  keyword: string,
  params?: { page?: number; size?: number },
) {
  return useQuery({
    queryKey: ["events", "search", keyword, params],
    queryFn: () => eventApi.search(keyword, params).then((r) => r.data.data),
    enabled: keyword.trim().length > 0,
  });
}

export function useEventDetail(id: number) {
  return useQuery({
    queryKey: ["events", id],
    queryFn: () => eventApi.getById(id).then((r) => r.data.data),
    enabled: !!id,
  });
}

import { ticketTypeApi } from "@/features/orders/api/order.api";

export function useTicketTypes(eventId: number) {
  return useQuery({
    queryKey: ["ticket-types", eventId],
    queryFn: () =>
      ticketTypeApi.getByEvent(eventId).then((r) => r.data.data.content),
    enabled: !!eventId,
  });
}
