import React, { useEffect, useState } from 'react';
import api from '../services/api';

const PlacementDrives = () => {
  const [drives, setDrives] = useState([]);

  useEffect(() => {
    const fetchDrives = async () => {
      const res = await api.get('/placement-drives');
      const user = JSON.parse(localStorage.getItem('user'));
      const updated = res.data.map(d => ({
        ...d,
        registered: d.registeredStudents.includes(user._id)
      }));
      setDrives(updated);
    };

    fetchDrives();
  }, []);

  const registerForDrive = async (driveId) => {
    try {
      await api.post(`/placement-drives/${driveId}/register`);
      alert('Registered successfully!');
      window.location.reload();
    } catch (error) {
      alert(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Placement Drives</h1>
      {drives.map((drive) => (
        <div key={drive._id} className="border p-4 mb-4 rounded bg-white shadow-sm">
          <h3 className="text-xl font-semibold">{drive.name}</h3>
          <p>Date: {new Date(drive.date).toLocaleDateString()}</p>
          <p>Companies: {drive.companies.length}</p>
          <button
            disabled={drive.registered}
            onClick={() => registerForDrive(drive._id)}
            className={`mt-2 px-4 py-2 rounded ${drive.registered ? 'bg-gray-400' : 'bg-green-600 text-white'}`}
          >
            {drive.registered ? 'Registered' : 'Register'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default PlacementDrives;
