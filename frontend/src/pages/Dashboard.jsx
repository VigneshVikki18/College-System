// /src/pages/Dashboard.jsx

import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 bg-gray-100 min-h-screen">
          <h1 className="text-3xl font-bold mb-4">Welcome to the Dashboard</h1>
          {/* Add dashboard widgets here */}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
