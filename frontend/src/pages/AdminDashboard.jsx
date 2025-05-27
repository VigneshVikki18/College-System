import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [status, setStatus] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/recruitment/status');
        setStatus(res.data);
      } catch (error) {
        console.error('Failed to load stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {status && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <div className="bg-white shadow p-4 rounded">
            <p className="text-lg text-gray-600">Total Students</p>
            <p className="text-3xl font-bold text-blue-600">{status.totalStudents}</p>
          </div>
          <div className="bg-white shadow p-4 rounded">
            <p className="text-lg text-gray-600">Students Placed</p>
            <p className="text-3xl font-bold text-green-600">{status.studentsPlaced}</p>
          </div>
          <div className="bg-white shadow p-4 rounded">
            <p className="text-lg text-gray-600">Applications</p>
            <p className="text-3xl font-bold text-purple-600">{status.applications}</p>
          </div>
          <div className="bg-white shadow p-4 rounded">
            <p className="text-lg text-gray-600">Offers Made</p>
            <p className="text-3xl font-bold text-yellow-600">{status.offersMade}</p>
          </div>
          <div className="bg-white shadow p-4 rounded col-span-1 sm:col-span-2 lg:col-span-3">
            <p className="text-lg text-gray-600">Placement Success Rate</p>
            <p className="text-4xl font-bold text-indigo-600">{status.successRate}%</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <button onClick={() => navigate('/manage-drives')} className="bg-blue-600 text-white p-4 rounded shadow hover:bg-blue-700">
          Manage Placement Drives
        </button>
        <button onClick={() => navigate('/drive-report')} className="bg-green-600 text-white p-4 rounded shadow hover:bg-green-700">
          View Drive Reports
        </button>
        <button onClick={() => navigate('/recruitment-dashboard')} className="bg-purple-600 text-white p-4 rounded shadow hover:bg-purple-700">
          Recruitment Analytics
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
