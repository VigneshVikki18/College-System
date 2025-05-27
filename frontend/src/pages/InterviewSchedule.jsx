import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const InterviewSchedule = () => {
  const [interviews, setInterviews] = useState([]);
  const [hasAppliedJobs, setHasAppliedJobs] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [interviewRes, applicationsRes] = await Promise.all([
          api.get('/interviews/my'),
          api.get('/applications/my'),
        ]);
        setInterviews(interviewRes.data);
        setHasAppliedJobs(applicationsRes.data.length > 0);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Interview Schedule</h1>

      {interviews.length === 0 ? (
        <div className="bg-gray-100 p-4 rounded shadow">
          <p className="text-gray-700 mb-4">
            {hasAppliedJobs
              ? "You've applied for jobs. No interview scheduled yet."
              : "No interviews or applications found."}
          </p>

          {hasAppliedJobs ? (
            <button
              onClick={() => navigate('/interviews/schedule')}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              Request Interview
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <span className="text-blue-600 font-medium">
                Apply for jobs to get interview opportunities.
              </span>
              <button
                onClick={() => navigate('/applications')}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Browse Jobs
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {interviews.map((interview) => (
            <div key={interview._id} className="border p-4 rounded shadow">
              <p><strong>Job:</strong> {interview.job?.title}</p>
              <p><strong>Date:</strong> {new Date(interview.date).toLocaleDateString()}</p>
              <p><strong>Time:</strong> {interview.timeSlot}</p>
              <p><strong>Format:</strong> {interview.format}</p>
              <p><strong>Status:</strong> {interview.status}</p>
              {interview.format === 'virtual' && interview.interviewLink && (
                <p>
                  <strong>Join Link:</strong>{' '}
                  <a
                    href={interview.interviewLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    Join Meeting
                  </a>
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InterviewSchedule;
