import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get('/jobs');
        setJobs(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Available Jobs</h1>
      {jobs.length === 0 && <p>No jobs available at the moment.</p>}

      {jobs.map((job) => (
        <div key={job._id} className="border p-4 rounded mb-4">
          <h2 className="text-xl font-semibold">{job.title}</h2>
          <p className="text-gray-700">{job.description}</p>
          <p className="text-sm text-gray-500">Location: {job.location}</p>
          <p className="text-sm text-gray-500">Skills Required: {job.skillsRequired?.join(', ')}</p>

          {/* ✅ Apply button */}
          <button
            onClick={() => navigate(`/job/${job._id}`)}
            className="mt-2 bg-blue-600 text-white py-1 px-4 rounded"
          >
            Apply
          </button>
        </div>
      ))}
    </div>
  );
};

export default JobList;
