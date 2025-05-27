import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import api from '../services/api';
import { Chart, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const RecruitmentDashboard = () => {
  const [status, setStatus] = useState({});
  const [trends, setTrends] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res1 = await api.get('/recruitment/status');
      setStatus(res1.data);
      const res2 = await api.get('/recruitment/trends');
      setTrends(res2.data);
    };
    fetchData();
  }, []);

  const chartData = {
    labels: trends.map((t) => new Date(t.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Interviews',
        data: trends.map((t) => t.interviews),
        backgroundColor: 'rgba(75, 192, 192, 0.7)',
      },
      {
        label: 'Offers',
        data: trends.map((t) => t.offers),
        backgroundColor: 'rgba(255, 99, 132, 0.7)',
      },
    ],
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Recruitment Status Dashboard</h2>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-green-100 p-4 rounded shadow">
          <p className="text-lg font-semibold">Total Students</p>
          <p className="text-2xl">{status.totalStudents}</p>
        </div>
        <div className="bg-blue-100 p-4 rounded shadow">
          <p className="text-lg font-semibold">Placed Students</p>
          <p className="text-2xl">{status.placedStudents}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded shadow">
          <p className="text-lg font-semibold">Offers Accepted</p>
          <p className="text-2xl">{status.offersAccepted}</p>
        </div>
        <div className="bg-purple-100 p-4 rounded shadow">
          <p className="text-lg font-semibold">Placement Drives</p>
          <p className="text-2xl">{status.totalDrives}</p>
        </div>
        <div className="bg-pink-100 p-4 rounded shadow col-span-2">
          <p className="text-lg font-semibold">Success Rate</p>
          <p className="text-2xl">{status.successRate}</p>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-2">Recruitment Trends</h3>
        <Bar data={chartData} />
      </div>
    </div>
  );
};

export default RecruitmentDashboard;
