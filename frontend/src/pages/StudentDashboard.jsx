import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

const StudentDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const jobRes = await api.get('/jobs');
      setJobs(jobRes.data);

      const appRes = await api.get('/applications/my');
      setApplications(appRes.data);

      const interviewRes = await api.get('/interviews/my');
      setInterviews(interviewRes.data);
    } catch (error) {
      console.error('Dashboard error:', error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6 flex-1 overflow-y-auto">
          <h1 className="text-2xl font-bold mb-6">Student Dashboard</h1>

          {/* Available Jobs */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Available Jobs</h2>
            {jobs.length === 0 ? <p>No jobs available.</p> : (
              <div className="grid md:grid-cols-2 gap-4">
                {jobs.map((job) => (
                  <div key={job._id} className="border p-4 rounded shadow bg-white">
                    <h3 className="text-lg font-semibold">{job.title}</h3>
                    <p className="text-sm text-gray-600">{job.companyName}</p>
                    <p className="text-sm text-gray-500 mb-2">Location: {job.location}</p>
                    <button onClick={() => navigate(`/apply/${job._id}`)} className="mt-2 bg-blue-600 text-white px-4 py-1 rounded">
                      Apply Now
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Application Status */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">My Applications</h2>
            {applications.length === 0 ? <p>No applications submitted.</p> : (
              <ul className="space-y-2">
                {applications.map(app => (
                  <li key={app._id} className="bg-white p-3 rounded shadow border">
                    <div className="flex justify-between items-center">
                      <span>{app.jobTitle}</span>
                      <span className={`text-sm font-semibold ${app.status === 'shortlisted' ? 'text-green-600' : 'text-gray-600'}`}>
                        {app.status}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Interviews */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Upcoming Interviews</h2>
            {interviews.length === 0 ? <p>No interviews scheduled.</p> : (
              <ul className="space-y-2">
                {interviews.map(iv => (
                  <li key={iv._id} className="bg-white p-3 rounded shadow border">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-semibold">{iv.jobTitle}</p>
                        <p className="text-sm text-gray-500">{iv.companyName}</p>
                      </div>
                      <p className="text-sm text-gray-700">{new Date(iv.date).toLocaleString()}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default StudentDashboard;
