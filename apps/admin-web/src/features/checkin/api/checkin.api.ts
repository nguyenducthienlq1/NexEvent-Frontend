import { apiClient } from "../../../lib/apiClient";
import type { CheckinResult } from "../types";

export const checkinApi = {
  checkin: async (qrToken: string, gate: string) => {
    const { data } = await apiClient.post<CheckinResult>("/checkin", {
      qrToken,
      gate,
    });
    return data;
  },
};
