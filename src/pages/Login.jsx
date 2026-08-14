import { useNavigate } from "react-router-dom"

function Login() {

  const navigate = useNavigate()

  const handleLogin = () => {
    navigate("/dashboard")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-md w-96">

        <h1 className="text-3xl font-bold text-center text-blue-700 mb-2">
          CivicAI
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Smart Grievance System
        </p>

        <label className="block mb-2 font-medium">
          Email
        </label>

        <input
          type="email"
          placeholder="Enter email"
          className="w-full border rounded-lg px-4 py-2 mb-4"
        />

        <label className="block mb-2 font-medium">
          Password
        </label>

        <input
          type="password"
          placeholder="Enter password"
          className="w-full border rounded-lg px-4 py-2 mb-6"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800"
        >
          Login
        </button>

      </div>

    </div>
  )
}

export default Login