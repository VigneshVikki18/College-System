"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

function JobSearch() {
  const [jobs, setJobs] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    jobType: "",
    location: "",
    salary: "",
  })

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/jobs")
        setJobs(response.data)
      } catch (error) {
        console.error("Error fetching jobs:", error)
      }
    }

    fetchJobs()
  }, [])

  const filteredJobs = jobs.filter(
    (job) =>
      (job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filters.jobType === "" || job.jobType === filters.jobType) &&
      (filters.location === "" || job.location.toLowerCase().includes(filters.location.toLowerCase())) &&
      (filters.salary === "" || job.salary >= Number.parseInt(filters.salary)),
  )

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Job Search</h2>
      <div className="flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search jobs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow px-3 py-2 border rounded"
        />
        <select
          value={filters.jobType}
          onChange={(e) => setFilters({ ...filters, jobType: e.target.value })}
          className="px-3 py-2 border rounded"
        >
          <option value="">All Job Types</option>
          <option value="full-time">Full Time</option>
          <option value="part-time">Part Time</option>
          <option value="internship">Internship</option>
        </select>
        <input
          type="text"
          placeholder="Location"
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          className="px-3 py-2 border rounded"
        />
        <input
          type="number"
          placeholder="Minimum Salary"
          value={filters.salary}
          onChange={(e) => setFilters({ ...filters, salary: e.target.value })}
          className="px-3 py-2 border rounded"
        />
      </div>
      <ul className="space-y-4">
        {filteredJobs.map((job) => (
          <li key={job._id} className="bg-white p-4 rounded shadow">
            <h3 className="font-bold text-lg">{job.title}</h3>
            <p className="text-gray-600">{job.company.name}</p>
            <p className="text-sm text-gray-500">
              {job.location} • {job.jobType}
            </p>
            <p className="mt-2">{job.description.substring(0, 150)}...</p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-blue-600 font-semibold">${job.salary}/year</span>
              <Link to={`/apply/${job._id}`} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Apply Now
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default JobSearch

