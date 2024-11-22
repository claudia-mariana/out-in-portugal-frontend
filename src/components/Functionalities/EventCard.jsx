import { Link, Navigate } from "react-router-dom";
import eventsService from "../../services/events.service";

function EventCard(event) {

const deleteEvent = () => {

    eventsService.deleteEvent(eventId)        
        .then(() => Navigate("/api/events"))
        .catch((err) => console.log(err));
    };  

  return (
    <div>
      <Link to={`/events/${event.id}`}>
        <h3>{event.title}</h3>
      </Link>
      <p>{event.category}</p>
      <p>{event.description}</p>
      <button onClick={deleteEvent}>Delete Event</button>
    </div>
  );

}

export default EventCard;



/*

  

*/