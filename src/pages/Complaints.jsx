import { Link } from "react-router-dom"
import { complaints } from "../data/mockData"

function Complaints() {

  return (
    <div>

      <nav className="site-nav bg-blue-700 text-white px-6 py-4 flex justify-between items-center">

        <Link
          to="/officer"
          className="text-xl font-bold"
        >
          <span className="nav-brand-mark">PN</span> Problem Nivaran <span className="officer-label">Officer</span>
        </Link>

        <div className="nav-links flex gap-6">

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

      <main className="officer-complaints p-6 max-w-7xl mx-auto">

        <div className="officer-page-heading">
          <div>
            <p className="eyebrow">Operations overview</p>
            <h1 className="text-3xl font-bold mb-2">All Complaints</h1>
            <p className="text-gray-500 mb-6">Review and manage citizen complaints in one place.</p>
          </div>
          <div className="complaint-count">{complaints.length} total</div>
        </div>

        <div className="officer-table-card bg-white rounded-xl shadow overflow-hidden">

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
