import { NavLink, useNavigate } from "react-router-dom";
import eventsService from "../../services/events.service";
import { TrashIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { format } from 'date-fns';
import { useState, useEffect } from "react";

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Intl.DateTimeFormat('default', options).format(new Date(dateString));
}


function EventCard({ _id, title, meetingPoint, startDate, endDate, onDelete }) {
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
      return (
        <div className="max-w-lg mx-auto mt-10 bg-blue p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-6 text-center text-yellow">
                You need to log in to delete an event.
                <br></br>Redirecting...
            </h3>
        </div>
    );;
    }

    eventsService.deleteEvent(_id)
      .then(() => {
        onDelete(_id);
        navigate("/api/events")
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <NavLink to={`/api/events/${_id}`} className="block ">
        <div className="event-card flex flex-col items-center relative bg-gray-light w-[30vw] h-[30vh] m-[1vw] rounded-md shadow-md overflow-hidden p-0 cursor-pointer transition-shadow hover:transform hover:shadow-lg">

          <div className="content relative flex flex-col justify-end w-full pb-2 bottom-0">
            <h3 className="text-black text-xl font-semibold m-2">
              {title}
            </h3>

           <div>
              <p className="text-black text-base font-semibold ml-2">
                Meeting Point:
              </p>
              <MapPinIcon className=" w-[1vw] text-blue inline-block ml-2" />
              <p className="text-black text-base m-2 mb-5">
                {meetingPoint}
              </p>
              </div>
            
            <div>
              <p className="text-black text-base font-semibold ml-2 inline-block">
                Start Date:
              </p>
              <p className="text-black text-base ml-2 inline-block">
                {format(new Date(startDate), 'MMM do, yyyy')},</p>
              <p className="text-black text-base ml-2 inline-block">
                {format(new Date(startDate), 'HH:mm')}h</p>
                </div>
            <div>
              <p className="text-black text-base font-semibold ml-2 inline-block">
                End Date:
              </p>
              <p className="text-black text-base ml-2 inline-block">
                {format(new Date(endDate), 'MMM do, yyyy')}, </p>
              <p className="text-black text-base ml-2 inline-block">
                {format(new Date(endDate), 'HH:mm')}h
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