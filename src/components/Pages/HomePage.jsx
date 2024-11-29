import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import eventsService from "../../services/events.service";
import homepageBackground from "../images/homepageBackground.png"
import aquatic from "../images/aquatic.jpg"
import beach from "../images/beach.jpg";
import forest from "../images/forest.jpg";
import mountain from "../images/mountain.png";
import urban from "../images/urban.jpg";
import other from "../images/other.png";
import { format } from 'date-fns';

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

                <h1 
  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-extrabold text-2xl md:text-4xl text-center w-11/12 sm:w-3/4 md:w-auto leading-tight"
  style={{
                    textShadow: '40 0 0px #535269, 40 0 0px #535269',
                  }}
                >
               
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 w-full md:w-2/3">
                        {events.map((event) => (
                            <NavLink
                                key={event._id}
                                to={`/api/events/${event._id}`}
                                className="block w-full p-4 bg-gray-light text-blue hover:text-opacity-70 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                            >
                                <p className="text-center font-bold">{event.title}</p>
                                <p className="mt-2 text-center">
                                    {format(new Date(event.startDate), 'MMM do, yyyy')}
                                </p>
                                <p className="mt-2 text-center">
                                    {format(new Date(event.startDate), 'HH:mm')}h
                                </p>
                            </NavLink>
                        ))}
                    </div>

                    <NavLink to="/api/events">
                        <button className="mt-10 mb-10 bg-blue-medium hover:text-yellow text-white py-2 px-4 rounded transition-colors mb-32">
                            See More
                        </button>
                    </NavLink>
                </div>
            </div>
        </>
    )
}


export default HomePage;