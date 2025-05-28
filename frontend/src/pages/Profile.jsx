import React, { useState } from 'react';
import api from '../services/api'; 

const Profile = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    year: '',
  });

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await api.post('/user/update-profile', formData);

      if (response.status === 200) {
        alert('Profile updated successfully!');
      } else {
        alert(`Error: ${response.data.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert(error.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <p className="mb-6">Update your profile details and preferences here.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Department</label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Year</label>
          <input
            type="text"
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
