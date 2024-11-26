import { Link } from "react-router-dom";


function ActivityCard(activity) {

  return (
    <Link to={`/api/activities/${activity._id}`}>
      <div className="activity-card flex flex-col items-center relative bg-white w-[25vw] h-[10vh] m-[1vh] rounded-lg shadow-md hover:transform hover:-translate-y-1 hover:shadow-xl transition duration-300 overflow-hidden p-0 cursor-pointer">
        <img src={activity.imageUrl} alt={activity.title} className="w-full h-auto max-h-[70%] rounded-sm object-cover flex-grow" />
        <div className="content absolute flex flex-col items-center justify-end w-full pb-1 bottom-0">
          <h3 className="text-gray-800 my-[1vw] text-center text-lg">{activity.title}</h3>
          <p className="text-gray-800 my-[0.5vh] text-center mb-0 text-base">{activity.category}</p>
          <p className="text-gray-800 mb-0 text-center text-base">{activity.location}</p>
        </div>
      </div>
    </Link>
  );

}


export default ActivityCard;