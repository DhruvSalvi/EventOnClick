import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/events/${id}`);

        if (!response.ok) {
          throw new Error('Failed to fetch event details');
        }

        const data = await response.json();
        setEvent(data);

        // Check if current user is the event creator
        const token = localStorage.getItem('token');
        if (token) {
          try {
            const userResponse = await fetch('/api/users/me', {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });

            if (userResponse.ok) {
              const userData = await userResponse.json();
              setIsOwner(userData._id === data.creator);
            }
          } catch (err) {
            console.error('Error checking user:', err);
          }
        }

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this event?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/events/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete event');
      }

      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="loading">Loading event details...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!event) return <div className="not-found">Event not found</div>;

  const { 
    title, 
    description, 
    date, 
    time,
    location, 
    category, 
    imageUrl, 
    ticketInfo 
  } = event;

  // Format date
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="event-details">
      <div className="event-header">
        <h1>{title}</h1>
        <div className="event-meta">
          <p className="event-category">{category}</p>
          <p className="event-location">{location.city}, {location.state}</p>
          <p className="event-datetime">{formattedDate} at {time}</p>
        </div>
      </div>

      <div className="event-content">
        <div className="event-image">
          <img src={imageUrl || 'https://via.placeholder.com/600x400?text=Event'} alt={title} />
        </div>

        <div className="event-info">
          <h2>About This Event</h2>
          <p className="event-description">{description}</p>

          {ticketInfo && (
            <div className="ticket-info">
              <h2>Ticket Information</h2>
              <p>{ticketInfo}</p>
            </div>
          )}

          <div className="event-actions">
            {isOwner && (
              <div className="owner-actions">
                <Link to={`/edit-event/${id}`} className="edit-button">Edit Event</Link>
                <button onClick={handleDelete} className="delete-button">Delete Event</button>
              </div>
            )}
            <button className="share-button">Share Event</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
