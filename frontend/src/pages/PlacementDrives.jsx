import React, { useEffect, useState } from 'react';
import api from '../services/api';

const PlacementDrives = () => {
  const [drives, setDrives] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);
  const [newDrive, setNewDrive] = useState({
    name: '',
    date: '',
    companies: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('user'));
        setUser(userData);
        setIsAdmin(userData?.role === 'admin');

        const res = await api.get('/placement-drives');
        const updated = res.data.map(d => ({
          ...d,
          registered: d.registeredStudents.includes(userData._id)
        }));
        setDrives(updated);
      } catch (err) {
        console.error('Failed to fetch drives', err);
      }
    };

    fetchData();
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

  const createDrive = async () => {
    try {
      const payload = {
        ...newDrive,
        companies: newDrive.companies.split(',').map(c => c.trim())
      };
      await api.post('/placement-drives', payload);
      alert('Drive created successfully!');
      window.location.reload();
    } catch (error) {
      alert('Drive creation failed');
    }
  };

  const exportCSV = () => {
    const headers = ['Drive Name,Date,Participants,Interviews,Offers'];
    const rows = drives.map(d =>
      `${d.name},${new Date(d.date).toLocaleDateString()},${d.registeredStudents.length},${d.interviewsConducted || 0},${d.offersMade || 0}`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + headers.concat(rows).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'placement_reports.csv');
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Placement Drives</h1>

      {isAdmin && (
        <div className="border p-4 mb-6 bg-yellow-50 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Create New Placement Drive</h2>
          <input
            type="text"
            placeholder="Drive Name"
            className="border p-2 mr-2 mb-2"
            onChange={(e) => setNewDrive({ ...newDrive, name: e.target.value })}
          />
          <input
            type="date"
            className="border p-2 mr-2 mb-2"
            onChange={(e) => setNewDrive({ ...newDrive, date: e.target.value })}
          />
          <input
            type="text"
            placeholder="Companies (comma separated)"
            className="border p-2 mr-2 mb-2"
            onChange={(e) => setNewDrive({ ...newDrive, companies: e.target.value })}
          />
          <button onClick={createDrive} className="bg-blue-600 text-white px-4 py-2 rounded">
            Create Drive
          </button>
        </div>
      )}

      {isAdmin && (
        <button
          onClick={exportCSV}
          className="bg-purple-600 text-white px-4 py-2 rounded mb-6"
        >
          Export Reports as CSV
        </button>
      )}

      {drives.length === 0 ? (
        <p>No placement drives found.</p>
      ) : (
        drives.map((drive) => (
          <div key={drive._id} className="border p-4 mb-4 rounded bg-white shadow">
            <h3 className="text-xl font-semibold">{drive.name}</h3>
            <p><strong>Date:</strong> {new Date(drive.date).toLocaleDateString()}</p>
            <p><strong>Companies:</strong> {drive.companies.length}</p>

            {isAdmin && (
              <div className="mt-2 text-sm text-gray-700">
                <p><strong>Participants:</strong> {drive.registeredStudents.length}</p>
                <p><strong>Interviews Conducted:</strong> {drive.interviewsConducted || 0}</p>
                <p><strong>Offers Made:</strong> {drive.offersMade || 0}</p>
              </div>
            )}

            {!isAdmin && (
              <button
                disabled={drive.registered}
                onClick={() => registerForDrive(drive._id)}
                className={`mt-3 px-4 py-2 rounded ${
                  drive.registered
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-green-600 text-white'
                }`}
              >
                {drive.registered ? 'Registered' : 'Register'}
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default PlacementDrives;
