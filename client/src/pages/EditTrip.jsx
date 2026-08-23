import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditTrip() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(true);

  // Get existing trip
  useEffect(() => {
    const getTrip = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `http://localhost:5000/api/trips/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const trip = response.data.trip;

        setTitle(trip.title);
        setDestination(trip.destination);
        setStartDate(trip.startDate.split("T")[0]);
        setEndDate(trip.endDate.split("T")[0]);
        setDescription(trip.description || "");

        setLoading(false);

      } catch (error) {
        console.log("Error loading trip:", error);
        setLoading(false);
      }
    };

    getTrip();
  }, [id]);

  // Update trip
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (new Date(endDate) < new Date(startDate)) {
      alert("End date cannot be before start date");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `http://localhost:5000/api/trips/${id}`,
        {
          title,
          destination,
          startDate,
          endDate,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);

      navigate(`/trip/${id}`);

    } catch (error) {
      console.log("Update trip error:", error);

      alert(
        error.response?.data?.message || "Failed to update trip"
      );
    }
  };

  if (loading) {
    return <p className="loading">Loading trip...</p>;
  }

  return (
    <div className="create-trip-page">

      <div className="create-trip-card">

        <div className="create-trip-header">

          <p className="small-heading">
            UPDATE YOUR JOURNEY
          </p>

          <h1>Edit Trip</h1>

          <p>
            Update the details of your travel memory.
          </p>

        </div>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Trip Title</label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Destination</label>

            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              required
            />
          </div>

          <div className="date-row">

            <div className="form-group">
              <label>Start Date</label>

              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>End Date</label>

              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>

          </div>

          <div className="form-group">
            <label>Description</label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="5"
            />
          </div>

          <button
            type="submit"
            className="create-trip-button"
          >
            Save Changes
          </button>

        </form>

      </div>

    </div>
  );
}

export default EditTrip;