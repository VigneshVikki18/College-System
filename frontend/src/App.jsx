import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from './contexts/AuthContext'; // ✅ Important
import PrivateRoute from './utils/PrivateRoute'; // ✅ Important

// Import your pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import StudentDashboard from './pages/StudentDashboard';
import CompanyDashboard from './pages/CompanyDashboard';
import PostJob from './pages/PostJob';
import AdminDashboard from './pages/AdminDashboard';
import Profile from './pages/Profile';
import JobList from './pages/JobList';
import JobDetail from './pages/JobDetail';
import ApplicationList from './pages/ApplicationList';
import InterviewSchedule from './pages/InterviewSchedule';
import PlacementDrives from './pages/PlacementDrives';
import Reports from './pages/Reports';
import Home from './pages/Home';
import ApplicationForm from './pages/ApplicationForm';
import ScheduleInterviewForm from './pages/ScheduleInterviewForm';
import ManageDrives from './pages/ManageDrives';
import DriveReport from './pages/DriveReport';
import RecruitmentDashboard from './pages/RecruitmentDashboard';





function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          
          

          <Route path="/" element={<Home />} />  {/* ✅ Now Home page shows at "/" */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Private Routes */}
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/student-dashboard" element={<PrivateRoute><StudentDashboard /></PrivateRoute>} />
          <Route path="/company-dashboard" element={<PrivateRoute><CompanyDashboard /></PrivateRoute>} />
          <Route path="/post-job" element={<PrivateRoute><PostJob /></PrivateRoute>} />
          <Route path="/admin-dashboard" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/jobs" element={<PrivateRoute><JobList /></PrivateRoute>} />
          <Route path="/job/:id" element={<PrivateRoute><JobDetail /></PrivateRoute>} />
          <Route path="/apply/:id" element={<PrivateRoute><ApplicationForm /></PrivateRoute>} />
          <Route path="/applications" element={<PrivateRoute><ApplicationList /></PrivateRoute>} />
          <Route path="/interviews" element={<PrivateRoute><InterviewSchedule /></PrivateRoute>} />
          <Route path="interviews/schedule" element={<PrivateRoute><ScheduleInterviewForm /></PrivateRoute>} />
          <Route path="/placement-drives" element={<PrivateRoute><PlacementDrives /></PrivateRoute>} />
          <Route path="/manage-drives" element={<PrivateRoute><ManageDrives /></PrivateRoute>} />
          <Route path="/drive-report" element={<PrivateRoute><DriveReport /></PrivateRoute>} />
          <Route path="/recruitment-dashboard" element={<PrivateRoute><RecruitmentDashboard /></PrivateRoute>} />

          <Route path="/reports" element={<PrivateRoute><Reports /></PrivateRoute>} />

          {/* Catch-all for undefined routes */}
          <Route path="*" element={<div className="p-4 text-center">404 - Page Not Found</div>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
