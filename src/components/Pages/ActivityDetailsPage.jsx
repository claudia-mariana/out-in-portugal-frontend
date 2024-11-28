import { NavLink, useNavigate, useParams } from "react-router-dom";
import activitiesService from "../../services/activities.service";
import { useState, useEffect } from "react";
import { ArrowLeftIcon, MapPinIcon } from '@heroicons/react/24/outline'
import { format } from 'date-fns';


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
      <div>
        <NavLink to={"/api/activities"}>
          <ArrowLeftIcon className="absolute w-[1.5vw] m-[2vw] text-blue" />
        </NavLink>
      </div>

      {activity ? (
        <>
          <div className="flex justify-center">
            <div className="flex flex-col items-center bg-white w-[70vw] m-[2vw] shadow-md">
              <NavLink to={`/api/activities/activityCard`} className="w-full">
                <div className="relative">
                  <img
                    src={activity.imageUrl}
                    alt={activity.title}
                    className="w-full h-[70vh] object-cover rounded-t-md"
                  />
                  <div className="relative left-3 p-2 rounded-sm my-5">
                    <h3 className="font-bold text-4xl">{activity.title}</h3>
                  </div>
                </div>
              </NavLink>
              <div className="relative flex flex-col w-full left-3 ">

                <div className="whitespace-no-wrap my-5">
                  <p className="text-black text-base font-semibold inline-block m-2">
                    Category:
                  </p>
                  <span className="text-black bg-yellow text-base px-1 py-1 rounded-md">
                    {activity.category}
                  </span>

                  <div className="whitespace-no-wrap my-5">
                    <p className="text-black text-base font-semibold m-2">
                      Location:
                    </p>
                    <MapPinIcon className=" w-[1.5vw] text-blue inline-block m-2" />
                    <p className="text-black text-base m-2 inline-block">
                      {activity.location}
                    </p>
                  </div>

                  <div className="whitespace-no-wrap my-5">
                    <p className="text-black text-base font-semibold m-2">
                      Description:
                    </p>
                    <p className="text-black text-base m-2">
                      {activity.description}
                    </p>
                  </div>

                </div>

                <div className="whitespace-no-wrap ">
                  <h4 className="text-black text-xl font-semibold mb-5">
                    Events:
                  </h4>
                </div>
                <div className="flex-grow whitespace-nowrap">
                  {activity.events && activity.events.length > 0 ? (
                    activity.events.map((event) => (
                      <div
                        key={event._id}
                        className="whitespace-no-wrap">
                        <NavLink
                          to={`/api/events/${event._id}`} className="block w-full md:w-auto p-2 bg-gray-light text-blue  hover:text-opacity-70 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                        >
                          <h4 className="m-2 font-bold text-l">{event.title}</h4>

                          <p className="text-black m-2">{event.description}</p>
                          <p className="text-black m-2">Date: {event.startDate}</p>
                        </NavLink>
                      </div>
                    ))
                  ) : (
                    <p className="text-black text-base inline-block m-3">
                      No events found for this activity.
                    </p>
                  )}
                  <div className="flex mt-10 mb-20">
                    <NavLink to={"/api/events/create"}>
                      <button className="bg-blue center text-white text-sm py-2 px-4 rounded-md shadow-md hover:transform  hover:text-yellow"> 
                        Create Event </button>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center h-screen">
            <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
            <p className="ml-4">Loading...</p>
          </div>
      )}


    </div>
  );
}

export default ActivityDetailsPage;