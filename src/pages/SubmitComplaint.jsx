import Navbar from "../components/Navbar"
import { useState, useRef, use } from "react"
import { useNavigate } from "react-router-dom"
import { getComplaints, saveComplaints } from "../data/mockData"
import { useCallback } from "react"

function SubmitComplaint() {

  const navigate = useNavigate()

  const [complaint, setComplaint] = useState("")
  const [location, setLocation] = useState("")
  const [language, setLanguage] = useState("en-IN")
  const [listening, setListening] = useState(false)
  const [error, setError] = useState("")

  

  const recognitionRef = useRef(null)

  const languages = [
    { code: "en-IN", name: "English" },
    { code: "hi-IN", name: "Hindi" },
    { code: "bn-IN", name: "Bengali" },
    { code: "gu-IN", name: "Gujarati" },
    { code: "kn-IN", name: "Kannada" },
    { code: "ml-IN", name: "Malayalam" },
    { code: "mr-IN", name: "Marathi" },
    { code: "or-IN", name: "Odia" },
    { code: "pa-IN", name: "Punjabi" },
    { code: "ta-IN", name: "Tamil" },
    { code: "te-IN", name: "Telugu" },
    { code: "ur-IN", name: "Urdu" }
  ]

  const startListening = () => {

  setError("")

  const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition

  if (!SpeechRecognition) {
    setError(
      "Speech recognition is not supported in this browser. Please use Google Chrome."
    )
    return
  }

  // STOP
  if (listening) {

    setListening(false)

    if (recognitionRef.current) {
      recognitionRef.current.stop()
      recognitionRef.current = null
    }

    return
  }

  // START
  const recognition = new SpeechRecognition()

  recognitionRef.current = recognition

  recognition.lang = language
  recognition.continuous = false
  recognition.interimResults = true
  recognition.maxAlternatives = 1

  recognition.onstart = () => {
    setListening(true)
    setError("")
  }

  recognition.onresult = (event) => {

    let transcript = ""

    for (
      let i = event.resultIndex;
      i < event.results.length;
      i++
    ) {
      transcript += event.results[i][0].transcript
    }

    setComplaint(transcript)
  }

  recognition.onerror = (event) => {

    console.log("Speech recognition error:", event.error)

    setListening(false)
    recognitionRef.current = null

    if (event.error === "not-allowed") {
      setError(
        "Microphone permission was denied. Please allow microphone access in Chrome."
      )
    }
    else if (event.error === "no-speech") {
      setError(
        "No speech detected. Please try again."
      )
    }
    else if (event.error === "audio-capture") {
      setError(
        "Microphone could not be detected."
      )
    }
    else if (event.error === "network") {
      setError(
        "Speech recognition needs an internet connection."
      )
    }
    else if (event.error !== "aborted") {
      setError(
        "Could not recognize your speech. Please try again."
      )
    }
  }

  recognition.onend = () => {

    setListening(false)
    recognitionRef.current = null
  }

  try {

    recognition.start()

  } catch (error) {

    console.log(error)

    setListening(false)
    recognitionRef.current = null

    setError(
      "Could not start the microphone. Please try again."
    )
  }
}
  const fetchModelResponse = useCallback(async (prompt) => {
    try {
      const encodedPrompt = encodeURIComponent(prompt);
      const response = await fetch(`http://localhost:8080/api/complaint/registerComplaint` , {
          method: "POST",

          headers: {
                "Content-Type": "application/json"
          },

            body: JSON.stringify({
                id : 1,
                name : "Aryan",
                problem : prompt
            })
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      console.log(response);
      console.log("hello");
  
      const data = await response.json();
      console.log(data);
      return data;


    } catch (error) {
      return `Error: ${error.message}`;
    }
  }, []);

  const handleSubmit = (e) => {
   

    e.preventDefault()

    if (!complaint.trim()) {

      alert("Please enter or speak your complaint.")

      return
    }

    const data = fetchModelResponse(complaint);





    const existingComplaints = getComplaints()

    const newComplaint = {

      id: Date.now(),

      title: "apka_problemSOlver",

      description: data.problem,

      category: "--",

      department: data.department,

      priority: data.severity,

      status: "submited",

      date: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
      }),

      location: data.location,

      language: language
    }
  
     
     
      alert("Complaint submitted successfully!")
       navigate(`/complaints/${newComplaint.id}`)
    
    


    

   
  }

  return (

    <div>

      <Navbar />

      <main className="max-w-3xl mx-auto p-6">

        <h1 className="text-3xl font-bold mb-2">
          Submit Complaint
        </h1>

        <p className="text-gray-500 mb-6">
          Speak or type your civic problem in your preferred language.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow"
        >

          {/* Language */}

          <label className="block font-medium mb-2">
            Select Language
          </label>

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full border rounded-lg px-4 py-3 mb-5"
            disabled={listening}
          >

            {languages.map((item) => (

              <option
                key={item.code}
                value={item.code}
              >
                {item.name}
              </option>

            ))}

          </select>

          {/* Complaint */}

          <label className="block font-medium mb-2">
            Describe your complaint
          </label>

          <textarea
            value={complaint}
            onChange={(e) => setComplaint(e.target.value)}
            placeholder="Speak or type your complaint..."
            className="w-full border rounded-lg p-4 h-40 resize-none"
            required
          />

          {/* Microphone */}

          <button
            type="button"
            onClick={startListening}
            className={`mt-4 px-6 py-3 rounded-lg text-white ${
              listening
                ? "bg-red-600"
                : "bg-blue-700 hover:bg-blue-800"
            }`}
          >

            {listening
              ? "🛑 Stop Listening"
              : "🎙️ Speak Complaint"}

          </button>

          {/* Listening indicator */}

          {listening && (

            <div className="mt-3 p-3 bg-blue-50 rounded-lg">

              <p className="text-blue-700 font-medium">
                🎙️ Listening...
              </p>

              <p className="text-sm text-gray-500">
                Speak clearly in {languages.find(
                  item => item.code === language
                )?.name}.
              </p>

            </div>

          )}

          {/* Error */}

          {error && (

            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">

              <p className="text-red-700 text-sm">
                ⚠️ {error}
              </p>

            </div>

          )}

          {/* Location */}

          <label className="block font-medium mt-5 mb-2">
            Location
          </label>

          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter your area"
            className="w-full border rounded-lg px-4 py-3"
            required
          />

          {/* Submit */}

          <button
            type="submit"
            className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
          >
            Submit Complaint
          </button>

        </form>

      </main>

    </div>
  )
}

export default SubmitComplaint