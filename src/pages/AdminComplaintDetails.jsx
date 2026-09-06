import { Link, useParams } from "react-router-dom"
import Navbar from "../components/Navbar"

import { useEffect ,useState ,  useRef  } from "react"

import { useComplaints } from "../pages/ComplaintContext";
import { API_URL } from "../api/api";




function AdminComplaintDetails() {

  const { id } = useParams()
const [action, setAction] = useState(null);
const [file, setFile] = useState(null);
const boxRef = useRef(null);

 
 
//   const [loading, setLoading] = useState(true);
//   const token = localStorage.getItem("token");
  const { complaints , setComplaints } = useComplaints();

    const complaint = complaints.find(
        (item) => item.incidentId === Number(id)
    );

   

 
//  useEffect(() => {
//   async function fetchData() {
//     try {
      
//       const response = await fetch(
//         `http://localhost:8080/api/complaint/my/${id}`,{
//           method: "GET",
//            headers: {
//             "Authorization": `Bearer ${token}`
//           }

//         }
//       );

//       if (!response.ok) {
//         throw new Error(`Error: ${response.status}`);
//       }

//       const data = await response.json();

//       console.log(data);

//       setComplaint(data);

//     } catch (error) {
//       console.log("You have an error:", error);
//     } finally {
//       setLoading(false);
//     }
//   }

//   fetchData();
// }, [id]);
//   if (loading) {
//   return <div>Loading...</div>;
//   }
useEffect(() => {
    const handleClickOutside = (event) => {

        if (boxRef.current && !boxRef.current.contains(event.target)) {
            setAction(null);
            setFile(null);
        }

    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };

}, []);

const openInProgress = () => {
    setAction("IN_PROGRESS");
};

const openResolved = () => {
    setAction("RESOLVED");
};
const submitInProgress = async () => {

    try {

        const token = localStorage.getItem("token1");

        const response = await fetch(
            `${API_URL}/api/complaint/${complaint.incidentId}/status`,
            {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    status: "IN_PROGRESS"
                })
            }
        );

        if (!response.ok) {
            throw new Error("Failed to update status");
        }
        const data = await response.json();

      console.log(data);

        // Update context
        setComplaints(prev =>
            prev.map(c =>
                c.id === complaint.id
                    ? { ...c, status: "IN_PROGRESS" }
                    : c
            )
        );

        setAction(null);

    } catch (error) {

        console.error("Error updating status:", error);

    }
};
const submitResolved = async () => {

    if (!file) {
        alert("Please select a proof image.");
        return;
    }

    try {

        const token = localStorage.getItem("token1");

        const formData = new FormData();

        formData.append("status", "RESOLVED");
        formData.append("evidence", file);

        const response = await fetch(
            `${API_URL}/api/complaint/${complaint.incidentId}/resolve`,
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: formData
            }
        );

        if (!response.ok) {
            throw new Error("Failed to resolve complaint");
        }

        // Update ComplaintContext
        setComplaints(prev =>
            prev.map(c =>
                c.id === complaint.id
                    ? { ...c, status: "RESOLVED" }
                    : c
            )
        );

        setAction(null);
        setFile(null);

    } catch (error) {

        console.error("Error resolving complaint:", error);

    }
};


  if (!complaint) {
    return (
      <div>
        <Navbar />

        <main className="max-w-4xl mx-auto p-6">
          <h1 className="text-2xl font-bold">
            Complaint not found
          </h1>

          <Link
            to="/history"
            className="text-blue-700 mt-4 inline-block"
          >
            Go back
          </Link>
        </main>
      </div>
    )
  }

  return (
    <div>

      <Navbar />

      <main className="max-w-5xl mx-auto p-6">

        <div className="flex justify-between items-center mb-6">

          <div>
            <p className="text-gray-500">
              Complaint #{complaint.incidentId}
            </p>

            <h1 className="text-3xl font-bold">
              {complaint.title}
            </h1>
          </div>

          <Link
            to="/history"
            className="border px-4 py-2 rounded-lg"
          >
            Back
          </Link>

        </div>

        <div className="grid md:grid-cols-3 gap-6">

          {/* Main complaint */}
          <div className="md:col-span-2 bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-bold mb-4">
              Complaint Description
            </h2>

            <p className="text-gray-700 leading-7">
              {complaint.description}
            </p>

            <div className="grid md:grid-cols-2 gap-4 mt-6">

              <div>
                <p className="text-sm text-gray-500">
                  Category
                </p>

                <p className="font-semibold">
                  {complaint.category}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Department
                </p>

                <p className="font-semibold">
                  {complaint.department}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Location
                </p>

                <p className="font-semibold">
                  {complaint.location}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Submitted
                </p>

                <p className="font-semibold">
                  {complaint.date}
                </p>
              </div>

            </div>

          </div>

          {/* Status */}
          <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-bold mb-6">
              Status
            </h2>

            <div className="space-y-6">

              <div className="flex gap-3">
                <div className="w-4 h-4 rounded-full bg-green-500 mt-1" />

                <div>
                  <p className="font-semibold">
                    Submitted
                  </p>
                  <p className="text-sm text-gray-500">
                    Complaint received
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-4 h-4 rounded-full bg-green-500 mt-1" />

                <div>
                  <p className="font-semibold">
                    Assigned
                  </p>
                  <p className="text-sm text-gray-500">
                    Sent to department
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div
                   type="button"
                  onClick={openInProgress}
                  className={`w-4 h-4 rounded-full mt-1 cursor-pointer ${
                  complaint.status === "IN_PROGRESS" || complaint.status === "RESOLVED"|| action === "IN_PROGRESS"
                  ? "bg-green-500"
                  : "bg-gray-300"
                } hover:bg-green-500`}
                />

                <div>
                  
                  <p className="text-sm text-gray-500">
                    In Progress
                  </p>
                  
               
                  <p className="text-sm text-gray-500">
                    Department is working
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div
                   onClick={openResolved}
    className={`w-4 h-4 rounded-full mt-1 cursor-pointer ${
        complaint.status === "RESOLVED"
            ? "bg-green-500"
            : "bg-gray-300"
    } hover:bg-green-500`}
                />

                <div>
                  <p className="font-semibold">
                    Resolved
                  </p>
                  <p className="text-sm text-gray-500">
                    Complaint completed
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>
        <div className="grid md:grid-cols-2 gap-6 mt-6">

    <div ref={boxRef}>

        {/* IN PROGRESS */}
        {action === "IN_PROGRESS" && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">

                <p className="font-semibold">
                    In Progress
                </p>

                <p className="text-sm">
                    This complaint is currently being addressed.
                </p>

                <button
                    type="button"
                    onClick={submitInProgress}
                    className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                    Submit Progress
                </button>

            </div>
        )}

        {/* RESOLVED */}
        {action === "RESOLVED" && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">

                <p className="font-semibold">
                    Resolve Complaint
                </p>

                <p className="text-sm mb-3">
                    Upload proof that the complaint has been resolved.
                </p>

                <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={(e) => setFile(e.target.files[0])}
                />

                <button
                    type="button"
                    onClick={submitResolved}
                    disabled={!file}
                    className="mt-3 px-4 py-2 bg-green-500 text-white rounded-lg disabled:bg-gray-400"
                >
                    Submit Resolution
                </button>

            </div>
        )}

    </div>

</div>
        

        {/* AI information */}
        <div className="bg-blue-50 rounded-xl p-6 mt-6">

          <h2 className="text-xl font-bold mb-4">
            AI Analysis
          </h2>

          <div className="grid md:grid-cols-3 gap-4">

            <div>
              <p className="text-sm text-gray-500">
                Category
              </p>
              <p className="font-semibold">
                {complaint.category}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Department
              </p>
              <p className="font-semibold">
                {complaint.department}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Priority
              </p>
              <p className="font-semibold">
                {complaint.priority}
              </p>
            </div>

          </div>

        </div>

      </main>

    </div>
  )
}

//complaint = {
// id 
// title 
// description 
//category
//department
// location
// date
//priority }

export default AdminComplaintDetails