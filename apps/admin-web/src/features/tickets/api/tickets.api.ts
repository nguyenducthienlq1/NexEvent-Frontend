import { apiClient } from "../../../lib/apiClient";
import type { Page } from "../../../types/common";
import type { TicketType, TicketTypePayload } from "../types";

export const ticketsApi = {
  listByEvent: async (
    eventId: number,
    params?: { page?: number; size?: number },
  ) => {
    const { data } = await apiClient.get<Page<TicketType>>(
      `/admin/events/${eventId}/ticket-types`,
      { params },
    );
    return data;
  },
  create: async (payload: TicketTypePayload) => {
    const { data } = await apiClient.post<TicketType>("/ticket-types", payload);
    return data;
  },
  update: async (id: number, payload: TicketTypePayload) => {
    const { data } = await apiClient.put<TicketType>(
      `/ticket-types/${id}`,
      payload,
    );
    return data;
  },
  delete: async (id: number) => {
    await apiClient.delete(`/ticket-types/${id}`);
  },
};
