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
      <NavLink to={`/api/events/${event._id}`} className="block ">
        <div className="event-card flex flex-col items-center relative bg-gray-light w-[30vw] h-[30vh] m-[1vw] rounded-md shadow-md overflow-hidden p-0 cursor-pointer transition-shadow hover:transform hover:shadow-lg">

          <div className="content relative flex flex-col justify-end w-full pb-2 bottom-0">
            <h3 className="text-black text-xl font-semibold m-2">
              {event.title}
            </h3>

           <div>
              <p className="text-black text-base font-semibold ml-2">
                Meeting Point:
              </p>
              <MapPinIcon className=" w-[1vw] text-blue inline-block ml-2" />
              <p className="text-black text-base m-2 mb-5">
                {event.meetingPoint}
              </p>
              </div>
            
            <div>
              <p className="text-black text-base font-semibold ml-2 inline-block">
                Start Date:
              </p>
              <p className="text-black text-base ml-2 inline-block">
                {format(new Date(event.startDate), 'MMM do, yyyy')},</p>
              <p className="text-black text-base ml-2 inline-block">
                {format(new Date(event.startDate), 'HH:mm')}h</p>
                </div>
            <div>
              <p className="text-black text-base font-semibold ml-2 inline-block">
                End Date:
              </p>
              <p className="text-black text-base ml-2 inline-block">
                {format(new Date(event.endDate), 'MMM do, yyyy')}, </p>
              <p className="text-black text-base ml-2 inline-block">
                {format(new Date(event.endDate), 'HH:mm')}h
              </p>
              </div>
          </div>
          {/* Only show the delete button if authenticated */}
      {
        isAuthenticated && (
          <button
            onClick={deleteEvent}
            className="absolute top-0 right-0 m-[1vw] cursor-pointer pointer-events-auto z-50"
          >
            <TrashIcon className="w-[1vw]" />
          </button>
        )
      }

        </div>

      </NavLink >


      

    </div >

  );
}

export default EventCard;