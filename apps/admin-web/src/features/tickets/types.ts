export type TicketType = {
  id: number;
  title: string;
  description?: string;
  price: number;
  totalQuantity: number;
  soldQuantity: number;
  remainQuantity: number;
  startTime: string;
  endTime: string;
  status: "ACTIVE" | "INACTIVE" | string;
};

export type TicketTypePayload = {
  eventId: number;
  title: string;
  description?: string;
  price: number;
  totalQuantity: number;
  startTime: string;
  endTime: string;
};
