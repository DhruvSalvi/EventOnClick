import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EventForm from '../components/EventForm';

const CreateEvent = ({ isEditing }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(isEditing);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is authorized
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');

    if (!token || userRole !== 'creator') {
      navigate('/auth');
      return;
    }

    // If editing, fetch the event data
    if (isEditing && id) {
      const fetchEvent = async () => {
        try {
          const response = await fetch(`/api/events/${id}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (!response.ok) {
            throw new Error('Failed to fetch event');
          }

          const eventData = await response.json();
          setEvent(eventData);
          setLoading(false);
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      };

      fetchEvent();
    }
  }, [isEditing, id, navigate]);

  if (isEditing && loading) return <div className="loading">Loading event data...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="create-event-page">
      <EventForm event={event} isEditing={isEditing} />
    </div>
  );
};

export default CreateEvent;
