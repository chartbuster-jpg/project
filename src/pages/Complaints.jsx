import { Link } from "react-router-dom"
import { complaints } from "../data/mockData"

function Complaints() {

  return (
    <div className="min-h-screen bg-gray-100">

      <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between">

        <Link
          to="/officer"
          className="text-xl font-bold"
        >
          CivicAI Officer
        </Link>

        <div className="flex gap-6">

          <Link to="/officer">
            Dashboard
          </Link>

          <Link to="/officer/complaints">
            Complaints
          </Link>

          <Link to="/login">
            Logout
          </Link>

        </div>

      </nav>

      <main className="max-w-7xl mx-auto p-6">

        <h1 className="text-3xl font-bold mb-2">
          All Complaints
        </h1>

        <p className="text-gray-500 mb-6">
          Review and manage citizen complaints
        </p>

        <div className="bg-white rounded-xl shadow overflow-hidden">

          <table className="w-full">

            <thead className="bg-gray-100">

              <tr>

                <th className="text-left p-4">
                  ID
                </th>

                <th className="text-left p-4">
                  Complaint
                </th>

                <th className="text-left p-4">
                  Category
                </th>

                <th className="text-left p-4">
                  Department
                </th>

                <th className="text-left p-4">
                  Priority
                </th>

                <th className="text-left p-4">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {complaints.map(complaint => (

                <tr
                  key={complaint.id}
                  className="border-t hover:bg-gray-50"
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
                    {complaint.department}
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

export default Complaints