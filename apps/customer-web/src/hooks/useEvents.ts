import { useQuery } from "@tanstack/react-query";
import { eventApi } from "@/api/event.api";

export function useEvents(params?: {
  page?: number;
  size?: number;
  sortBy?: string;
}) {
  return useQuery({
    queryKey: ["events", params],
    queryFn: () => eventApi.getAll(params).then((r) => r.data),
  });
}

export function useEventSearch(
  keyword: string,
  params?: { page?: number; size?: number },
) {
  return useQuery({
    queryKey: ["events", "search", keyword, params],
    queryFn: () => eventApi.search(keyword, params).then((r) => r.data),
    enabled: keyword.trim().length > 0,
  });
}

export function useEventDetail(id: number) {
  return useQuery({
    queryKey: ["events", id],
    queryFn: () => eventApi.getById(id).then((r) => r.data),
    enabled: !!id,
  });
}
