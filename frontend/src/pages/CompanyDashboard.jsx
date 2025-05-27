import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const CompanyDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get('/jobs/my-jobs'); // 👈 Make sure this route works
        setJobs(res.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Company Dashboard</h1>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Your Job Postings</h2>
        <button
          onClick={() => navigate('/post-job')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Post New Job
        </button>
      </div>

      {jobs.length === 0 ? (
        <p className="text-gray-600">You haven't posted any jobs yet.</p>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white border rounded shadow p-4 hover:bg-gray-50 transition"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold">{job.title}</h3>
                  <p className="text-gray-500">{job.location}</p>
                  <p className="text-sm text-gray-400">
                    {job.applications?.length || 0} applications
                  </p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => navigate(`/job/${job._id}`)}
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </button>
                  <button
                    onClick={() => navigate(`/job/${job._id}/applications`)}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  >
                    View Applicants
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompanyDashboard;
