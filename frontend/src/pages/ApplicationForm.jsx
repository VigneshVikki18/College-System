import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../services/api';

const ApplicationForm = () => {
  const { id: jobId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    coverLetter: '',
    resume: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'resume') {
      setForm({ ...form, resume: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("resume", form.resume);
  formData.append("fullName", form.fullName);
  formData.append("email", form.email);
  formData.append("coverLetter", form.coverLetter);
  formData.append("job", jobId); 

 try {
    const res = await api.post("/applications", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    
    console.log("✅ Application submitted", res.data);
    toast.success("Application submitted successfully!");
    navigate("/student-dashboard"); // Or wherever you want
  } catch (err) {
    console.error("❌ Application submission error:", err);
    toast.error("Failed to submit application.");
  }
};



  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-md mt-8">
      <h2 className="text-2xl font-semibold mb-6">Apply for this Job</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
          className="w-full mb-4 p-3 border border-gray-300 rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-4 p-3 border border-gray-300 rounded"
          required
        />
        <textarea
          name="coverLetter"
          placeholder="Cover Letter"
          value={form.coverLetter}
          onChange={handleChange}
          className="w-full mb-4 p-3 border border-gray-300 rounded"
          required
        />
        <input
          type="file"
          name="resume"
          accept=".pdf,.doc,.docx"
          onChange={handleChange}
          className="w-full mb-4"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 px-4 rounded hover:bg-green-700 transition"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default ApplicationForm;
