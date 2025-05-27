import React, { useEffect, useState } from 'react';
import api from '../services/api';

const ApplicationList = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      const res = await api.get('/applications');
      setApplications(res.data);
    };
    fetchApplications();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">My Applications</h1>
      {applications.length === 0 ? (
        <p>No applications yet.</p>
      ) : (
        applications.map((app) => (
          <div key={app._id} className="border p-4 rounded mb-4 shadow-sm">
            <h3 className="text-xl font-semibold">{app.job?.title}</h3>
            <p>Status: <strong>{app.status}</strong></p>
            <p>Resume: <a href={app.resumeLink} target="_blank" className="text-blue-500 underline">View</a></p>
            <p>Cover Letter: {app.coverLetter}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ApplicationList;
