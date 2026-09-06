import { useNavigate } from "react-router-dom"
import { useState } from "react";
import { API_URL } from "../api/api";
function OfficerLoginPage() {
  const[id , setId ] = useState();
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  
  const handleLogin = async (e) => {
        e.preventDefault();

        const response = await fetch(`${API_URL}/api/admin/login`, {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                Id : id,
                password: password
            })
        });

        const data = await response.json();
        console.log("Login response:", data);

        // Save JWT token
        localStorage.setItem("token1", data.token);
        if(data.success){
          navigate(`/officer`);
        }

        // Login successful
        console.log("Login successful");

        console.log(data);
    };

    return (
      <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-md w-96">
          <h1 className="text-3xl font-bold text-center text-blue-700 mb-2">
            Problem Nirakaran
          </h1>
         

        
          <form onSubmit={handleLogin}>
            <label className="block mb-2 font-medium">
               Login Id
            </label>
            <input
                className=" w-full bg-blue-70  border rounded-lg px-4 py-2 mb-4"
                type="number"
                placeholder="login Id"
                value={id}
                onChange={(e) => setId(e.target.value)}
            />
            <label className="block mb-2 font-medium">
            Password
            </label>
            <input
              className=" w-full bg-blue-70  border rounded-lg px-4 py-2 mb-4"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" className="w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800">
              Login
            </button>

        </form>
        </div>

      </div>
    </>
    );
}

export default OfficerLoginPage;
//   const navigate = useNavigate()

//   const handleLogin = () => {
//     navigate("/dashboard")
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">

//       <div className="bg-white p-8 rounded-xl shadow-md w-96">

//         <h1 className="text-3xl font-bold text-center text-blue-700 mb-2">
//           CivicAI
//         </h1>

//         <p className="text-center text-gray-500 mb-6">
//           Smart Grievance System
//         </p>

//         <label className="block mb-2 font-medium">
//           Email
//         </label>

//         <input
//           type="email"
//           placeholder="Enter email"
//           className="w-full border rounded-lg px-4 py-2 mb-4"
//         />

//         <label className="block mb-2 font-medium">
//           Password
//         </label>

//         <input
//           type="password"
//           placeholder="Enter password"
//           className="w-full border rounded-lg px-4 py-2 mb-6"
//         />

//         <button
//           onClick={handleLogin}
//           className="w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800"
//         >
//           Login
//         </button>

//       </div>

//     </div>
//   )
// }

// export default Login