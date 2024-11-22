import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EventCard from "../Functionalities/EventCard";
import eventsService from "../../services/events.service";

function EventsListPage() {
  const [events, setEvents] = useState([]);

  const getAllEvents = () => {
    eventsService
      .getAllEvents()
      .then((response) => setEvents(response.data))
      .catch((error) => console.log(error));
  };


  useEffect(() => {
    getAllEvents();
  }, []);

  return (
    <div>

      <Link to={"/api/events/create"}>
        <button>+ Create Event + </button>
      </Link>

      {events.map((event) => (
        <EventCard key={event._id} {...event} />
      ))}
    </div>
  );
}

export default EventsListPage;


