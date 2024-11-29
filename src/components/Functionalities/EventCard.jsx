import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import eventsService from "../../services/events.service";
import { TrashIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { format } from 'date-fns';


function EventCard({ _id, title, meetingPoint, startDate, endDate, onDelete, setError }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const deleteEvent = () => {
    if (!isAuthenticated) {
      setError("You need to Log In to delete your event.");
      return;
    }

    eventsService.deleteEvent(_id)
      .then(() => {
        onDelete(_id);
        navigate("/api/events");
      })
      .catch((err) => {
        if (err.response && err.response.status === 401 || 403 || 400) {
          setError("You are not authorized to delete this event.");
        } else {
          setError("An error occurred. Please try again later.");
        }
      });
  };

  // eventcard.jsx

return (
  <div className="relative sm:w-1/2 md:w-[30vw]">
    {isAuthenticated && (
      <button
        onClick={deleteEvent}
        className="absolute top-0 right-5 m-[1vw] cursor-pointer pointer-events-auto z-50"
      >
        <TrashIcon className="w-6" />
      </button>
    )}
    <NavLink to={`/api/events/${_id}`} className="block">
      <div className="event-card flex flex-col sm:flex-row items-center relative bg-gray-light w-full sm:w-auto h-auto m-[1vw] rounded-md shadow-md overflow-hidden p-4 cursor-pointer transition-shadow hover:transform hover:shadow-lg">
        <div className="content relative flex flex-col justify-end w-full">
          <h3 className="text-black text-xl font-semibold m-2">{title}</h3>
          <div>
            <MapPinIcon className="w-4 text-orange inline-block ml-2 font-extrabold" />
            <p className="text-black text-base m-2 inline-block">{meetingPoint}</p>
          </div>
          <div>
            <p className="text-black text-base font-semibold ml-2 inline-block">Start Date:</p>
            <p className="text-black text-base ml-2 inline-block">{format(new Date(startDate), 'MMM do, yyyy')},</p>
            <p className="text-black text-base ml-2 inline-block">{format(new Date(startDate), 'HH:mm')}h</p>
          </div>
          <div>
            <p className="text-black text-base font-semibold ml-2 inline-block">End Date:</p>
            <p className="text-black text-base ml-2 inline-block">{format(new Date(endDate), 'MMM do, yyyy')}, </p>
            <p className="text-black text-base ml-2 inline-block">{format(new Date(endDate), 'HH:mm')}h</p>
          </div>
        </div>
      </div>
    </NavLink>
  </div>
);
}

export default EventCard; 