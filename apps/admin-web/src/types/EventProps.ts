export interface EventProps {
  id: number;
  title: string;
  description: string;
  cover: string; // URL hình ảnh
  location: string;
  startTime: string; // Hoặc Date
  endTime: string;
  active: boolean;
}
