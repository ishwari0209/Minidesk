import { Search, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
export default function AdminDashboard() {
const [leads, setLeads] = useState([]);
const [filteredLeads, setFilteredLeads] = useState([]);
const [selectedLead, setSelectedLead] = useState(null);
const [search, setSearch] = useState("");
const [statusFilter, setStatusFilter] = useState("");
const navigate = useNavigate();
const handleLogout = () => {

  const confirmLogout = window.confirm(
    "Are you sure you want to logout?"
  );

  if (!confirmLogout) return;

  localStorage.removeItem("token");

  navigate("/");

};
useEffect(() => {
  fetchLeads();
}, []);
const updateStatus = async (leadId, status) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `http://127.0.0.1:8000/admin/leads/${leadId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update status");
    }

    // Refresh the table after updating
    fetchLeads();

  } catch (error) {
    console.error(error);
    alert("Could not update lead status.");
  }
};
const fetchLeads = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      "http://127.0.0.1:8000/admin/leads",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    setLeads(data);
    setFilteredLeads(data);

  } catch (error) {
    console.error(error);
  }
};
useEffect(() => {

  let result = leads;

  if (search !== "") {
    result = result.filter(
      (lead) =>
        lead.name.toLowerCase().includes(search.toLowerCase()) ||
        lead.email.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (statusFilter !== "") {
    result = result.filter(
      (lead) => lead.status === statusFilter
    );
  }

  setFilteredLeads(result);

}, [search, statusFilter, leads]);
  return (
    <div className="min-h-screen bg-slate-100">

      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-5">

          <div>
            <h1 className="text-3xl font-bold">
              <span className="text-gray-900">Lead</span>
              <span className="text-indigo-600">Desk</span>
            </h1>

            <p className="text-sm text-gray-500">
              Admin Dashboard
            </p>
          </div>

          <button
  onClick={handleLogout}
  className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl transition"
>
  <LogOut size={18} />
  Logout
</button>

        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-8 py-10">

        {/* Stats */}
        <div className="grid grid-cols-4 gap-6">

          <div className="bg-white rounded-2xl shadow-md p-6">
            <p className="text-gray-500 text-sm">
              Total Leads
            </p>

            <h2 className="text-4xl font-bold mt-2">
  {leads.length}
</h2>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
           <p className="text-gray-500 text-sm">
  Pending
</p>

<h2 className="text-4xl font-bold text-yellow-500 mt-2">
  {leads.filter((lead) => lead.status === "Pending").length}
</h2>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <p className="text-gray-500 text-sm">
              Contacted
            </p>

            <h2 className="text-4xl font-bold text-blue-600 mt-2">
  {leads.filter((lead) => lead.status === "Contacted").length}
</h2>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <p className="text-gray-500 text-sm">
              Closed
            </p>

            <h2 className="text-4xl font-bold text-green-600 mt-2">
  {leads.filter((lead) => lead.status === "Closed").length}
</h2>
          </div>

        </div>

        {/* Search */}

        <div className="bg-white rounded-2xl shadow-md mt-8 p-6">

          <div className="flex justify-between items-center mb-6 gap-4">

  {/* Search Box */}
  <div className="relative flex-1">

    <Search
      size={20}
      className="absolute left-4 top-4 text-gray-400"
    />

    <input
  type="text"
  placeholder="Search by name or email..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="w-full border rounded-xl py-3 pl-12 pr-4 outline-none focus:border-indigo-600"
/>

  </div>

  {/* Filter */}
  <select
  value={statusFilter}
  onChange={(e) => setStatusFilter(e.target.value)}
  className="border rounded-xl px-5 py-3 outline-none focus:border-indigo-600 bg-white"
>
  <option value="">All Status</option>
  <option value="Pending">Pending</option>
  <option value="Contacted">Contacted</option>
  <option value="Closed">Closed</option>
</select>

</div>

          {/* Table */}

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="border-b text-left">

                  <th className="py-4">Name</th>

                  <th>Email</th>

                  <th>Budget</th>

                  <th>Message</th>

                  <th>Status</th>

                  <th>Action</th>

                </tr>

              </thead>

            <tbody>
  {filteredLeads.length === 0 ? (
    <tr>
      <td colSpan="6" className="text-center py-8 text-gray-500">
        No Leads Found
      </td>
    </tr>
  ) : (
    filteredLeads.map((lead) => (
      <tr key={lead.id} className="border-b hover:bg-gray-50">

        <td className="py-4 font-medium">
          {lead.name}
        </td>

        <td>{lead.email}</td>

        <td>{lead.budget}</td>

       <td>
 <button
  onClick={() => setSelectedLead(lead)}
  className="text-indigo-600 font-semibold hover:underline"
>
  View
</button>
</td>

        <td>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              lead.status === "Pending"
                ? "bg-yellow-100 text-yellow-700"
                : lead.status === "Contacted"
                ? "bg-blue-100 text-blue-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {lead.status}
          </span>
        </td>

        <td>
 <select
  value={lead.status}
  onChange={(e) => updateStatus(lead.id, e.target.value)}
  className="border rounded-lg px-3 py-2"
>
  <option value="Pending">Pending</option>
  <option value="Contacted">Contacted</option>
  <option value="Closed">Closed</option>
</select>
        </td>
            
      </tr>
    ))
  )}
</tbody>

            </table>

          </div>

        </div>

      </div>
      <Footer />
{selectedLead && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl p-8 relative">

      <button
        onClick={() => setSelectedLead(null)}
        className="absolute top-4 right-5 text-2xl font-bold text-gray-500 hover:text-red-500"
      >
        ×
      </button>

      <h2 className="text-2xl font-bold mb-6">
        Lead Details
      </h2>

      <div className="space-y-4">

        <div>
          <span className="font-semibold">Name:</span>
          <p>{selectedLead.name}</p>
        </div>

        <div>
          <span className="font-semibold">Email:</span>
          <p>{selectedLead.email}</p>
        </div>

        <div>
          <span className="font-semibold">Budget:</span>
          <p>{selectedLead.budget}</p>
        </div>

        <div>
          <span className="font-semibold">Status:</span>
          <p>{selectedLead.status}</p>
        </div>

        <div>
          <span className="font-semibold">Message:</span>

          <div className="mt-2 border rounded-xl p-4 bg-gray-50 max-h-52 overflow-y-auto">
            {selectedLead.message}
          </div>

        </div>

      </div>

      <button
        onClick={() => setSelectedLead(null)}
        className="mt-8 w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700"
      >
        Close
      </button>

    </div>

  </div>
)}
    </div>
  );
}