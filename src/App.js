import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import MyRSVPs from "./pages/MyRSVPs";
import ProtectedRoute from "./components/ProtectedRoute";
import Homepage from "./pages/Homepage";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/UserDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* ✅ Regular user dashboard - only for 'User' role */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute
              element={<Dashboard />}
              allowedRoles={["User"]}
            />
          }
        />

        {/* ✅ Admin dashboard - only for Admins and Developers */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute
              element={<AdminDashboard />}
              allowedRoles={["Admin", "Developer"]}
            />
          }
        />

        {/* ✅ RSVP history - all roles can view their RSVP */}
        <Route
          path="/my-rsvps"
          element={
            <ProtectedRoute
              element={<MyRSVPs />}
              allowedRoles={["User", "Admin", "Developer"]}
            />
          }
        />
        <Route path="/" element={<Homepage />} />
        <Route path="/admin-login" element={<AdminLogin />} />

      </Routes>
      
    </Router>
  );
}

export default App; 