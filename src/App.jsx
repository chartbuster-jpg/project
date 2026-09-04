import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import Login from "./pages/Login"
import CitizenDashboard from "./pages/CitizenDashboard"
import SubmitComplaint from "./pages/SubmitComplaint"
import ComplaintHistory from "./pages/ComplaintHistory"
import ComplaintDetails from "./pages/ComplaintDetails"
import OfficerDashboard from "./pages/OfficerDashboard"
import Complaints from "./pages/Complaints"

function App() {

  return (
    <BrowserRouter>

      <Routes>

        {/* Default */}
        <Route
          path="/"
          element={<Navigate to="/login" />}
        />

        {/* Citizen */}
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/register"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={<CitizenDashboard />}
        />

        <Route
          path="/submit"
          element={<SubmitComplaint />}
        />

        <Route
          path="/history"
          element={<ComplaintHistory />}
        />

        {/* Shared complaint details */}
        <Route
          path="/complaints/:id"
          element={<ComplaintDetails />}
        />

        {/* Officer */}
        <Route
          path="/officer"
          element={<OfficerDashboard />}
        />

        <Route
          path="/officer/complaints"
          element={<Complaints />}
        />

      </Routes>

    </BrowserRouter>
  )
}

export default App
