import { useState, useEffect } from "react";
import eventsService from "../../services/events.service";
import { useNavigate } from "react-router-dom";

function CreateEvent() {
    const [activities, setActivities] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
      fetch(`${import.meta.env.VITE_API_URL}/api/activities`)
        .then(response => response.json())
        .then(data => setActivities(data))
        .catch(err => console.error('Error fetching activities:', err));
    }, []);

    const [title, setTitle] = useState("");
    const [activity, setActivity] = useState("");
    const [startDate, setStartDate] = useState("");
    const [startTime, setStartTime] = useState("");  // New state for start time
    const [endDate, setEndDate] = useState("");
    const [endTime, setEndTime] = useState("");      // New state for end time
    const [description, setDescription] = useState("");
    const [organization, setOrganization] = useState("");
    const [meetingPoint, setMeetingPoint] = useState("");
    const [targetAudience, setTargetAudience] = useState("");
    const [duration, setDuration] = useState("");
    const [equipment, setEquipment] = useState("");
    const [price, setPrice] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        // Combine date and time into a single datetime
        const startDateTime = `${startDate}T${startTime}`;
        const endDateTime = `${endDate}T${endTime}`;

        const requestBody = { 
            title, 
            activity, 
            startDate: startDateTime, 
            endDate: endDateTime, 
            description, 
            organization, 
            meetingPoint, 
            targetAudience, 
            duration, 
            equipment, 
            price 
        };

        eventsService.createEvent(requestBody)
            .then(() => {
                setTitle("");
                setActivity("");
                setStartDate("");
                setStartTime("");  // Reset time inputs
                setEndDate("");
                setEndTime("");    // Reset time inputs
                setDescription("");
                setOrganization("");
                setMeetingPoint("");
                setTargetAudience("");
                setDuration("");
                setEquipment("");
                setPrice("");
                navigate("/api/events");
            })
            .catch((error) => console.log(error));
    };

    return (
        <div className="max-w-lg mx-auto mt-10 mb-10 bg-blue-light p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-6 text-center text-blue-medium">Create Event</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-blue">Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 border border-gray-light rounded-md"
                    />
                </div>

                <div>
                    <label className="block text-blue">Activity:</label>
                    <select
                        name="activityId"
                        value={activity}
                        onChange={(e) => setActivity(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-light rounded-md"
                    >
                        <option hidden defaultValue value="">Select an activity</option>
                        {activities.map((activity) => (
                            <option key={activity._id} value={activity._id}>
                                {activity.title}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-blue">Start Date:</label>
                    <input
                        type="date"
                        name="startDate"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full p-2 border border-gray-light rounded-md"
                    />
                </div>

                <div>
                    <label className="block text-blue">Start Time:</label>
                    <input
                        type="time"
                        name="startTime"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="w-full p-2 border border-gray-light rounded-md"
                    />
                </div>

                <div>
                    <label className="block text-blue">End Date:</label>
                    <input
                        type="date"
                        name="endDate"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full p-2 border border-gray-light rounded-md"
                    />
                </div>

                <div>
                    <label className="block text-blue">End Time:</label>
                    <input
                        type="time"
                        name="endTime"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        className="w-full p-2 border border-gray-light rounded-md"
                    />
                </div>

                <div>
                    <label className="block text-blue">Description:</label>
                    <textarea
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 border border-gray-light rounded-md"
                        rows="3"
                    />
                </div>

                <div>
                    <label className="block text-blue">Organization:</label>
                    <textarea
                        name="organization"
                        value={organization}
                        onChange={(e) => setOrganization(e.target.value)}
                        className="w-full p-2 border border-gray-light rounded-md"
                        rows="2"
                    />
                </div>

                <div>
                    <label className="block text-blue">Meeting Point:</label>
                    <input
                        type="text"
                        name="meetingPoint"
                        value={meetingPoint}
                        onChange={(e) => setMeetingPoint(e.target.value)}
                        className="w-full p-2 border border-gray-light rounded-md"
                    />
                </div>

                <div>
                    <label className="block text-blue">Target Audience:</label>
                    <select
                        required
                        value={targetAudience}
                        onChange={(e) => setTargetAudience(e.target.value)}
                        className="w-full p-2 border border-gray-light rounded-md"
                    >
                        <option hidden defaultValue value="">Select an option</option>
                        <option value="Children">Children</option>
                        <option value="Adults">Adults</option>
                        <option value="Seniors">Seniors</option>
                        <option value="Everyone">Everyone</option>
                    </select>
                </div>

                <div>
                    <label className="block text-blue">Duration:</label>
                    <input
                        type="text"
                        name="duration"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="w-full p-2 border border-gray-light rounded-md"
                    />
                </div>

                <div>
                    <label className="block text-blue">Equipment:</label>
                    <input
                        type="text"
                        name="equipment"
                        value={equipment}
                        onChange={(e) => setEquipment(e.target.value)}
                        className="w-full p-2 border border-gray-light rounded-md"
                    />
                </div>

                <div>
                    <label className="block text-blue">Price (€):</label>
                    <input
                        type="text"
                        name="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full p-2 border border-gray-light rounded-md"
                    />
                </div>

                <div className="flex justify-center">
                    <button 
                        type="submit"
                        className="bg-blue-medium text-white py-2 px-4 rounded-md hover:text-yellow transition-colors"
                    >
                        Create
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreateEvent;