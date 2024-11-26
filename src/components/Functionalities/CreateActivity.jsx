import { useState } from "react";
import activitiesService from "../../services/activities.service";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CreateActivity() {
  const navigate = useNavigate()
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  //const [events, setEvents] = useState({});
  const [imageUrl, setImageUrl] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = { title, description, category, location, imageUrl };

    activitiesService.createActivity(requestBody)
      .then(() => {
        setTitle("");
        setDescription("");
        setCategory("");
        setLocation("");
        setEvents({});
        setImageUrl("");
        navigate("/api/activities")
      })
      .catch((error) => console.log(error));
  };


  return (
    <div className="CreateActivity">
      <h3>Create Activity</h3>

      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Description:</label>
        <textarea
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>Category:</label>
        <select required onChange={(e) => setCategory(e.target.value)}>
            <option hidden defaultValue value="">Select an option</option>
            <option value="Aquatic">Aquatic</option>
            <option value="Mountain">Mountain</option>
            <option value="Forest">Forest</option>
            <option value="Beach">Beach</option>
            <option value="Urban">Urban</option>
            <option value="Other">Other</option>
        </select>

        <label>Location:</label>
        <input
          type="text"
          name="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        {/* <label>Events:</label>
        <input
          type="text"
          name="events"
          value={events}
          onChange={(e) => setEvents(e.target.value)}
        /> */}

        <label>Image URL:</label>
        <input
          type="image URL"
          name="image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreateActivity;