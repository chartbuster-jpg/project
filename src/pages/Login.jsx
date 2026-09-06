import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { API_URL } from "../api/api";
function Login() {
  const { pathname } = useLocation()
  const [mode, setMode] = useState(pathname === "/register" ? "register" : "login")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("citizen")
  const [error, setError] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault(); setError(""); setSubmitting(true)
    try {
      const endpoint = mode === "login" ? "login" : "register"
      const body = mode === "login" ? { email, password } : { name, email, password }
      const response = await fetch(`${API_URL}/api/auth/${endpoint}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
      const data = await response.json()
      if (data.success) {
        localStorage.setItem("token", data.token)
        navigate("/dashboard")
      }
      else setError(data.message || "We could not complete your request. Please try again.")
    } catch { setError("Unable to connect to the service. Please try again shortly.") }
    finally { setSubmitting(false) }
  }
  const switchMode = (nextMode) => { setMode(nextMode); setError("") }

  return <main className="auth-page">
    <section className="auth-panel auth-panel--intro">
      <div className="brand-mark">PN</div><p className="eyebrow">A better civic experience</p>
      <h1>Every local problem deserves a clear path forward.</h1>
      <p className="auth-intro-copy">Report, follow, and resolve civic concerns from one simple place.</p>
      <div className="auth-features"><span>Voice-enabled reporting</span><span>Real-time tracking</span><span>Clear status updates</span></div>
    </section>
    <section className="auth-panel auth-panel--form"><div className="auth-card">
      <div className="auth-card-heading"><p className="eyebrow">Problem Nivaran</p><h2>{mode === "login" ? "Welcome back" : "Create your account"}</h2><p>{mode === "login" ? "Sign in to track your complaints." : "Join to report issues in your community."}</p></div>
      <div className="auth-tabs" role="tablist" aria-label="Authentication options"><button className={mode === "login" ? "is-active" : ""} onClick={() => switchMode("login")} type="button">Sign in</button><button className={mode === "register" ? "is-active" : ""} onClick={() => switchMode("register")} type="button">Register</button></div>
      <form onSubmit={handleSubmit} className="auth-form">
        {mode === "register" && <label>Full name<input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required /></label>}
        {/* <label>Continue as
          <span className="select-field">
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="citizen">Citizen</option>
              <option value="officer">Officer</option>
            </select>
          </span>
        </label> */}
        <label>Email address<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required /></label>
        <label>Password<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required /></label>
        {error && <p className="form-error" role="alert">{error}</p>}<button className="auth-submit" type="submit" disabled={submitting}>{submitting ? "Please wait..." : mode === "login" ? "Sign in" : "Create account"}</button>
        
      </form>
      <div className=" py-3  justify-center  hover:bg-gray-50">
          <Link to="/officerLogin" className=" block border rounded-lg shadow-md py-2 text-center   justify-center align-middle hover:bg-gray-50">Login as Admin</Link>
      </div>
      
    </div></section>
  </main>
}
export default Login
