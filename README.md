# EventOnClick Platform

EventOnClick is a platform where authorized users can create and manage events, while general users can discover events in their city or state.

## Features

### For Event Creators
- Create, edit, and delete events
- Manage event details including title, description, date, location, category, etc.
- View analytics for their events

### For General Users
- Browse events by city or state
- Filter events by category, date, etc.
- View event details

## Tech Stack

### Frontend
- React.js
- React Router for navigation
- CSS for styling

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/eventonclick.git
   cd eventonclick
   ```

2. Install backend dependencies
   ```
   cd backend
   npm install
   ```

3. Install frontend dependencies
   ```
   cd ../frontend
   npm install
   ```

4. Create a .env file in the backend directory with the following variables:
   ```
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/eventonclick
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRE=30d
   ```

5. Start the development servers

   Backend:
   ```
   cd backend
   npm run dev
   ```

   Frontend:
   ```
   cd frontend
   npm start
   ```

6. Open your browser and navigate to `http://localhost:3000`

## API Endpoints

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login user
- GET /api/auth/me - Get current user

### Events
- GET /api/events - Get all events (with optional filters)
- GET /api/events/:id - Get single event
- POST /api/events - Create new event (creators only)
- PUT /api/events/:id - Update event (creator or admin)
- DELETE /api/events/:id - Delete event (creator or admin)
- GET /api/events/user - Get events created by logged in user

### Users
- GET /api/users/me - Get current user
- PUT /api/users/me - Update user details
- PUT /api/users/password - Update password
- GET /api/users - Get all users (admin only)
- PUT /api/users/:id/approve - Approve creator account (admin only)

## License
MIT
