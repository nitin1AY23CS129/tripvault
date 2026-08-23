import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const token = localStorage.getItem("token");

        const userResponse = await axios.get(
          "http://localhost:5000/api/auth/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(userResponse.data);

        const tripsResponse = await axios.get(
          "http://localhost:5000/api/trips",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setTrips(tripsResponse.data.trips);
      } catch (error) {
        console.log("Error loading dashboard:", error);
      }
    };

    getData();
  }, []);

  if (!user) {
    return <p className="loading">Loading your journeys...</p>;
  }

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const openTrip = (id) => {
    window.location.href = `/trip/${id}`;
  };

  return (
    <div className="dashboard-page">

      {/* ========================================
          DASHBOARD HEADER
      ======================================== */}

      <section className="dashboard-header">

        <div className="dashboard-welcome">

          <p className="small-heading">
            WELCOME BACK
          </p>

          <h1>
            Welcome, {user.name}! 👋
          </h1>

          <p className="dashboard-subtitle">
            Keep your journeys and favorite memories
            in one beautiful place.
          </p>

        </div>


        <div className="dashboard-actions">

          <button
            className="create-button"
            onClick={() => {
              window.location.href = "/create-trip";
            }}
          >
            + Create Trip
          </button>

          <button
            className="logout-button"
            onClick={logout}
          >
            Logout
          </button>

        </div>

      </section>


      {/* ========================================
          STATS
      ======================================== */}

      <section className="dashboard-stats">

        <div className="stat-card stat-teal">

          <div className="stat-icon">
            🗺️
          </div>

          <div>
            <p>Total Trips</p>

            <h3>
              {trips.length}
            </h3>
          </div>

        </div>


        <div className="stat-card stat-coral">

          <div className="stat-icon">
            📍
          </div>

          <div>
            <p>Destinations</p>

            <h3>
              {
                new Set(
                  trips.map(
                    (trip) => trip.destination
                  )
                ).size
              }
            </h3>
          </div>

        </div>


        <div className="stat-card stat-purple">

          <div className="stat-icon">
            ✨
          </div>

          <div>
            <p>Memories</p>

            <h3>
              {trips.length}
            </h3>
          </div>

        </div>

      </section>


      {/* ========================================
          TRIPS SECTION
      ======================================== */}

      <section className="trips-section">

        <div className="section-heading">

          <div>

            <p className="small-heading">
              YOUR JOURNEYS
            </p>

            <h2>
              Your Trips
            </h2>

            <p>
              {trips.length}{" "}
              {trips.length === 1
                ? "trip"
                : "trips"}{" "}
              saved
            </p>

          </div>

        </div>


        {/* ======================================
            NO TRIPS
        ====================================== */}

        {trips.length === 0 ? (

          <div className="empty-state">

            <div className="empty-icon">
              ✈️
            </div>

            <h3>
              Your adventure starts here
            </h3>

            <p>
              Create your first trip and start
              building your personal travel journal.
            </p>

            <button
              className="create-button"
              onClick={() => {
                window.location.href =
                  "/create-trip";
              }}
            >
              Create Your First Trip
            </button>

          </div>

        ) : (

          /* ====================================
             TRIP GRID
          ==================================== */

          <div className="trip-grid">

            {trips.map((trip, index) => (

              <div
                className={`trip-card trip-card-${index % 3}`}
                key={trip._id}
                onClick={() =>
                  openTrip(trip._id)
                }
              >

                {/* CARD TOP */}

                <div className="trip-card-top">

                  <span className="trip-location">
                    📍 {trip.destination}
                  </span>

                  <span className="trip-arrow">
                    →
                  </span>

                </div>


                {/* TITLE */}

                <h3>
                  {trip.title}
                </h3>


                {/* DATE */}

                <p className="trip-date">

                  📅{" "}

                  {new Date(
                    trip.startDate
                  ).toLocaleDateString(
                    "en-IN",
                    {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    }
                  )}

                  {" — "}

                  {new Date(
                    trip.endDate
                  ).toLocaleDateString(
                    "en-IN",
                    {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    }
                  )}

                </p>


                {/* DESCRIPTION */}

                <p className="trip-description">

                  {trip.description ||
                    "No description added."}

                </p>


                {/* VIEW */}

                <div className="trip-card-footer">

                  <span>
                    View trip
                  </span>

                  <span>
                    →
                  </span>

                </div>

              </div>

            ))}

          </div>

        )}

      </section>

    </div>
  );
}

export default Dashboard;