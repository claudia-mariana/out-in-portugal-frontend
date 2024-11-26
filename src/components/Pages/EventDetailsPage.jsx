import { NavLink, useParams } from "react-router-dom";
import eventsService from "../../services/events.service";
import activitiesService from "../../services/activities.service";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { ArrowLeftIcon, MapPinIcon, TrashIcon } from '@heroicons/react/24/outline'

function EventDetailsPage() {
    const navigate = useNavigate();

    const { eventId } = useParams();
    const [event, setEvent] = useState(null);
    const { activityId } = useParams();
    const [activity, setActivity] = useState(null);

    useEffect(() => {
        eventsService.getEvent(eventId)
            .then((response) => setEvent(response.data))
            .catch((err) => console.log(err));
    }, [eventId]);

    useEffect(() => {
        activitiesService
            .getActivity(activityId)
            .then((response) => setActivity(response.data))
            .catch((err) => console.log(err));
    }, [activityId]);


    const deleteEvent = () => {
        eventsService.deleteEvent(eventId)
            .then(() => navigate("/api/events"))
            .catch(err => console.log(err));
    };




    return (
        <div>
            <div>
                <NavLink to={"/api/events"}>
                    <ArrowLeftIcon className="absolute w-[1.5vw] m-[2vw] text-blue" />
                </NavLink>
            </div>

            {event ?
                <>
                    <div className="flex flex-col items-center">

                        <div className="flex flex-col bg-gray-light w-[70vw] m-[2vw] shadow-lg rounded-md relative">

                            <button
                                onClick={() => {
                                    deleteEvent();
                                }}
                                className="absolute top-0 right-0 m-[2vw] cursor-pointer pointer-events-auto z-50"
                            >
                                <TrashIcon className="w-[1.5vw]" />
                            </button>

                            <div className="relative p-4 rounded-sm mt-5 ml-2">
                                <h3 className="font-bold text-4xl">
                                    {event.title}</h3>
                            </div>
                            <div className="whitespace-no-wrap p-4">
                                <p className="text-black text-base font-semibold inline-block mx-2 mb-10 ml-2">
                                    Activity:</p>
                                {event && event.activity &&
                                    <NavLink to={`/api/activities/${event.activity._id}`}>
                                        <p className="text-black text-base inline-block m-2 transition-transform transform hover:scale-110 hover:text-shadow-lg">{event.activity.title}</p>
                                    </NavLink>
                                }
                            </div>
                            <div className="flex gap-x-4">
                                <div className="w-1/2 p-4 ">
                                    <div className="whitespace-no-wrap my-5">
                                        <p className="text-black text-base font-semibold ml-2">
                                            Meeting Point:
                                        </p>
                                        <MapPinIcon className=" w-[1.5vw] text-blue inline-block ml-2" />
                                        <p className="text-black text-base m-2 inline-block">
                                            {event.meetingPoint}
                                        </p>
                                    </div>
                                    <div className="whitespace-no-wrap my-7">
                                        <p className="text-black text-base font-semibold ml-2">
                                            Hosted by:</p>
                                        <p className="text-black text-base m-2">
                                            {event.organization}</p>
                                    </div>
                                    <div className="whitespace-no-wrap my-7">
                                        <p className="text-black text-base font-semibold ml-2">
                                            Recommended for: </p>
                                        <p className="text-black text-base ml-2">
                                            {event.targetAudience}</p>
                                    </div>
                                    <div className="whitespace-no-wrap my-7">
                                        <p className="text-black text-base font-semibold inline-block ml-2">
                                            Please bring with you the following equipment: </p>
                                        <p className="text-black text-base ml-2">
                                            {event.equipment}</p>
                                    </div>

                                </div>
                                <div className="w-1/2 bg-blue-200 p-4">
                                    <div className="whitespace-no-wrap my-7 ">
                                        <p className="text-black text-base font-semibold ml-2">
                                            Price:</p>
                                        <p className="text-black text-base ml-2 ">
                                            {event.price}</p>
                                    </div>
                                    <div className="whitespace-no-wrap my-7">
                                        <p className="text-black text-base font-semibold ml-2">
                                            Start Date: </p>
                                        <p className="text-black text-base ml-2 ">
                                            {format(new Date(event.startDate), 'MMM do, yyyy')}</p>
                                        <p className="text-black text-base ml-2 ">
                                            {format(new Date(event.startDate), 'HH:mm')}h</p>
                                    </div>
                                    <div className="whitespace-no-wrap my-7">
                                        <p className="text-black text-base font-semibold ml-2">
                                            End Date: </p>
                                        <p className="text-black text-base ml-2">
                                            {format(new Date(event.endDate), 'MMM do, yyyy')} </p>
                                        <p className="text-black text-base ml-2">
                                            {format(new Date(event.endDate), 'HH:mm')}h </p>
                                    </div>
                                    <div className="whitespace-no-wrap my-7">
                                        <p className="text-black text-base font-semibold ml-2">
                                            Duration: </p>
                                        <p className="text-black text-base ml-2">
                                            {event.duration}</p>
                                    </div>

                                </div>
                            </div>
                            <div className="flex flex-row justify-center m-5">
                                <NavLink to={`/api/events/edit/${eventId}`}>
                                    <button className="bg-blue center text-white py-2 px-4 rounded-md shadow-md hover:transform hover:shadow-lg  hover:text-yellow">
                                        Edit Event</button>
                                </NavLink>

                            </div>
                        </div>
                    </div>
                </>
                :
                <h1>loading...</h1>
            }


        </div >
    );

}

export default EventDetailsPage;
