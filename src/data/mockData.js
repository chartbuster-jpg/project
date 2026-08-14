export const complaints = [
  {
    id: 101,
    title: "No water supply for three days",
    description: "मेरे इलाके में पिछले 3 दिनों से पानी नहीं आ रहा है।",
    category: "Water Supply",
    department: "Water Department",
    priority: "HIGH",
    status: "In Progress",
    date: "13 Aug 2026",
    location: "Bhopal"
  },
  {
    id: 102,
    title: "Garbage not collected",
    description:
      "Garbage has not been collected from our street for four days.",
    category: "Garbage",
    department: "Sanitation Department",
    priority: "MEDIUM",
    status: "Assigned",
    date: "12 Aug 2026",
    location: "Bhopal"
  },
  {
    id: 103,
    title: "Street light not working",
    description:
      "The street light near the main road has not been working.",
    category: "Street Light",
    department: "Electricity Department",
    priority: "LOW",
    status: "Resolved",
    date: "10 Aug 2026",
    location: "Bhopal"
  }
]

export function getComplaints() {
  const savedComplaints = localStorage.getItem("complaints")

  if (savedComplaints) {
    return JSON.parse(savedComplaints)
  }

  localStorage.setItem("complaints", JSON.stringify(complaints))

  return complaints
}

export function saveComplaints(data) {
  localStorage.setItem("complaints", JSON.stringify(data))
}