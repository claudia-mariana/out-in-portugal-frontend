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
        setEndDate(formatDate(oneEvent.endDate));
        setDescription(oneEvent.description);
        setOrganization(oneEvent.organization);
        setMeetingPoint(oneEvent.meetingPoint);
        setTargetAudience(oneEvent.targetAudience);
        setDuration(oneEvent.duration);
        setEquipment(oneEvent.equipment);
        setPrice(oneEvent.price);
        setIsLoading(false); // Set loading state to false after data is fetched
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false); // Ensure loading is false even in case of error
      });
  }, [eventId]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token && !redirecting) {
      setRedirecting(true);
      setTimeout(() => {
        navigate("/auth/login", { replace: true });
      }, 2000);
      setIsAuthenticated(false);
    }
  }, [navigate, redirecting]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const requestBody = { title, activity, startDate, endDate, description, organization, meetingPoint, targetAudience, duration, equipment, price };

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
    <div className="max-w-lg mx-auto mt-10 bg-blue-light p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-bold mb-6 text-center text-blue-medium">Edit this Event:</h3>

      <form onSubmit={handleFormSubmit} className="space-y-4">
        {/* Form inputs here... */}
      </form>

      <div className="flex justify-center space-x-4 mt-6">
        <button
          onClick={deleteEvent}
          className="bg-red text-white px-4 py-2 rounded-md hover:bg-yellow transition-colors"
        >
          Delete Event
        </button>
        <NavLink to={"/api/events"}>
          <button className="bg-blue-medium text-white px-4 py-2 rounded-md hover:text-yellow transition-colors">
            Back
          </button>
        </NavLink>
      </div>
    </div>
  );
}

export default EditEvent;


