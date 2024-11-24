import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import activitiesService from "../../services/activities.service";

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
            <h1>Activities in {category}</h1>
            <div>
                {activities.map((activity) => (
                    <div key={activity._id}>
                        <h2>{activity.title}</h2>
                        <p>{activity.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CategoryPage;