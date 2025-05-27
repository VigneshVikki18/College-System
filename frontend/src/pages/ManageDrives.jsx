import React, { useEffect, useState } from 'react';
import api from '../services/api';

const ManageDrives = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [companies, setCompanies] = useState('');
  const [drives, setDrives] = useState([]);

  useEffect(() => {
    fetchDrives();
  }, []);

  const fetchDrives = async () => {
    const res = await api.get('/placement-drives');
    setDrives(res.data);
  };

  const createDrive = async (e) => {
    e.preventDefault();
    try {
      const companyArray = companies.split(',').map(c => c.trim());
      await api.post('/placement-drives', {
        name,
        date,
        companies: companyArray // pass company IDs
      });
      alert('Drive created');
      setName('');
      setDate('');
      setCompanies('');
      fetchDrives();
    } catch (error) {
      alert(error.response?.data?.message || 'Creation failed');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Placement Drives</h2>

      <form onSubmit={createDrive} className="mb-6 space-y-4">
        <input
          type="text"
          placeholder="Drive Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Company IDs (comma-separated)"
          value={companies}
          onChange={(e) => setCompanies(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">Create Drive</button>
      </form>

      <h3 className="text-xl font-semibold mb-2">All Drives</h3>
      {drives.map((drive) => (
        <div key={drive._id} className="border p-4 mb-4 rounded shadow-sm bg-white">
          <p><strong>{drive.name}</strong></p>
          <p>Date: {new Date(drive.date).toLocaleDateString()}</p>
          <p>Companies: {drive.companies.length}</p>
          <p>Students Registered: {drive.registeredStudents.length}</p>
          <p>Offers Made: {drive.offersMade}</p>
        </div>
      ))}
    </div>
  );
};

export default ManageDrives;
