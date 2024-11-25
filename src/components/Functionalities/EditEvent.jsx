import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import eventsService from "../../services/events.service";

const formatDate = (date) => new Date(date).toISOString().split('T')[0];

function EditEvent() {
    const [title, setTitle] = useState("");
    const [activity, setActivity] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [description, setDescription] = useState("");
    const [organization, setOrganization] = useState("");
    const [meetingPoint, setMeetingPoint] = useState("");
    const [targetAudience, setTargetAudience] = useState("");
    const [duration, setDuration] = useState(10);
    const [equipment, setEquipment] = useState("");
    const [price, setPrice] = useState(0);

    const [activities, setActivities] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5005/api/activities')
            .then(response => response.json())
            .then(data => setActivities(data))
            .catch(err => console.error('Error fetching activities:', err));
    }, []);

    const { eventId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {

        eventsService.getEvent(eventId)
            .then((response) => {
                const oneEvent = response.data;
                setTitle(oneEvent.title);
                setActivity(oneEvent.activity._id);
                setStartDate(formatDate(oneEvent.startDate));
                setEndDate(formatDate(oneEvent.endDate));
                setDescription(oneEvent.description);
                setOrganization(oneEvent.organization);
                setMeetingPoint(oneEvent.meetingPoint);
                setTargetAudience(oneEvent.targetAudience);
                setDuration(oneEvent.duration);
                setEquipment(oneEvent.equipment);
                setPrice(oneEvent.price);
            })
            .catch((error) => console.log(error));

    }, [eventId]);


    const handleFormSubmit = (e) => {
        e.preventDefault();
        const requestBody = { title, activity, startDate, endDate, description, organization, meetingPoint, targetAudience, duration, equipment, price };

        eventsService.updateEvent(eventId, requestBody)
            .then((response) => {
                navigate(`/api/events/${eventId}`)
            });
    };


    const deleteEvent = () => {

        eventsService.deleteEvent(eventId)
            .then(() => navigate("/api/events"))
            .catch((err) => console.log(err));
    };


    return (
        <div>
            <h3>Edit this Event:</h3>

            <form onSubmit={handleFormSubmit}>
                <label>Title:</label>
                <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <label>Activity:</label>
                <select
                    name="activityId"
                    value={activity}
                    onChange={(e) => setActivity(e.target.value)}
                    required
                >
                    <option hidden defaultValue value="">Select an activity</option>
                    {activities.map((activity) => (
                        <option key={activity._id} value={activity._id}>
                            {activity.title}
                        </option>
                    ))}
                </select>

                <label>Start Date:</label>
                <input
                    type="date"
                    name="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />

                <label>End Date:</label>
                <input
                    type="date"
                    name="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />

                <label>Description:</label>
                <textarea
                    type="text"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <label>Organization:</label>
                <textarea
                    type="text"
                    name="organization"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                />

                <label>Meeting Point:</label>
                <input
                    type="text"
                    name="meetingPoint"
                    value={meetingPoint}
                    onChange={(e) => setMeetingPoint(e.target.value)}
                />

                <label>Target Audience:</label>
                <select
                    name="targetAudience"
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                    required
                >
                    <option hidden defaultValue value="">Select an option</option>
                    <option value="Children">Children</option>
                    <option value="Adults">Adults</option>
                    <option value="Seniors">Seniors</option>
                    <option value="Everyone">Everyone</option>
                </select>

                <label>Duration:</label>
                <input
                    type="text"
                    name="duration"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                />

                <label>Equipment:</label>
                <input
                    type="text"
                    name="equipment"
                    value={equipment}
                    onChange={(e) => setEquipment(e.target.value)}
                />

                <label>Price(€):</label>
                <input
                    type="text"
                    name="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />

                <button type="submit">Save changes</button>
            </form>

            <button onClick={deleteEvent}>Delete Event</button>
            <NavLink to={"/api/events"}>
                <button>Back</button>
            </NavLink>

        </div>
    );
}

export default EditEvent;