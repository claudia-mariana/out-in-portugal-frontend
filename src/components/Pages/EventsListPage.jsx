import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EventCard from "../Functionalities/EventCard";
import eventsService from "../../services/events.service";
import Notification from "../Functionalities/Notification"


function EventsListPage() {
  const [events, setEvents] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');


  const getAllEvents = () => {
    eventsService
      .getAllEvents()
      .then((response) => setEvents(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllEvents();
  }, []);

  const showError = (message) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(''), 3000);
  };



    // Handle deletion of an event
    const handleDeleteEvent = (deletedId) => {
      // Filter out the deleted event from state
      setEvents((prevEvents) => prevEvents.filter(event => event._id !== deletedId));
    };

    return (
      <div>
        <Notification message={errorMessage} onClose={() => setErrorMessage('')} />
    
        <h1 className="text-center my-10 text-5xl font-bold">Let’s make plans!</h1>
        <div className="flex justify-center">
          <Link to={"/api/events/create"}>
            <button className="bg-blue center text-white py-2 px-4 rounded-md shadow-md hover:text-yellow">
              Create Event
            </button>
          </Link>
        </div>
        <div className="events-container grid grid-cols-1 md:flex md:flex-row md:flex-wrap justify-center items-center w-full my-10 gap-4 px-4">
          {events.toReversed().map((event) => (
            <div key={event._id} className="w-full md:w-auto">
              <EventCard {...event} onDelete={handleDeleteEvent} setError={showError} />
            </div>
          ))}
        </div>
      </div>
    );

  }

export default EventsListPage;


