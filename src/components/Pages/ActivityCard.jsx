import { Link } from "react-router-dom";


function ActivityCard(activity) {

  return (
    <div>
      <Link to={`/activities/${activity.id}`}>
        <h3>{activity.title}</h3>
      </Link>
      <p>{activity.description}</p>
    </div>
  );

}


export default ActivityCard;