import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function TripDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [trip, setTrip] = useState(null);

  const [loading, setLoading] = useState(true);


  // =========================
  // GET SINGLE TRIP
  // =========================

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

        setTrip(response.data.trip);

      } catch (error) {

        console.log(
          "Error fetching trip:",
          error
        );

      } finally {

        setLoading(false);

      }
    };

    getTrip();

  }, [id]);


  // =========================
  // LOADING
  // =========================

  if (loading) {

    return (
      <p className="loading">
        Loading trip...
      </p>
    );

  }


  // =========================
  // TRIP NOT FOUND
  // =========================

  if (!trip) {

    return (
      <div className="trip-error-page">

        <div className="trip-error-card">

          <div className="error-icon">
            😕
          </div>

          <h2>
            Trip not found
          </h2>

          <p>
            We couldn't find this trip.
            It may have been deleted or
            you may not have access to it.
          </p>

          <button
            className="create-button"
            onClick={() =>
              navigate("/dashboard")
            }
          >
            Back to Dashboard
          </button>

        </div>

      </div>
    );

  }


  // =========================
  // FORMAT DATE
  // =========================

  const formatDate = (date) => {

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );

  };


  // =========================
  // DELETE TRIP
  // =========================

  const deleteTrip = async () => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this trip?"
    );

    if (!confirmDelete) {
      return;
    }


    try {

      const token =
        localStorage.getItem("token");


      await axios.delete(
        `http://localhost:5000/api/trips/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );


      alert(
        "Trip deleted successfully"
      );


      navigate("/dashboard");


    } catch (error) {

      console.log(
        "Error deleting trip:",
        error
      );


      alert(
        error.response?.data?.message ||
        "Failed to delete trip"
      );

    }

  };


  // =========================
  // UI
  // =========================

  return (

    <div className="trip-details-page">


      {/* BACK BUTTON */}

      <button
        className="back-button"
        onClick={() =>
          navigate("/dashboard")
        }
      >
        ← Back to Trips
      </button>



      {/* =========================
          HERO
      ========================= */}

      <section className="trip-details-hero">

        <div className="trip-details-hero-overlay">
        </div>


        <div className="trip-details-hero-content">

          <span className="trip-details-location">
            📍 {trip.destination}
          </span>


          <h1>
            {trip.title}
          </h1>


          <p>
            Your journey, your memories.
          </p>

        </div>

      </section>



      {/* =========================
          TRIP INFORMATION
      ========================= */}

      <section className="trip-info-grid">


        {/* START DATE */}

        <div className="trip-info-card">

          <div className="trip-info-icon">
            📅
          </div>


          <div>

            <span>
              START DATE
            </span>


            <strong>
              {formatDate(
                trip.startDate
              )}
            </strong>

          </div>

        </div>



        {/* END DATE */}

        <div className="trip-info-card">

          <div className="trip-info-icon coral">
            🏁
          </div>


          <div>

            <span>
              END DATE
            </span>


            <strong>
              {formatDate(
                trip.endDate
              )}
            </strong>

          </div>

        </div>



        {/* DESTINATION */}

        <div className="trip-info-card">

          <div className="trip-info-icon">
            📍
          </div>


          <div>

            <span>
              DESTINATION
            </span>


            <strong>
              {trip.destination}
            </strong>

          </div>

        </div>

      </section>



      {/* =========================
          MEMORY
      ========================= */}

      <section className="trip-memory-card">


        <div className="memory-heading">


          <div className="memory-icon">
            ✨
          </div>


          <div>

            <p className="small-heading">
              YOUR MEMORY
            </p>


            <h2>
              About this trip
            </h2>

          </div>

        </div>



        <p className="memory-description">

          {trip.description ||
            "No description added."}

        </p>

      </section>



      {/* =========================
          ACTION BUTTONS
      ========================= */}

      <div className="trip-details-actions">


        {/* EDIT */}

        <button
          className="create-button"
          onClick={() =>
            navigate(
              `/trip/${id}/edit`
            )
          }
        >
          ✏️ Edit Trip
        </button>



        {/* DELETE */}

        <button
          className="delete-button"
          onClick={deleteTrip}
        >
          🗑️ Delete Trip
        </button>


      </div>


    </div>

  );

}

export default TripDetails;