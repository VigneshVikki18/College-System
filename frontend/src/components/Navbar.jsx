//
import React from 'react';
import { Link } from 'react-router-dom';
import Notification from './Notification';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">
        College Placement Portal
      </Link>
      <div className="space-x-4">
        <Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>
        <Link to="/profile" className="hover:text-gray-300">Profile</Link>
        
        <Link to="/logout" className="hover:text-gray-300">Logout</Link>
        <Notification />
      </div>
    </nav>
  );
};

export default Navbar;
