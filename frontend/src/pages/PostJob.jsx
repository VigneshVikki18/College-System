import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const PostJob = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    skillsRequired: '',
    salary: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/jobs', {
        ...formData,
        skillsRequired: formData.skillsRequired.split(',').map((s) => s.trim())
      });
      navigate('/company-dashboard');
    } catch (error) {
      console.error('Job post error:', error);
      alert('Failed to post job');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Post a New Job</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" placeholder="Job Title" value={formData.title} onChange={handleChange} className="w-full p-2 border rounded" required />
        <textarea name="description" placeholder="Job Description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input name="skillsRequired" placeholder="Skills (comma separated)" value={formData.skillsRequired} onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="salary" type="number" placeholder="Salary" value={formData.salary} onChange={handleChange} className="w-full p-2 border rounded" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Post Job</button>
      </form>
    </div>
  );
};

export default PostJob;