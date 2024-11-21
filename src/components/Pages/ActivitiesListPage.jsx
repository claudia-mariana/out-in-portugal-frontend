import { useState, useEffect } from "react";
import ActivityCard from "../Functionalities/ActivityCard"
import activitiesService from "../../services/activities.service";


function ActivitiesListPage() {
  const [activities, setActivities] = useState([]);

  const getAllActivities = () => {
    activitiesService
      .getAllActivities()
      .then((response) => setActivities(response.data))
      .catch((error) => console.log(error));
  };

  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    getAllActivities();
  }, []);

  return (
    <div className="ActivitiesListPage">
        {/*falta o path do button para create activity*/}
      <button>+ Create Activity + </button>

      {activities.map((activity) => (
        <ActivityCard key={activity._id} {...activity} />
      ))}
    </div>
  );
}

export default ActivitiesListPage;