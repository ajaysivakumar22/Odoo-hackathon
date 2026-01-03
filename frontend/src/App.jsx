import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateTrip from './pages/CreateTrip';
import TripListing from './pages/TripListing';
import ItineraryBuilder from './pages/ItineraryBuilder';
import Profile from './pages/Profile';
import CitySearch from './pages/CitySearch';
import Community from './pages/Community';
import Calendar from './pages/Calendar';
import AdminDashboard from './pages/AdminDashboard';
import Navbar from './components/Navbar';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-background">
      <div className="relative">
        <div className="h-24 w-24 rounded-[2rem] border-4 border-primary/20 animate-pulse-slow"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-12 w-12 rounded-2xl bg-primary animate-float shadow-glow-blue"></div>
        </div>
      </div>
    </div>
  );
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-background transition-colors duration-500">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="*" element={
              <ProtectedRoute>
                <Navbar />
                <div className="container mx-auto px-4 pt-32 pb-20">
                  <Routes>
                    <Route path="/" element={<Navigate to="/dashboard" />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/trips" element={<TripListing />} />
                    <Route path="/trips/new" element={<CreateTrip />} />
                    <Route path="/trips/:id/itinerary" element={<ItineraryBuilder />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/search" element={<CitySearch />} />
                    <Route path="/community" element={<Community />} />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="*" element={<Navigate to="/dashboard" />} />
                  </Routes>
                </div>
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
