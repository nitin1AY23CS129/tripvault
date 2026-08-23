import { Routes, Route, Link } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateTrip from "./pages/CreateTrip";
import TripDetails from "./pages/TripDetails";
import EditTrip from "./pages/EditTrip";

function App() {
  return (
    <div>
      {/* ========================================
          NAVBAR
      ======================================== */}

      <nav className="navbar">

        <Link to="/" className="logo">
          <span className="logo-icon">✈</span>
          <span>TripVault</span>
        </Link>

        <div className="nav-links">
          <Link to="/">Home</Link>

          <Link to="/dashboard">
            My Trips
          </Link>

          <Link to="/create-trip">
            Create Trip
          </Link>
        </div>

      </nav>


      {/* ========================================
          ROUTES
      ======================================== */}

      <Routes>

        {/* ======================================
            HOME
        ====================================== */}

        <Route
          path="/"
          element={
            <div className="home-page">

              {/* HERO SECTION */}

              <section className="hero-section">

                {/* LEFT SIDE */}

                <div className="hero-content">

                  <p className="small-heading">
                    YOUR TRAVEL JOURNAL
                  </p>

                  <h1>
                    Your journeys,
                    <br />
                    beautifully remembered.
                  </h1>

                  <p className="hero-description">
                    Keep your favorite destinations,
                    experiences and travel memories
                    organized in one beautiful place.
                  </p>

                  <div className="hero-actions">

                    <Link
                      to="/create-trip"
                      className="hero-primary-button"
                    >
                      Start a Trip
                    </Link>

                    <Link
                      to="/dashboard"
                      className="hero-secondary-button"
                    >
                      View My Trips
                    </Link>

                  </div>

                </div>


                {/* RIGHT SIDE - TRAVEL IMAGE */}

                <div className="hero-visual">

                  <img
                    src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80"
                    alt="Beautiful tropical beach"
                  />

                  <div className="hero-visual-overlay"></div>


                  {/* TOP */}

                  <div className="hero-visual-top">

                    <span>✈</span>

                    <span>
                      TRIPVAULT
                    </span>

                  </div>


                  {/* CONTENT */}

                  <div className="hero-visual-content">

                    <p>
                      YOUR NEXT JOURNEY
                    </p>

                    <h2>
                      Discover somewhere
                      unforgettable.
                    </h2>

                    <span>
                      Plan it. Experience it.
                      Remember it.
                    </span>

                  </div>


                  {/* BADGE */}

                  <div className="travel-badge">
                    🌴 Explore
                  </div>

                </div>

              </section>


              {/* ==================================
                  FEATURES
              ================================== */}

              <section className="features-section">

                <div className="features-heading">

                  <p className="small-heading">
                    WHY TRIPVAULT?
                  </p>

                  <h2>
                    Everything you need to remember
                    your journeys.
                  </h2>

                </div>


                <div className="features-grid">

                  {/* FEATURE 1 */}

                  <div className="feature-card">

                    <div className="feature-icon">
                      🗺️
                    </div>

                    <h3>
                      Organize Your Trips
                    </h3>

                    <p>
                      Keep destinations, dates and
                      travel details organized in one
                      place.
                    </p>

                  </div>


                  {/* FEATURE 2 */}

                  <div className="feature-card">

                    <div className="feature-icon">
                      📸
                    </div>

                    <h3>
                      Preserve Memories
                    </h3>

                    <p>
                      Turn your journeys into a
                      personal travel journal you can
                      revisit anytime.
                    </p>

                  </div>


                  {/* FEATURE 3 */}

                  <div className="feature-card">

                    <div className="feature-icon">
                      🔐
                    </div>

                    <h3>
                      Your Trips, Private
                    </h3>

                    <p>
                      Your travel information is
                      protected with secure user
                      authentication.
                    </p>

                  </div>

                </div>

              </section>

            </div>
          }
        />


        {/* ======================================
            LOGIN
        ====================================== */}

        <Route
          path="/login"
          element={
            <Login />
          }
        />


        {/* ======================================
            REGISTER
        ====================================== */}

        <Route
          path="/register"
          element={
            <Register />
          }
        />


        {/* ======================================
            DASHBOARD
        ====================================== */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />


        {/* ======================================
            CREATE TRIP
        ====================================== */}

        <Route
          path="/create-trip"
          element={
            <ProtectedRoute>
              <CreateTrip />
            </ProtectedRoute>
          }
        />


        {/* ======================================
            TRIP DETAILS
        ====================================== */}

        <Route
          path="/trip/:id"
          element={
            <ProtectedRoute>
              <TripDetails />
            </ProtectedRoute>
          }
        />


        {/* ======================================
            EDIT TRIP
        ====================================== */}

        <Route
          path="/trip/:id/edit"
          element={
            <ProtectedRoute>
              <EditTrip />
            </ProtectedRoute>
          }
        />

      </Routes>

    </div>
  );
}

export default App;