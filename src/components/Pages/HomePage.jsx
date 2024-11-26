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
            <div class="relative">
                <img src={homepageBackground} class='w-full h-56 object-cover' alt="background" />

                <h1 class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-2xl md:text-4xl text-center px-4">
                    Explore the amazing outdoor activities happening in Portugal
                </h1>
            </div>

            <div>
                <div class="mt-8 text-center">
                    <h2 class="text-xl font-semibold mb-6">Explore Categories</h2>
                    <div class="grid grid-cols-2 md:grid-cols-3 gap-4 px-4">
                        {categories.map((category) => (
                            <NavLink
                                key={category}
                                to={`/api/activities/category/${category}`}
                                className="relative block overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                            >
                                <img
                                    src={categoryImage[category]}
                                    class="w-full h-48 object-cover"
                                    alt={`${category} category`}
                                />
                                <div class="absolute bottom-0 left-0 right-0 bg-blue bg-opacity-50 text-white text-center py-1">
                                    {category}
                                </div>
                            </NavLink>

                        ))}
                    </div>
                </div>


                <div class="mt-8 text-center">
                    <h2 class="text-xl font-semibold mb-6">Explore Events</h2>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 px-4">
                        {events.map((event) => (
                            <NavLink
                                key={event._id}
                                to={`/api/events/${event._id}`}
                                className="block p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                            >
                                {event.title}
                            </NavLink>
                        ))}
                    </div>
                    <NavLink to="/api/events">
                        <button class="mt-4 bg-blue-hover hover:bg-gray-light text-white py-2 px-4 rounded transition-colors">
                            See More
                        </button>
                    </NavLink>
                </div>
            </div>
        </>
    )
}


export default HomePage;