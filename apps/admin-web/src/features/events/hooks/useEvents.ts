import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authStore } from "../../../stores/auth.store";
import { eventsApi } from "../api/events.api";
import type { EventPayload } from "../types";

export function useEvents() {
  return useQuery({
    queryKey: ["events"],
    queryFn: () => eventsApi.list({ page: 0, size: 50, sortBy: "createdAt" }),
    enabled: !!authStore.getToken(),
  });
}

export function useSaveEvent(eventId?: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: EventPayload) =>
      eventId ? eventsApi.update(eventId, payload) : eventsApi.create(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["events"] }),
  });
}

export function useDeleteEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: eventsApi.delete,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["events"] }),
  });
}
