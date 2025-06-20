// /src/components/Sidebar.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 bg-white shadow-md h-full p-5 space-y-4">
      <h2 className="text-xl font-bold mb-6">Menu</h2>
      <ul className="space-y-3">
       
        <li><Link to="/applications" className="block p-2 rounded hover:bg-blue-100">Applications</Link></li>
        <li><Link to="/interviews" className="block p-2 rounded hover:bg-blue-100">Interviews</Link></li>
        
        <li><Link to="/reports" className="block p-2 rounded hover:bg-blue-100">Reports</Link></li>
        <li><Link to="/profile" className="block p-2 rounded hover:bg-blue-100">Profile</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
