import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import eventsService from "../../services/events.service";
import { ArrowLeftIcon } from "@heroicons/react/24/outline"; 

const formatDate = (date) => new Date(date).toISOString().split('T')[0];
const formatTime = (date) => new Date(date).toISOString().split('T')[1].substring(0, 5);

function EditEvent() {
  const [title, setTitle] = useState("");
  const [activity, setActivity] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [description, setDescription] = useState("");
  const [organization, setOrganization] = useState("");
  const [meetingPoint, setMeetingPoint] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [duration, setDuration] = useState(10);
  const [equipment, setEquipment] = useState("");
  const [price, setPrice] = useState(0);

  const [activities, setActivities] = useState([]);
  const [redirecting, setRedirecting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const { eventId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/activities`)
      .then(response => response.json())
      .then(data => setActivities(data))
      .catch(err => console.error('Error fetching activities:', err));
  }, []);

  useEffect(() => {
    eventsService.getEvent(eventId)
      .then((response) => {
        const oneEvent = response.data;
        setTitle(oneEvent.title);
        setActivity(oneEvent.activity._id);
        setStartDate(formatDate(oneEvent.startDate));
        setStartTime(formatTime(oneEvent.startDate));
        setEndDate(formatDate(oneEvent.endDate));
        setEndTime(formatTime(oneEvent.endDate));
        setDescription(oneEvent.description);
        setOrganization(oneEvent.organization);
        setMeetingPoint(oneEvent.meetingPoint);
        setTargetAudience(oneEvent.targetAudience);
        setDuration(oneEvent.duration);
        setEquipment(oneEvent.equipment);
        setPrice(oneEvent.price);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [eventId]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token && !redirecting) {
      setRedirecting(true);
      setTimeout(() => {
        navigate("/auth/login", { replace: true });
      }, 4000);
      setIsAuthenticated(false);
    }
  }, [navigate, redirecting]);


  const handleFormSubmit = (e) => {
    e.preventDefault();

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

    eventsService.updateEvent(eventId, requestBody)
      .then((response) => {
        navigate(`/api/events/${eventId}`);
      });
  };

  const deleteEvent = () => {
    eventsService.deleteEvent(eventId)
      .then(() => navigate("/api/events"))
      .catch((err) => console.log(err));
  };

  // Loading spinner
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        <p className="ml-4">Loading...</p>
      </div>
    );
  }

  // Not authenticated message
  if (!isAuthenticated) {
    return (
      <div className="max-w-lg mx-auto mt-10 bg-blue p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-bold mb-6 text-center text-yellow">
          You need to log in to edit an event. <br />Redirecting...
        </h3>
      </div>
    );
  }

  return (
    <div>
      <div>
        <NavLink to={`/api/events/${eventId}`}>
          <ArrowLeftIcon className="absolute w-[1.5vw] m-[2vw] text-blue" />
        </NavLink>
      </div>

      <div className="max-w-lg mx-auto mt-10 mb-10 bg-blue-light p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-bold mb-6 text-center text-blue-medium">Edit this Event:</h3>

        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label className="block text-blue">(*) Title:</label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-light rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-blue">(*) Activity:</label>
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
            <label className="block text-blue">(*) Start Date:</label>
            <input
              type="date"
              name="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-2 border border-gray-light rounded-md"
              required
              min="1000-01-01"
              max="9999-12-31"
            />
          </div>

          <div>
            <label className="block text-blue">(*) Start Time:</label>
            <input
              type="time"
              name="startTime"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full p-2 border border-gray-light rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-blue">(*) End Date:</label>
            <input
              type="date"
              name="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full p-2 border border-gray-light rounded-md"
              required
              min="1000-01-01"
              max="9999-12-31"
            />
          </div>

          <div>
            <label className="block text-blue">(*) End Time:</label>
            <input
              type="time"
              name="endTime"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full p-2 border border-gray-light rounded-md"
              required
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
            <label className="block text-blue">(*) Meeting Point:</label>
            <input
              type="text"
              name="meetingPoint"
              value={meetingPoint}
              onChange={(e) => setMeetingPoint(e.target.value)}
              className="w-full p-2 border border-gray-light rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-blue">(*) Target Audience:</label>
            <select
              name="targetAudience"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              required
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
              Save Changes
            </button>
          </div>
        </form>

        <div className="flex justify-center space-x-4 mt-6">
          <button
            onClick={deleteEvent}
            className="bg-red text-white px-4 py-2 rounded-md hover:bg-yellow transition-colors"
          >
            Delete Event
          </button>

        </div>
      </div>
    </div>
  );
}

export default EditEvent;


