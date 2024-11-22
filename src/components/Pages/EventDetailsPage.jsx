import { Navigate, NavLink, useParams } from "react-router-dom";
import eventsService from "../../services/events.service";
import { useState, useEffect } from "react";

function EventDetailsPage() {

    const { eventId } = useParams();
    const [event, setEvent] = useState(null);

    useEffect(() => {
        eventsService.getEvent(eventId)
            .then((response) => setEvent(response.data))
            .catch((err) => console.log(err));
    }, [eventId]);


    const deleteEvent = () => {

        eventsService.deleteEvent(eventId)
            .then(() => <Navigate to="/api/events" />)
            .catch((err) => console.log(err));
    };



    return (
        <div>
            {event ?
                <>
                    <h3>{event.title}</h3>
                    <p>Related to the activity: {event.activity.title}</p>
                    <p>Price: {event.price}</p>
                    <p>Meeting Point: {event.meetingPoint}</p>
                    <p>Start Date: {event.startDate}</p>
                    <p>End Date: {event.endDate}</p>
                    <p>Duration: {event.duration}</p>
                    <p>Hosted by: {event.organization}</p>
                    <p>Recommended for: {event.targetAudience}</p>
                    <p>Please bring with you the following equipment: {event.equipment}</p>

                    <NavLink to={`/api/events/edit/${eventId}`}>
                        <button>Edit Event</button>
                    </NavLink>
                    <button onClick={deleteEvent}>Delete Event</button>
                </>
                :
                <h1>loading...</h1>}

        </div>
    );

}

export default EventDetailsPage;
