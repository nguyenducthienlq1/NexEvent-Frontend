import type { EventProps } from "../types/EventProps";

const EventCard = ({ event }: { event: EventProps }) => {
  const { title, description, cover, location, startTime, endTime } = event;

  return (
    <div className="event-card">
      <div className="rounded overflow-hidden mb-4 shadow">
        <img src={cover} alt={title} />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      <p>Location: {location}</p>
      <p>Start Time: {startTime}</p>
      <p>End Time: {endTime}</p>
    </div>
  );
};

export default EventCard;
