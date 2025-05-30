import React, { useState, useEffect } from 'react';
import EventCard from './EventCard';

const EventList = ({ city, state }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        let url = '/api/events';

        // Add query parameters if city or state is provided
        if (city || state) {
          url += '?';
          if (city) url += `city=${encodeURIComponent(city)}`;
          if (city && state) url += '&';
          if (state) url += `state=${encodeURIComponent(state)}`;
        }

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }

        const data = await response.json();
        setEvents(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEvents();
  }, [city, state]);

  if (loading) return <div className="loading">Loading events...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (events.length === 0) return <div className="no-events">No events found in this location.</div>;

  return (
    <div className="event-list">
      {events.map(event => (
        <EventCard key={event._id} event={event} />
      ))}
    </div>
  );
};

export default EventList;
