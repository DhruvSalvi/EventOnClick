import React, { useState } from 'react';
import EventList from '../components/EventList';

const Home = () => {
  const [location, setLocation] = useState({ city: '', state: '' });
  const [searchActive, setSearchActive] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocation(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchActive(true);
  };

  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>Discover Events Near You</h1>
        <p>Find local fairs, concerts, meet-ups, and more in your city</p>

        <form className="location-search" onSubmit={handleSearch}>
          <div className="search-inputs">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={location.city}
              onChange={handleChange}
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={location.state}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Find Events</button>
        </form>
      </div>

      {searchActive ? (
        <div className="search-results">
          <h2>Events in {location.city}{location.state ? `, ${location.state}` : ''}</h2>
          <EventList city={location.city} state={location.state} />
        </div>
      ) : (
        <div className="featured-events">
          <h2>Featured Events</h2>
          <EventList />
        </div>
      )}
    </div>
  );
};

export default Home;
