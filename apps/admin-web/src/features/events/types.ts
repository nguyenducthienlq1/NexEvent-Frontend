export type EventItem = {
  id: number;
  title: string;
  description?: string;
  cover?: string;
  location: string;
  startTime: string;
  endTime: string;
  active: boolean;
  organizerName?: string;
};

export type EventPayload = {
  title: string;
  description?: string;
  cover?: string;
  location: string;
  startTime: string;
  endTime: string;
};
