import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    skillsRequired: '',
    salary: ''
  });

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await api.get(`/jobs/${id}`);
        const job = res.data;
        setFormData({
          title: job.title || '',
          description: job.description || '',
          location: job.location || '',
          skillsRequired: (job.skillsRequired || []).join(', '),
          salary: job.salary || ''
        });
      } catch (error) {
        console.error('Error fetching job:', error);
      }
    };

    fetchJob();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/jobs/${id}`, {
        ...formData,
        skillsRequired: formData.skillsRequired.split(',').map(s => s.trim())
      });
      navigate('/company-dashboard');
    } catch (error) {
      console.error('Job update error:', error);
      alert('Failed to update job');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Edit Job</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" value={formData.title} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Title" />
        <textarea name="description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Description" />
        <input name="location" value={formData.location} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Location" />
        <input name="skillsRequired" value={formData.skillsRequired} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Skills (comma separated)" />
        <input type="number" name="salary" value={formData.salary} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Salary" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Update Job</button>
      </form>
    </div>
  );
};

export default EditJob;
