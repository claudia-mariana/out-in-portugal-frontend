import { useState } from "react";
import eventsService from "../../services/events.service";
import { useEffect } from "react";

function CreateEvent() {
  const [title, setTitle] = useState("");
  const [activity, setActivity] = useState({});
  const [startDate, setStartDate] = useState("YYYY-MM-DD");
  const [endDate, setEndDate] = useState("YYYY-MM-DD");
  const [description, setDescription] = useState("");
  const [organization, setOrganization] = useState("");
  const [meetingPoint, setMeetingPoint] = useState("");
  const [targetAudience, setTargetAudience] = useState({});
  const [duration, setDuration] = useState(1);
  const [equipment, setEquipment] = useState("");
  const [price, setPrice] = useState(0);


  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = { title, activity, startDate, endDate, description, organization, meetingPoint, targetAudience, duration, equipment, price };

    eventsService.createEvent(requestBody)
      .then(() => {
        setTitle("");
        setActivity({});
        setStartDate(date.now);
        setEndDate(date.now)
        setDescription("");
        setOrganization("");
        setMeetingPoint("");
        setTargetAudience({});
        setDuration(1);
        setEquipment("");
        setPrice(0);
      })
      .catch((error) => console.log(error));
  };


  return (
    <div>
      <h3>Create Event</h3>

      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {/*ideally this shoul be a select input, to choose between existing activities on DB */}
        <label>Activity:</label>
        <input
          type="text"
          name="activityId"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
        />

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
        <select required onChange={(e) => setTargetAudience(e.target.value)}>
            <option hidden defaultValue value="">Select an option</option>
            <option value="Children">Children</option>
            <option value="Adults">Adults</option>
            <option value="Seniors">Seniors</option>
            <option value="Everyone">Everyone</option>
        </select>

        <label>Duration:</label>
        <input
          type="number"
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

        <label>Price:</label>
        <input
          type="number"
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreateEvent;