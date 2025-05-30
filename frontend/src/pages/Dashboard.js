import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EventCard from '../components/EventCard';

const Dashboard = () => {
  const [userEvents, setUserEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState('');
  const [pendingApproval, setPendingApproval] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('You must be logged in to view your dashboard');
        }

        // Get user profile
        const userResponse = await fetch('/api/users/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!userResponse.ok) {
          throw new Error('Failed to fetch user data');
        }

        const userData = await userResponse.json();
        setUserRole(userData.role);
        setPendingApproval(userData.role === 'creator' && !userData.isApproved);

        // If user is a creator, fetch their events
        if (userData.role === 'creator' && userData.isApproved) {
          const eventsResponse = await fetch('/api/events/user', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (!eventsResponse.ok) {
            throw new Error('Failed to fetch your events');
          }

          const eventsData = await eventsResponse.json();
          setUserEvents(eventsData);
        }

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <div className="loading">Loading dashboard...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="dashboard">
      <h1>Your Dashboard</h1>

      {pendingApproval ? (
        <div className="pending-approval">
          <h2>Account Pending Approval</h2>
          <p>Your event creator account is currently under review. You'll be notified once it's approved.</p>
        </div>
      ) : userRole === 'creator' ? (
        <div className="creator-dashboard">
          <div className="dashboard-header">
            <h2>Your Events</h2>
            <Link to="/create-event" className="create-button">Create New Event</Link>
          </div>

          {userEvents.length === 0 ? (
            <div className="no-events">
              <p>You haven't created any events yet.</p>
              <Link to="/create-event">Create your first event</Link>
            </div>
          ) : (
            <div className="user-events">
              {userEvents.map(event => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="viewer-dashboard">
          <h2>Welcome to EventOnClick!</h2>
          <p>As a viewer, you can browse and discover events in your area.</p>
          <Link to="/" className="browse-button">Browse Events</Link>

          <div className="upgrade-account">
            <h3>Want to create your own events?</h3>
            <p>Upgrade your account to become an event creator.</p>
            <button className="upgrade-button">Upgrade Account</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
