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
    <h1 className="text-center w-screen my-10 text-5xl font-bold text-blue-medium ">Let's Explore!</h1>
    
    <div className="activities-container overflow-hidden flex flex-col sm:flex-row flex-wrap justify-center items-center w-full my-10">
    {activities.toReversed().map((activity) => (
        <ActivityCard key={activity._id} {...activity} />
      ))}
      </div>
      <div className="flex justify-center">
      <Link to={"/api/activities/create"}>
        <button className="bg-blue center text-white py-2 px-4 rounded-md shadow-md  hover:text-yellow mb-32"> 
          Create Activity </button>
      </Link>
      </div>
      
    </>
  );
}

export default ActivitiesListPage;