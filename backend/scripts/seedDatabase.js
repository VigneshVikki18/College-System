import mongoose from "mongoose"
import dotenv from "dotenv"
import User from "../models/User.js"
import Job from "../models/Job.js"
import Application from "../models/Application.js"
import sampleData from "../data/sampleData.json"

dotenv.config()

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const seedDatabase = async () => {
  try {
    // Clear existing data
    await User.deleteMany({})
    await Job.deleteMany({})
    await Application.deleteMany({})

    // Seed companies (users with role 'company')
    const companies = await User.create(
      sampleData.companies.map((company) => ({
        ...company,
        role: "company",
        password: "password123", // You should use a proper password hashing mechanism in a real application
      })),
    )

    // Seed students (users with role 'student')
    const students = await User.create(
      sampleData.students.map((student) => ({
        ...student,
        role: "student",
        password: "password123", // You should use a proper password hashing mechanism in a real application
      })),
    )

    // Seed jobs
    const jobs = await Job.create(
      sampleData.jobs.map((job) => ({
        ...job,
        company: companies.find((c) => c.id === job.companyId)._id,
      })),
    )

    // Seed applications
    await Application.create(
      sampleData.applications.map((application) => ({
        ...application,
        job: jobs.find((j) => j.id === application.jobId)._id,
        student: students.find((s) => s.id === application.studentId)._id,
      })),
    )

    console.log("Database seeded successfully")
  } catch (error) {
    console.error("Error seeding database:", error)
  } finally {
    mongoose.connection.close()
  }
}

seedDatabase()

