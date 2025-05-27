import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [resumeLink, setResumeLink] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [personalDetails, setPersonalDetails] = useState({
    phone: '',
    linkedin: '',
  });

  useEffect(() => {
    const fetchJob = async () => {
      const res = await api.get('/jobs');
      const selectedJob = res.data.find((job) => job._id === id);
      setJob(selectedJob);
    };
    fetchJob();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post('/applications', {
        jobId: job._id,
        resumeLink,
        coverLetter,
        personalDetails,
      });

      alert('Application submitted successfully!');
      navigate('/applications');
    } catch (error) {
      alert(error.response?.data?.message || 'Application failed');
    }
  };

  if (!job) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md w-full max-w-md">
        <input
          type="url"
          placeholder="Resume Link"
          value={resumeLink}
          onChange={(e) => setResumeLink(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
          required
        />
        <textarea
          placeholder="Cover Letter"
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
          rows="3"
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={personalDetails.phone}
          onChange={(e) => setPersonalDetails({ ...personalDetails, phone: e.target.value })}
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          type="url"
          placeholder="LinkedIn Profile Link"
          value={personalDetails.linkedin}
          onChange={(e) => setPersonalDetails({ ...personalDetails, linkedin: e.target.value })}
          className="w-full mb-3 p-2 border rounded"
        />

        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default JobDetail;
