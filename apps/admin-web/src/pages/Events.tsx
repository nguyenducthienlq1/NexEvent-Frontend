import type { EventProps } from "../types/EventProps";
import EventCard from "../components/EventCard";

const Events = () => {
  // Sample event data - replace with actual data fetching logic
  const events: EventProps[] = [
    {
      id: 1,
      title: "Sự kiện 1",
      description: "Mô tả sự kiện 1",
      cover: "https://example.com/image1.jpg",
      location: "Địa điểm 1",
      startTime: "2023-10-01T10:00:00Z",
      endTime: "2023-10-01T12:00:00Z",
      active: true,
    },
    {
      id: 2,
      title: "Sự kiện 2",
      description: "Mô tả sự kiện 2",
      cover: "https://example.com/image2.jpg",
      location: "Địa điểm 2",
      startTime: "2023-10-02T14:00:00Z",
      endTime: "2023-10-02T16:00:00Z",
      active: true,
    },
    {
      id: 3,
      title: "Sự kiện 3",
      description: "Mô tả sự kiện 3",
      cover: "https://example.com/image3.jpg",
      location: "Địa điểm 3",
      startTime: "2023-10-03T09:00:00Z",
      endTime: "2023-10-03T11:00:00Z",
      active: false,
    },
    {
      id: 4,
      title: "Sự kiện 4",
      description: "Mô tả sự kiện 4",
      cover: "https://example.com/image4.jpg",
      location: "Địa điểm 4",
      startTime: "2023-10-04T10:00:00Z",
      endTime: "2023-10-04T12:00:00Z",
      active: false,
    },
    {
      id: 5,
      title: "Sự kiện 5",
      description: "Mô tả sự kiện 5",
      cover: "https://example.com/image5.jpg",
      location: "Địa điểm 5",
      startTime: "2023-10-05T10:00:00Z",
      endTime: "2023-10-05T12:00:00Z",
      active: false,
    },
    {
      id: 6,
      title: "Sự kiện 6",
      description: "Mô tả sự kiện 6",
      cover: "https://example.com/image6.jpg",
      location: "Địa điểm 6",
      startTime: "2023-10-06T10:00:00Z",
      endTime: "2023-10-06T12:00:00Z",
      active: false,
    },
    {
      id: 7,
      title: "Sự kiện 7",
      description: "Mô tả sự kiện 7",
      cover: "https://example.com/image7.jpg",
      location: "Địa điểm 7",
      startTime: "2023-10-07T10:00:00Z",
      endTime: "2023-10-07T12:00:00Z",
      active: false,
    },
    {
      id: 8,
      title: "Sự kiện 8",
      description: "Mô tả sự kiện 8",
      cover: "https://example.com/image8.jpg",
      location: "Địa điểm 8",
      startTime: "2023-10-08T10:00:00Z",
      endTime: "2023-10-08T12:00:00Z",
      active: false,
    },
  ];

  return (
    <article className="p-4 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">Sự kiện</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </article>
  );
};
export default Events;
