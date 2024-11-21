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
    <div className="ActivitiesListPage">

      <Link to={"/api/activities/create"}>
        <button>+ Create Activity + </button>
      </Link>

      {activities.map((activity) => (
        <ActivityCard key={activity._id} {...activity} />
      ))}
    </div>
  );
}

export default ActivitiesListPage;