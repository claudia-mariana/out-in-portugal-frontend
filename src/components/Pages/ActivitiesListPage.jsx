import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ActivityCard from "./ActivityCard"
import activitiesService from "../../services/activities.service"


function ActivitiesListPage() {
  const [activities, setActivities] = useState([]);

  const getAllActivities = () => {
    activitiesService
      .getAllActivities()
      .then((response) => setActivities(response.data))
      .catch((error) => console.log(error));
  };


  useEffect(() => {
    getAllActivities();
  }, []);

  return (
    <>
    <h1 className="text-yellow-500">Let's Explore!</h1>
    <h2 className="text-xl my-4">{activities.length} Activities</h2>
      <Link to={"/api/activities/create"}>
        <button className="bg-[#28323D] text-white py-2 px-4 rounded-md hover:bg-[#0E1013]">+ Create Activity + </button>
      </Link>

      <div className="activities-container flex flex-wrap justify-center items-center w-full">
        {activities.map((activity) => (
        <ActivityCard key={activity._id} {...activity} />
      ))}
      </div>
      
    </>
  );
}

export default ActivitiesListPage;