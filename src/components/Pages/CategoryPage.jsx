import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import activitiesService from "../../services/activities.service";
import ActivityCard from "./ActivityCard";
import { Link } from "react-router-dom";

function CategoryPage() {
    const { category } = useParams();
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        activitiesService
            .getActivitiesByCategory(category)
            .then((response) => setActivities(response.data))
            .catch((error) => console.log(error));
    }, [category]);

    return (
        <>
          <h1 className="text-center my-10 text-5xl font-bold">{category} Activities</h1>
          <div className="flex justify-center">
            <Link to={"/api/activities/create"}>
              <button className="bg-blue text-white py-2 px-4 rounded-md shadow-md hover:text-yellow">
                Create Activity
              </button>
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
    
    export default CategoryPage;