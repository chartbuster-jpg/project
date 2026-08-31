
import Navbar from "../components/Navbar"
import { Link } from "react-router-dom"
import { getComplaints } from "../data/mockData"
import { useState } from "react"

function CitizenDashboard() {
  const [complaints, setComplaints] = useState(getComplaints())

  const total = complaints.length

  const resolved = complaints.filter(
    complaint => complaint.status === "Resolved"
  ).length

  const pending = complaints.filter(
    complaint => complaint.status !== "Resolved"
  ).length

  const highPriority = complaints.filter(
    complaint => complaint.priority === "HIGH"
  ).length

  return (
    <div>

      <Navbar />

      <main className="p-6 max-w-7xl mx-auto">

        <h1 className="text-3xl font-bold mb-2">
          Citizen Dashboard
        </h1>

        <p className="text-gray-500 mb-6">
          Track and manage your civic complaints
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">

          <div className="bg-white p-5 rounded-xl shadow">
            <p className="text-gray-500">Total Complaints</p>
            <h2 className="text-3xl font-bold mt-2">
              {total}
            </h2>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <p className="text-gray-500">Pending</p>
            <h2 className="text-3xl font-bold mt-2">
              {pending}
            </h2>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <p className="text-gray-500">Resolved</p>
            <h2 className="text-3xl font-bold mt-2">
              {resolved}
            </h2>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <p className="text-gray-500">High Priority</p>
            <h2 className="text-3xl font-bold mt-2">
              {highPriority}
            </h2>
          </div>

        </div>

        <div className="bg-white rounded-xl shadow p-6">

          <div className="flex justify-between items-center mb-4">

            <h2 className="text-xl font-bold">
              Recent Complaints
            </h2>

            <button className="bg-blue-700 text-white px-4 py-2 rounded-lg">
              + New Complaint
            </button>

          </div>

          <div className="space-y-4">

            {complaints.map(complaint => (

                            <Link
                key={complaint.id}
                to={`/complaints/${complaint.id}`}
                className="border rounded-lg p-4 flex justify-between items-center hover:bg-gray-50"
              >

                <div>
                  <h3 className="font-semibold">
                    {complaint.title}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {complaint.category} • {complaint.date}
                  </p>
                </div>

                <div className="text-right">

                  <span className="text-sm font-medium">
                    {complaint.status}
                  </span>

                  <p className="text-sm text-gray-500">
                    {complaint.priority}
                  </p>

                </div>

              </Link>

            ))}

          </div>

        </div>

      </main>

    </div>
  )
}

export default CitizenDashboard