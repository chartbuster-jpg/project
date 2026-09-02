import { Link, useParams } from "react-router-dom"
import Navbar from "../components/Navbar"
import { getComplaints } from "../data/mockData"
import { useEffect ,useState } from "react"




function ComplaintDetails() {

  const { id } = useParams()
 
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
 
 useEffect(() => {
  async function fetchData() {
    try {
      
      const response = await fetch(
        `http://localhost:8080/api/complaint/my/${id}`,{
          method: "GET",
           headers: {
            "Authorization": `Bearer ${token}`
          }

        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();

      console.log(data);

      setComplaint(data);

    } catch (error) {
      console.log("You have an error:", error);
    } finally {
      setLoading(false);
    }
  }

  fetchData();
}, [id]);
  if (loading) {
  return <div>Loading...</div>;
  }

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
              Complaint #{complaint.id}
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
                  className={`w-4 h-4 rounded-full mt-1 ${
                    complaint.status === "In Progress" ||
                    complaint.status === "Resolved"
                      ? "bg-green-500"
                      : "bg-gray-300"
                  }`}
                />

                <div>
                  <p className="font-semibold">
                    In Progress
                  </p>
                  <p className="text-sm text-gray-500">
                    Department is working
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div
                  className={`w-4 h-4 rounded-full mt-1 ${
                    complaint.status === "Resolved"
                      ? "bg-green-500"
                      : "bg-gray-300"
                  }`}
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

export default ComplaintDetails