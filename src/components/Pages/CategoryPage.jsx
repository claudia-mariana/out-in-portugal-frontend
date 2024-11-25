import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import activitiesService from "../../services/activities.service";
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
        <div>
            <h1>{category} Activities</h1>
            <div>
                {activities.map((activity) => (
                    <div key={activity._id}>
                        <Link to={`/api/activities/${activity._id}`}>
                        <h2>{activity.title}</h2>
                        </Link>
                        <p>{activity.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CategoryPage;