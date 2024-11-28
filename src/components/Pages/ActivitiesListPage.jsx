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
    <h1 className="text-center my-10 text-5xl font-bold">Let's Explore!</h1>
    <div className="flex justify-center">
      <Link to={"/api/activities/create"}>
        <button className="bg-blue center text-white py-2 px-4 rounded-md shadow-md  hover:text-yellow"> 
          Create Activity </button>
      </Link>
      </div>
      <div className="activities-container flex flex-wrap justify-center items-center w-full my-10">
        {activities.toReversed().map((activity) => (
        <ActivityCard key={activity._id} {...activity} />
      ))}
      </div>
      
    </>
  );
}

export default ActivitiesListPage;