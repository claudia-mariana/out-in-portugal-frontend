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
      <h1 className="text-center my-10 text-5xl font-bold">
      Let’s Make Plans!
        </h1>
      <div className="flex justify-center">
      <Link to={"/api/events/create"}>
        <button className="bg-blue center text-white py-2 px-4 rounded-md shadow-md  hover:text-yellow"> 
          Create Event </button>
      </Link>
      </div>
      <div className="activities-container flex flex-wrap justify-center items-center w-full my-10">
      {events.toReversed().map((event) => (
        <EventCard key={event._id} {...event} />
      ))}
      </div>
    </div>
  );
}

export default EventsListPage;


