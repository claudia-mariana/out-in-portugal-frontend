import { Link } from "react-router-dom";


function ActivityCard(activity) {

  return (
    <div>
      <Link to={`/api/activities/${activity._id}`}>
      <img src={activity.imageUrl} alt={activity.title} />
        <h3>{activity.title}</h3>
      </Link>
      <p>{activity.category}</p>
      <p>{activity.location}</p>
    </div>
  );

}


export default ActivityCard;