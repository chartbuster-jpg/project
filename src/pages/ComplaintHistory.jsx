import Navbar from "../components/Navbar"
import { getComplaints } from "../data/mockData"
import { useState } from "react"
import { Link } from "react-router-dom"

function ComplaintHistory() {
  const [complaints, setComplaints] = useState(getComplaints())

  return (
    <div>

      <Navbar />

      <main className="max-w-6xl mx-auto p-6">

        <h1 className="text-3xl font-bold mb-6">
          Complaint History
        </h1>

        <div className="bg-white rounded-xl shadow overflow-hidden">

          <table className="w-full">

            <thead className="bg-gray-100">

              <tr>
                <th className="text-left p-4">ID</th>
                <th className="text-left p-4">Complaint</th>
                <th className="text-left p-4">Category</th>
                <th className="text-left p-4">Priority</th>
                <th className="text-left p-4">Status</th>
              </tr>

            </thead>

            <tbody>

              {complaints.map(complaint => (

                <tr
                  key={complaint.id}
                  className="border-t"
                >

                  <td className="p-4">
  <Link
    to={`/complaints/${complaint.id}`}
    className="text-blue-700 font-medium"
  >
    #{complaint.id}
  </Link>
</td>
                  <td className="p-4">
                    {complaint.title}
                  </td>

                  <td className="p-4">
                    {complaint.category}
                  </td>

                  <td className="p-4">
                    {complaint.priority}
                  </td>

                  <td className="p-4">
                    {complaint.status}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </main>

    </div>
  )
}

export default ComplaintHistory