import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import activitiesService from "../../services/activities.service";
import eventsService from "../../services/events.service";
import homepageBackground from "../images/homepageBackground.png"
import ActivityCard from "./ActivityCard";
import EventCard from "../Functionalities/EventCard";

const categories = ["Aquatic", "Mountain", "Forest", "Beach", "Urban", "Other"];

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
            <div>
                <img src={homepageBackground} className="logo" alt=" background" />

                <h1>Explore the amazing outdoor activities happening in Portugal</h1>
            </div>

            <div>
                <h2>Explore Categories</h2>
                <div className="categories-preview">
                    {categories.map((category) => (
                        <NavLink 
                        key={category}
                        to={`/activities?category=${category}`}> 
                        {category}
                        </NavLink>
                    ))}
                </div>
            </div>


            <div>
                <h2>Explore Events</h2>
                <div className="events-preview">
                    {events.map((event) => (
                        <EventCard key={event._id} {...event} />
                    ))}
                    <NavLink to="/api/events">
                        <button>See More</button>
                    </NavLink>
                </div>
            </div>

            <div>
                <h2>Create an Event</h2>
                <NavLink to="/api/events/create">
                    Create Event
                </NavLink>
            </div>
        </>
    )
}


export default HomePage;