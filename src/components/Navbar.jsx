import { Link } from "react-router-dom"

function Navbar() {
  return (
    <nav className="bg-blue-700 text-white px-6 py-4 flex justify-between items-center">
      
      <Link to="/dashboard" className="text-xl font-bold">
        CivicAI
      </Link>

      <div className="flex gap-6">
        <Link to="/dashboard" className="hover:text-blue-200">
          Dashboard
        </Link>

        <Link to="/submit" className="hover:text-blue-200">
          Submit Complaint
        </Link>

        <Link to="/history" className="hover:text-blue-200">
          History
        </Link>

        <Link to="/login" className="hover:text-blue-200">
          Logout
        </Link>
      </div>

    </nav>
  )
}

export default Navbar