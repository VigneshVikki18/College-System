import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

const JobApplications = () => {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await api.get(`/applications/job/${jobId}`);
        setApplications(res.data);
      } catch (err) {
        console.error('Failed to fetch applications:', err);
      }
    };

    fetchApplications();
  }, [jobId]);

  const updateStatus = async (id, newStatus) => {
    try {
      await api.patch(`/applications/${id}/status`, { status: newStatus });
      setApplications((prev) =>
        prev.map((app) =>
          app._id === id ? { ...app, status: newStatus } : app
        )
      );
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const scheduleInterview = async (id, date, time) => {
    if (!date || !time) {
      alert('Please select date and time');
      return;
    }

    try {
      await api.patch(`/applications/${id}/schedule`, { date, time });
      setApplications((prev) =>
        prev.map((app) =>
          app._id === id
            ? {
                ...app,
                status: 'Interview Scheduled',
                interviewDate: date,
                interviewTime: time,
              }
            : app
        )
      );
    } catch (err) {
      console.error('Failed to schedule interview:', err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Applications for Job</h1>
      {applications.length === 0 ? (
        <p className="text-gray-600">No applications submitted yet.</p>
      ) : (
        <div className="space-y-6">
          {applications.map((app, index) => (
            <div
              key={app._id}
              className="bg-white border rounded shadow p-4 space-y-2"
            >
              <div>
                <h2 className="text-lg font-semibold">
                  {index + 1}. {app.student.name}
                </h2>
                <p className="text-sm text-gray-500">
                  Email: {app.student.email}
                </p>
                <p className="text-sm text-gray-500">
                  Resume:{' '}
                  <a
                    href={app.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    View Resume
                  </a>
                </p>
                <p className="text-sm">
                  Status:{' '}
                  <span
                    className={`font-semibold ${
                      app.status === 'Rejected'
                        ? 'text-red-600'
                        : app.status === 'Interview Scheduled'
                        ? 'text-blue-600'
                        : app.status === 'Shortlisted'
                        ? 'text-green-600'
                        : ''
                    }`}
                  >
                    {app.status}
                  </span>
                </p>

                {app.status === 'Interview Scheduled' && (
                  <p className="text-sm text-green-600">
                    📅 Scheduled at: {app.interviewDate} {app.interviewTime}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {app.status === 'Pending' && (
                  <>
                    <button
                      onClick={() => updateStatus(app._id, 'Shortlisted')}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                    >
                      👍 Shortlist
                    </button>
                    <button
                      onClick={() => updateStatus(app._id, 'Rejected')}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                    >
                      ❌ Reject
                    </button>
                  </>
                )}

                {app.status === 'Shortlisted' && (
                  <div className="flex flex-wrap items-center gap-2">
                    <input
                      type="date"
                      className="border px-2 py-1 rounded"
                      onChange={(e) =>
                        (app.interviewDate = e.target.value)
                      }
                    />
                    <input
                      type="time"
                      className="border px-2 py-1 rounded"
                      onChange={(e) =>
                        (app.interviewTime = e.target.value)
                      }
                    />
                    <button
                      onClick={() =>
                        scheduleInterview(
                          app._id,
                          app.interviewDate,
                          app.interviewTime
                        )
                      }
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                    >
                      📅 Schedule Interview
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobApplications;
