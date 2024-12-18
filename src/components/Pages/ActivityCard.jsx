import { Link } from "react-router-dom";


function ActivityCard(activity) {
  return (
    <Link to={`/api/activities/${activity._id}`} className="block">
      <div className="activity-card w-screen flex flex-col items-center relative mt-6 bg-white sm:w-[25vw] h-[45vh] m-[1vw] rounded-md shadow-md overflow-hidden p-0 cursor-pointer transition-shadow hover:transform hover:-translate-y-1 hover:shadow-lg">
        <img
          src={activity.imageUrl}
          alt={activity.title}
          className="w-full h-[70%] object-cover"
        />
        <div>
          <span className="absolute top-2 left-2 text-blue bg-yellow text-left text-sm px-1 py-1 rounded-md">
            {activity.category}
          </span>
        </div>
        <div className="content relative flex flex-col justify-end w-full pb-0 bottom-0">
          <h3 className="text-blue-medium text-center text-3xl mt-5 font-semibold">
            {activity.title}
          </h3>
        </div>
      </div>
    </Link>
  );
}

export default ActivityCard;