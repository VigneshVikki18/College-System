import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Bar } from 'react-chartjs-2';
import {
  Chart, CategoryScale, LinearScale, BarElement, Tooltip, Legend
} from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const Reports = () => {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      const res = await api.get('/reports/placement-metrics');
      setMetrics(res.data);
    };
    fetchMetrics();
  }, []);

  if (!metrics) return <p>Loading metrics...</p>;

  const data = {
    labels: ['Applications', 'Interviews', 'Students', 'Placed'],
    datasets: [{
      label: 'Placement Metrics',
      data: [
        metrics.totalApplications,
        metrics.totalInterviews,
        metrics.totalStudents,
        metrics.placedStudents
      ],
      backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444']
    }]
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Placement Reports</h1>
      <p>Placement Success Rate: {metrics.placementRate}%</p>
      <div className="w-full md:w-2/3 mt-6">
        <Bar data={data} />
      </div>
    </div>
  );
};

export default Reports;
