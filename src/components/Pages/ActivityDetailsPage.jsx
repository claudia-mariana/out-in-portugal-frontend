import { NavLink, useNavigate, useParams } from "react-router-dom";
import activitiesService from "../../services/activities.service";
import { useState, useEffect } from "react";

function ActivityDetailsPage() {

    const { activityId } = useParams();
    const [activity, setActivity] = useState(null);
    const navigate = useNavigate()

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
              <div className="flex justify-center">
                <div className="flex flex-col items-center bg-white w-[60vw] m-[1vw] rounded-md shadow-lg my-10 transition-shadow">
                  <NavLink to={`/api/activities/activityCard`} className="w-full">
                    <div className="relative">
                      <img
                        src={activity.imageUrl}
                        alt={activity.title}
                        className="w-full h-[60vh] object-cover rounded-t-md"
                      />
                      <div className="relative text-center bottom-3 left-3 p-2 rounded-sm m-3">
                        <h3 className="font-bold text-3xl">{activity.title}</h3>
                      </div>
                    </div>
                  </NavLink>
                  <div className="content flex flex-col justify-center w-full m-[1vw]">
                    <div className="whitespace-no-wrap mb-3">
                      <p className="text-black text-base font-semibold inline-block mx-1.5">
                        Description:
                      </p>
                      <p className="text-black text-base inline-block mx-1.5">
                        {activity.description}
                      </p>
                    </div>
                    <div className="whitespace-no-wrap mb-3">
                      <p className="text-black text-base font-semibold inline-block mx-1.5">
                        Category:
                      </p>
                      <p className="text-black text-base inline-block mx-1.5">
                        {activity.category}
                      </p>
                    </div>
                    <div className="whitespace-no-wrap mb-3">
                      <p className="text-black text-base font-semibold inline-block mx-1.5">
                        Location:
                      </p>
                      <p className="text-black text-base inline-block mx-1.5">
                        {activity.location}
                      </p>
                    </div>
                    <div className="flex items-center mt-5">
                      <h4 className="text-black text-xl font-semibold inline-block">
                        Events:
                      </h4>
                      <div className="flex-grow whitespace-nowrap">
                        {activity.events && activity.events.length > 0 ? (
                          activity.events.map((event) => (
                            <div key={event._id} className="inline-block mx-3">
                              <NavLink to={`/api/events/${event._id}`}>
                                <h5 className="inline-block">{event.title}</h5>
                              </NavLink>
                              <p className="inline-block">{event.description}</p>
                              <p className="inline-block">Date: {event.date}</p>
                            </div>
                          ))
                        ) : (
                          <p className="text-black text-base inline-block m-3">
                            No events found for this activity.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <h1>Loading...</h1>
          )}
        </div>
      );
    }
    
    export default ActivityDetailsPage;