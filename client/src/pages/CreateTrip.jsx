import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateTrip() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    destination: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/api/trips",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Trip created:", response.data);

      navigate("/dashboard");
    } catch (error) {
      console.log("Error creating trip:", error);

      setError(
        error.response?.data?.message ||
          "Unable to create trip. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-trip-page">

      <div className="create-trip-card">

        {/* HEADER */}

        <div className="create-trip-header">

          <p className="small-heading">
            YOUR NEXT ADVENTURE
          </p>

          <h1>
            Create a Trip ✈️
          </h1>

          <p>
            Save the details of your journey and
            keep your travel memories organized.
          </p>

        </div>


        {/* ERROR */}

        {error && (
          <div className="form-error">
            ⚠️ {error}
          </div>
        )}


        {/* FORM */}

        <form onSubmit={handleSubmit}>

          {/* TITLE */}

          <div className="form-group">

            <label htmlFor="title">
              Trip Title
            </label>

            <input
              id="title"
              type="text"
              name="title"
              placeholder="e.g. Goa Beach Trip"
              value={formData.title}
              onChange={handleChange}
              required
            />

          </div>


          {/* DESTINATION */}

          <div className="form-group">

            <label htmlFor="destination">
              Destination
            </label>

            <input
              id="destination"
              type="text"
              name="destination"
              placeholder="e.g. Goa, India"
              value={formData.destination}
              onChange={handleChange}
              required
            />

          </div>


          {/* DATES */}

          <div className="date-row">

            <div className="form-group">

              <label htmlFor="startDate">
                Start Date
              </label>

              <input
                id="startDate"
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
              />

            </div>


            <div className="form-group">

              <label htmlFor="endDate">
                End Date
              </label>

              <input
                id="endDate"
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
              />

            </div>

          </div>


          {/* DESCRIPTION */}

          <div className="form-group">

            <label htmlFor="description">
              Description
            </label>

            <textarea
              id="description"
              name="description"
              placeholder="Tell us about your trip..."
              value={formData.description}
              onChange={handleChange}
              rows="5"
            />

          </div>


          {/* BUTTON */}

          <button
            type="submit"
            className="create-trip-button"
            disabled={loading}
          >
            {loading
              ? "Creating Trip..."
              : "Create Trip →"}
          </button>

        </form>


        {/* BACK */}

        <button
          type="button"
          className="cancel-button"
          onClick={() => navigate("/dashboard")}
        >
          ← Back to Dashboard
        </button>

      </div>

    </div>
  );
}

export default CreateTrip;