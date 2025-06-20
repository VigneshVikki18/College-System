import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Notification from './Notification';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    
    localStorage.removeItem('token'); 
   
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">
        College Placement Portal
      </Link>
      <div className="space-x-4 flex items-center">
        <Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>
        <Link to="/profile" className="hover:text-gray-300">Profile</Link>

        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="hover:text-gray-300 focus:outline-none"
        >
          Logout
        </button>

        <Notification />
      </div>
    </nav>
  );
};

export default Navbar;
