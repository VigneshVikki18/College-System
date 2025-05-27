"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

function PostJob() {
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    applicationDeadline: "",
    jobType: "full-time",
    location: "",
  })
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setJobData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem("token")
      const response = await axios.post(
        "http://localhost:5000/api/jobs",
        {
          ...jobData,
          requirements: jobData.requirements.split("\n").filter((req) => req.trim() !== ""),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      navigate(`/job/${response.data.job._id}`)
    } catch (err) {
      setError("Failed to post job. Please try again.")
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h2 className="text-3xl font-bold mb-4">Post a New Job</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
            Job Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={jobData.title}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
            Job Description
          </label>
          <textarea
            id="description"
            name="description"
            value={jobData.description}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="requirements" className="block text-gray-700 text-sm font-bold mb-2">
            Requirements (one per line)
          </label>
          <textarea
            id="requirements"
            name="requirements"
            value={jobData.requirements}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="salary" className="block text-gray-700 text-sm font-bold mb-2">
            Salary
          </label>
          <input
            type="number"
            id="salary"
            name="salary"
            value={jobData.salary}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="applicationDeadline" className="block text-gray-700 text-sm font-bold mb-2">
            Application Deadline
          </label>
          <input
            type="date"
            id="applicationDeadline"
            name="applicationDeadline"
            value={jobData.applicationDeadline}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="jobType" className="block text-gray-700 text-sm font-bold mb-2">
            Job Type
          </label>
          <select
            id="jobType"
            name="jobType"
            value={jobData.jobType}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="full-time">Full Time</option>
            <option value="part-time">Part Time</option>
            <option value="internship">Internship</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="location" className="block text-gray-700 text-sm font-bold mb-2">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={jobData.location}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Post Job
          </button>
        </div>
      </form>
    </div>
  )
}

export default PostJob

