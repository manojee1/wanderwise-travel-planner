import React, { useState } from "react";
import "./App.css";

function App() {
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState(3);
  const [interests, setInterests] = useState("");
  const [budget, setBudget] = useState("moderate");
  const [travelStyle, setTravelStyle] = useState("balanced");
  const [itinerary, setItinerary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setItinerary("");
    try {
      const apiUrl = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";
      const res = await fetch(`${apiUrl}/plan_trip`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          destination, 
          days, 
          interests, 
          budget, 
          travel_style: travelStyle 
        }),
      });
      if (!res.ok) throw new Error("Failed to get itinerary");
      const data = await res.json();
      setItinerary(data.itinerary);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      {/* Hero Section */}
      <header className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="accent">Wander</span>Wise
          </h1>
          <p className="hero-subtitle">
            AI-Powered Travel Planning for Your Perfect Adventure
          </p>
          <div className="hero-features">
            <div className="feature">
              <span className="feature-icon">🗺️</span>
              <span>Personalized Itineraries</span>
            </div>
            <div className="feature">
              <span className="feature-icon">💰</span>
              <span>Budget Optimization</span>
            </div>
            <div className="feature">
              <span className="feature-icon">⚡</span>
              <span>Instant Planning</span>
            </div>
          </div>
        </div>
        <div className="hero-image">
          <div className="floating-card">
            <div className="card-header">
              <h3>Plan Your Dream Trip</h3>
              <p>Get a personalized itinerary in seconds</p>
            </div>
            
            <form onSubmit={handleSubmit} className="trip-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Destination</label>
                  <input
                    type="text"
                    value={destination}
                    onChange={e => setDestination(e.target.value)}
                    placeholder="Where do you want to go?"
                    required
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Duration</label>
                  <input
                    type="number"
                    min={1}
                    max={30}
                    value={days}
                    onChange={e => setDays(Number(e.target.value))}
                    required
                    className="form-input"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Interests & Activities</label>
                <input
                  type="text"
                  value={interests}
                  onChange={e => setInterests(e.target.value)}
                  placeholder="Museums, food, hiking, nightlife, shopping..."
                  className="form-input"
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Budget</label>
                  <select 
                    value={budget} 
                    onChange={e => setBudget(e.target.value)}
                    className="form-select"
                  >
                    <option value="budget">Budget-Friendly</option>
                    <option value="moderate">Moderate</option>
                    <option value="luxury">Luxury</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Travel Style</label>
                  <select 
                    value={travelStyle} 
                    onChange={e => setTravelStyle(e.target.value)}
                    className="form-select"
                  >
                    <option value="relaxed">Relaxed</option>
                    <option value="balanced">Balanced</option>
                    <option value="adventurous">Adventurous</option>
                  </select>
                </div>
              </div>
              
              <button 
                type="submit" 
                disabled={loading}
                className={`submit-btn ${loading ? 'loading' : ''}`}
              >
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Planning Your Adventure...
                  </>
                ) : (
                  <>
                    <span className="btn-icon">✈️</span>
                    Plan My Trip
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Error Message */}
      {error && (
        <div className="error-message">
          <span className="error-icon">⚠️</span>
          {error}
        </div>
      )}

      {/* Itinerary Section */}
      {itinerary && (
        <section className="itinerary-section">
          <div className="container">
            <div className="itinerary-header">
              <h2>Your Personalized Itinerary</h2>
              <p>Tailored to your preferences for {destination}</p>
            </div>
            <div className="itinerary-content">
              <div className="itinerary-card">
                <div className="itinerary-body">
                  {itinerary.split('\n').map((line, index) => {
                    if (line.trim().startsWith('**') && line.trim().endsWith('**')) {
                      return <h3 key={index} className="day-header">{line.replace(/\*\*/g, '')}</h3>;
                    } else if (line.trim().startsWith('-')) {
                      return <li key={index} className="activity-item">{line.replace('-', '').trim()}</li>;
                    } else if (line.trim() === '') {
                      return <br key={index} />;
                    } else {
                      return <p key={index} className="itinerary-text">{line}</p>;
                    }
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 WanderWise. AI-Powered Travel Planning.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
