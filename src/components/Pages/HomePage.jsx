import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import activitiesService from "../../services/activities.service";
import eventsService from "../../services/events.service";
import homepageBackground from "../images/homepageBackground.png"
import ActivityCard from "./ActivityCard";
import EventCard from "../Functionalities/EventCard";
import aquatic from "../Images/aquatic.jpg"
import beach from "../images/beach.jpg";
import forest from "../images/forest.jpg";
import mountain from "../images/mountain.png";
import urban from "../images/urban.jpg";
import other from "../images/other.png";

const categories = ["Aquatic", "Mountain", "Forest", "Beach", "Urban", "Other"];

const categoryImage = {
    Aquatic: aquatic,
    Beach: beach,
    Forest: forest,
    Mountain: mountain,
    Urban: urban,
    Other: other,
};


function HomePage() {
    const [events, setEvents] = useState([])

    const getEvents = () => {
        eventsService
            .getAllEvents()
            .then((response) => {
                setEvents(response.data.slice(0, 6));
            })
            .catch((error) => console.log(error));
    };



    useEffect(() => {
        getEvents();
    }, []);


    return (
        <>
            <div className="relative">
                <img src={homepageBackground} className='w-full h-80 object-cover object-top' alt="background" />

                <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-2xl md:text-4xl text-center px-4">
                    Explore the amazing outdoor activities happening in Portugal
                </h1>
            </div>

            <div>
                <div className="mt-20 text-center">
                    <div className="flex flex-wrap justify-center items-center gap-8 px-4">
                        {categories.map((category) => (
                            <NavLink
                                key={category}
                                to={`/api/activities/category/${category}`}
                                className="relative block overflow-hidden rounded-full shadow-lg hover:shadow-xl transition-shadow"
                            >
                                <img
                                    src={categoryImage[category]}
                                    className="w-[9rem] h-[9rem] md:w-[10rem] md:h-[10rem] object-cover rounded-full"
                                    alt={`${category} category`}
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-blue bg-opacity-100 text-yellow text-center py-1 rounded-b-full">
                                    {category}
                                </div>
                            </NavLink>
                        ))}
                    </div>
                </div>


                <div className="mt-20 flex flex-col items-center">
                    <h2 className="text-xl font-semibold mb-6 text-center text-blue">Next events:</h2>
                    <div className="flex flex-col justify-center w-full md:w-1/3 gap-4 px-4">
                        {events.map((event) => (
                            <NavLink
                                key={event._id}
                                to={`/api/events/${event._id}`}
                                className="block w-full md:w-auto p-4 bg-gray-light text-blue  hover:text-opacity-70 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                            >
                                <p className="text-center">{event.title}</p>
                                <p className="mt-2 text-center">{event.startDate}</p>
                            </NavLink>
                        ))}
                    </div>
                    <NavLink to="/api/events">
                        <button className="mt-4 mb-4 bg-blue-medium hover:text-yellow text-white py-2 px-4 rounded transition-colors">
                            See More
                        </button>
                    </NavLink>
                </div>
            </div>
        </>
    )
}


export default HomePage;