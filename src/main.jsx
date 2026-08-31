import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import Login from "./pages/Login.jsx"
import Register from "./pages/register.jsx"

import "./index.css"
import App from "./App.jsx"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
)