import { Link } from "react-router-dom";


function ActivityCard(activity) {

  return (
    <Link to={`/api/activities/${activity._id}`}>
    <div className="activity-card">
      <img src={activity.imageUrl} alt={activity.title} />
        <h3>{activity.title}</h3>
      <p>{activity.category}</p>
      <p>{activity.location}</p>
    </div>
    </Link>
  );

}


export default ActivityCard;