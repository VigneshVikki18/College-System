import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, User, Building2 } from 'lucide-react'; // Optional: use icons

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-blue-50 p-4">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-extrabold text-indigo-800 drop-shadow">
          College Placement Management System 🎓
        </h1>
        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          Simplify placement drives, interview scheduling, and recruitment tracking for students, companies, and admins.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-xl">
        <Link
          to="/login"
          state={{ role: 'admin' }}
          className="flex items-center justify-center space-x-3 bg-blue-600 text-white px-6 py-4 rounded-2xl shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
        >
          <Briefcase className="w-5 h-5" />
          <span>Admin Login</span>
        </Link>

        <Link
          to="/login"
          state={{ role: 'student' }}
          className="flex items-center justify-center space-x-3 bg-green-600 text-white px-6 py-4 rounded-2xl shadow-lg hover:bg-green-700 transition-transform transform hover:scale-105"
        >
          <User className="w-5 h-5" />
          <span>Student Login</span>
        </Link>

        <Link
          to="/login"
          state={{ role: 'company' }}
          className="flex items-center justify-center space-x-3 bg-yellow-500 text-white px-6 py-4 rounded-2xl shadow-lg hover:bg-yellow-600 transition-transform transform hover:scale-105"
        >
          <Building2 className="w-5 h-5" />
          <span>Company Login</span>
        </Link>
      </div>
    </div>
  );
};

export default Home;
