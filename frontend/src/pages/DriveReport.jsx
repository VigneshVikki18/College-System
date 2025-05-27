import React, { useEffect, useState } from 'react';
import api from '../services/api';

const DriveReport = () => {
  const [report, setReport] = useState(null);
  const [driveId, setDriveId] = useState('');

  const fetchReport = async () => {
    try {
      const res = await api.get(`/placement-drives/${driveId}/report`);
      setReport(res.data);
    } catch (error) {
      alert(error.response?.data?.message || 'Error fetching report');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Placement Drive Report</h1>

      <input
        type="text"
        placeholder="Enter Drive ID"
        value={driveId}
        onChange={(e) => setDriveId(e.target.value)}
        className="p-2 border rounded w-full mb-4"
      />
      <button onClick={fetchReport} className="bg-blue-600 text-white px-4 py-2 rounded">
        Get Report
      </button>

      {report && (
        <div className="mt-6 border p-4 bg-white shadow rounded">
          <h2 className="text-xl font-semibold mb-2">{report.name}</h2>
          <p>Date: {new Date(report.date).toLocaleDateString()}</p>
          <p>Total Students Registered: {report.totalStudents}</p>
          <p>Total Companies: {report.totalCompanies}</p>
          <p>Total Interviews: {report.totalInterviews}</p>
          <p>Total Offers Made: {report.offersMade}</p>
        </div>
      )}
    </div>
  );
};

export default DriveReport;
