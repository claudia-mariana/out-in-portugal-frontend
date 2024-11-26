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
    <h1>Let's Explore!</h1>
    <h2>{activities.length} Activities</h2>
      <Link to={"/api/activities/create"}>
        <button>+ Create Activity + </button>
      </Link>

      <div className="activities-container">
        {activities.map((activity) => (
        <ActivityCard key={activity._id} {...activity} />
      ))}
      </div>
      
    </>
  );
}

export default ActivitiesListPage;