import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';
import Layout from './components/layout/Layout';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ProtectedRoute from './routes/ProtectedRoute';

// Creator Components
import CreatorDashboard from './pages/creator/CreatorDashboard';
import CreateIdea from './pages/creator/CreateIdea';
import RequestsPage from './pages/creator/RequestsPage';

// Student Components
import StudentDashboard from './pages/student/StudentDashboard';
import IdeaDetails from './pages/student/IdeaDetails';
import Notifications from './pages/student/Notifications';
import Profile from './pages/student/Profile';
import About from './pages/student/About';
import Leaderboard from './pages/student/Leaderboard';

// Common
import ChatWindow from './components/features/ChatWindow';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <AuthProvider>
      <Toaster position="top-center" reverseOrder={false} />
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Authenticated Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<StudentDashboard />} />
              <Route path="/new-idea" element={<CreateIdea />} />
              <Route path="/requests" element={<RequestsPage />} />
              <Route path="/ideas/:id" element={<IdeaDetails />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/about" element={<About />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/chat/:ideaId" element={<ChatWindow />} />

              {/* Redirects */}
              <Route path="/student/*" element={<Navigate to="/dashboard" replace />} />
              <Route path="/creator/*" element={<Navigate to="/dashboard" replace />} />
            </Route>

            {/* Default Route */}
            {/* <Route path="/" element={<Navigate to="/login" replace />} /> */}
          </Route>

          {/* Landing Page - Outside of Main Layout */}
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
