import React from 'react';
import { useNavigate } from 'react-router-dom';

const EventCard = ({ event }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    // Check if user is logged in
    const token = localStorage.getItem('token');

    if (token) {
      // User is logged in, navigate to event details
      navigate(`/event/${event._id}`);
    } else {
      // User is not logged in, redirect to login page with a message
      navigate('/auth', { 
        state: { 
          message: 'Please log in to view event details',
          redirectTo: `/event/${event._id}`
        } 
      });
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="event-card">
      {event.imageUrl && (
        <div className="event-image">
          <img src={event.imageUrl} alt={event.title} />
        </div>
      )}
      <div className="event-content">
        <h3>{event.title}</h3>
        <p className="event-date">{formatDate(event.date)} at {event.time}</p>
        <p className="event-location">{event.location.city}, {event.location.state}</p>
        <p className="event-category">{event.category}</p>
        <p className="event-description">
          {event.description.length > 100
            ? `${event.description.substring(0, 100)}...`
            : event.description}
        </p>
        <button className="btn-primary" onClick={handleViewDetails}>
          View Details
        </button>
      </div>
    </div>
  );
};

export default EventCard;
