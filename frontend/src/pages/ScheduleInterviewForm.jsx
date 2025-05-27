import React, { useState, useEffect } from 'react';
import api from '../services/api';

const ScheduleInterviewForm = () => {
  const [applications, setApplications] = useState([]);
  const [formData, setFormData] = useState({
    applicationId: '',
    date: '',
    timeSlot: '',
    format: 'virtual',
  });
  const [interviewLink, setInterviewLink] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await api.get('/applications/my');
        const validApplications = res.data.filter(
          app => app.job && app.job.company // Ensure job has company assigned
        );
        setApplications(validApplications);
      } catch (err) {
        console.error('Failed to load applications:', err);
      }
    };
    fetchApplications();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        date: new Date(formData.date).toISOString(),
      };
      const res = await api.post('/interviews/schedule', payload);
      setInterviewLink(res.data.interviewLink);
    } catch (err) {
      console.error('Error scheduling interview:', err.response?.data || err.message);
      alert(err.response?.data?.message || 'Error scheduling interview');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Schedule Interview</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          name="applicationId"
          value={formData.applicationId}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        >
          <option value="">Select Application</option>
            {applications.map((app) => (
          <option key={app._id} value={app._id}>
            {app.job.title} at {app.job.company.name} ({app.status})
           </option>
            ))}
           
        </select>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="timeSlot"
          value={formData.timeSlot}
          onChange={handleChange}
          placeholder="e.g., 10:00AM - 11:00AM"
          required
          className="w-full p-2 border rounded"
        />
        <select
          name="format"
          value={formData.format}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="virtual">Virtual</option>
          <option value="in-person">In Person</option>
        </select>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          {loading ? 'Scheduling...' : 'Schedule Interview'}
        </button>
      </form>

      {interviewLink && (
        <div className="mt-4">
          <p className="text-green-600 font-semibold">✅ Interview Scheduled!</p>
          <a
            href={interviewLink}
            target="_blank"
            rel="noreferrer"
            className="text-blue-700 underline"
          >
            Join Meeting
          </a>
        </div>
      )}
    </div>
  );
};

export default ScheduleInterviewForm;
