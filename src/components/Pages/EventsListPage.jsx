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
      <div className="flex flex-wrap justify-center gap-6 px-4 mx-auto mb-20">
      
      {events.toReversed().map((event) => (
        <div className="w-full sm:w-[calc(33.33%-1.5rem)] md:w-[calc(25%-1.5rem)]">
        <EventCard key={event._id} {...event} />
        </div>
      ))}
      </div>
    </div>
  );
}

export default EventsListPage;


