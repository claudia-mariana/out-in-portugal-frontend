import { useState } from "react";
import activitiesService from "../../services/activities.service";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

function CreateActivity() {
  const navigate = useNavigate()

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  // const [location, setLocation] = useState("");
  //const [events, setEvents] = useState({});
  const [imageUrl, setImageUrl] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = { 
      title, 
      description, 
      category, 
      // location, 
      imageUrl 
    };

    activitiesService.createActivity(requestBody)
      .then(() => {
        setTitle("");
        setDescription("");
        setCategory("");
        // setLocation("");
        // setEvents({});
        setImageUrl("");
        navigate("/api/activities")
      })
      .catch((error) => console.log(error));
  };


  return (
    <div>
      <div>
        <NavLink to={"/api/activities"}>
          <ArrowLeftIcon className="absolute w-[1.5vw] m-[2vw] text-blue" />
        </NavLink>
      </div>
      <div className="max-w-lg mx-auto mt-10 mb-10 bg-blue-light p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-bold mb-6 text-center text-blue-medium">Create Activity</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-blue-medium">(*) Title:</label>
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
            <label className="block text-blue-medium">Description:</label>
            <textarea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-light rounded-md"
              rows="3"
            />
          </div>

          <div>
            <label className="block text-blue-medium">Category:</label>
            <select
              required
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 border border-gray-light rounded-md"
            >
              <option hidden defaultValue value="">Select an option</option>
              <option value="Aquatic">Aquatic</option>
              <option value="Mountain">Mountain</option>
              <option value="Forest">Forest</option>
              <option value="Beach">Beach</option>
              <option value="Urban">Urban</option>
              <option value="Other">Other</option>
            </select>
          </div>

        {/* <div>
          <label className="block text-blue-medium">(*) Location:</label>
          <input
            type="text"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-2 border border-gray-light rounded-md"
            required
          />
        </div> */}

        <div>
          <label className="block text-blue-medium">(*) Image URL:</label>
          <input
            type="text" // Corrected type from "image URL" to "text"
            name="image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full p-2 border border-gray-light rounded-md"
            required
          />
        </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-medium text-white py-2 px-4  m-1 rounded-md hover:text-yellow transition-colors"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div >
  );
}

export default CreateActivity;