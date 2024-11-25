import { NavLink, useParams } from "react-router-dom";
import activitiesService from "../../services/activities.service";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

function ActivityDetailsPage() {

    const { activityId } = useParams();
    const [activity, setActivity] = useState(null);

    useEffect(() => {
        activitiesService
            .getActivity(activityId)
            .then((response) => setActivity(response.data))
            .catch((err) => console.log(err));
    }, [activityId]);


    //const deleteActivity = () => {
    //        .deleteActivity(activityId)
    //       .then(() => <Navigate to="/api/events" />)
    //       .catch((err) => console.log(err));
    // };

    return (
        <div>
            {activity ? (
                <>
                    <NavLink to={`/api/activities/activityCard`}>
                        <img src={activity.imageUrl} alt={activity.title} />
                        <h3>{activity.title}</h3>
                        <p>Description: {activity.description}</p>
                        <p>Category: {activity.category}</p>
                        <p>Location: {activity.location}</p>
                    </NavLink>

                    <h4>Events:</h4>
                    {activity.events && activity.events.length > 0 ? (
                        activity.events.map((event) => (
                            <div key={event._id}>
                                <NavLink to={`/api/events/${event._id}`}>
                                    <h5>{event.title}</h5>
                                </NavLink>
                                <p>{event.description}</p>
                                <p>Date: {event.date}</p>
                            </div>
                        ))
                    ) : (
                        <p>No events found for this activity.</p>
                    )}

                   {/* <button onClick={deleteActivity}>Delete Activity</button>*/}
                </>
            ) : (
            <h1>Loading...</h1>
        )}
        </div>
    );
}


export default ActivityDetailsPage;