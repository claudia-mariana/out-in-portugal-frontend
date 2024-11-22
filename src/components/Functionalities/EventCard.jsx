import { Link, Navigate } from "react-router-dom";
import eventsService from "../../services/events.service";


const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Intl.DateTimeFormat('default', options).format(new Date(dateString));
}


function EventCard(event) {

const deleteEvent = () => {

    eventsService.deleteEvent(eventId)        
        .then(() => Navigate("/api/events"))
        .catch((err) => console.log(err));
    };  

  return (
    <div>
      <Link to={`/api/events/${event._id}`}>
        <h3>{event.title}</h3>
      </Link>
      <p>{event.meetingPoint}</p>
      <p>{formatDate(event.startDate)}</p>
      <p>{formatDate(event.endDate)}</p>
      <button onClick={deleteEvent}>Delete Event</button>
    </div>
  );

}

export default EventCard;
