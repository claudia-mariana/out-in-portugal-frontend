import { NavLink, useNavigate } from "react-router-dom";
import eventsService from "../../services/events.service";
import { TrashIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { format } from 'date-fns';
import { useState, useEffect } from "react";

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Intl.DateTimeFormat('default', options).format(new Date(dateString));
}



function EventCard(event) {
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
      alert("You must be logged in to delete an event.");
      return;
    }

    eventsService.deleteEvent(event._id)
      .then(() => navigate("/api/events"))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="flex-grow">
        <div className="relative m-3 w-full h-[30vh]">
          <NavLink to={`/api/events/${event._id}`}
            className="block p-2 bg-gray-light text-blue  hover:text-opacity-70 rounded-lg shadow-md hover:shadow-lg transition-shadow">

            <h3 className="text-black text-xl font-semibold mb-5 overflow-hidden text-ellipsis whitespace-normal max-h-[1.5em]">
              {event.title}</h3>

            <div className="whitespace-normal my-5">
              <p className="text-black text-base font-semibold ml-2">
                Meeting Point:
              </p>
              <MapPinIcon className=" w-[1vw] text-blue inline-block ml-2" />
              <p className="text-black text-base m-2 overflow-hidden text-ellipsis whitespace-normal">
                {event.meetingPoint}
              </p>
            </div>
            <div className="whitespace-normal my-3">
              <p className="text-black text-base font-semibold ml-2 inline-block">
                Start Date: </p>
              <p className="text-black text-base ml-2 inline-block">
                {format(new Date(event.startDate), 'MMM do, yyyy')},</p>
              <p className="text-black text-base ml-2 inline-block">
                {format(new Date(event.startDate), 'HH:mm')}h</p>
            </div>
            <div className="whitespace-no-wrap my-3">
              <p className="text-black text-base font-semibold ml-2 inline-block">
                End Date: </p>
              <p className="text-black text-base ml-2 inline-block">
                {format(new Date(event.endDate), 'MMM do, yyyy')}, </p>
              <p className="text-black text-base ml-2 inline-block">
                {format(new Date(event.endDate), 'HH:mm')}h </p>
            </div>

          </NavLink>
          {/* Only show the delete button if authenticated */}
          {isAuthenticated && (
            <button
              onClick={deleteEvent}
              className="absolute top-0 right-0 m-[1vw] cursor-pointer pointer-events-auto z-50"
            >
              <TrashIcon className="w-[1vw]" />
            </button>
          )}


        </div>
      </div>
    </div>
  );
}

export default EventCard;