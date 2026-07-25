import { Send } from "lucide-react";
import { useState,useEffect } from "react";
import { API_BASE_URL } from "../config";
export default function LeadForm() {

const [formData, setFormData] = useState({
  name: "",
  email: "",
  budget: "",
  message: "",
});
const [submitted, setSubmitted] = useState(false);
const [loading, setLoading] = useState(false);
useEffect(() => {
  if (submitted) {
    const timer = setTimeout(() => {
      setSubmitted(false);
    }, 5000);

    return () => clearTimeout(timer);
  }
}, [submitted]);
const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};



const handleSubmit = async (e) => {
  e.preventDefault();

  setLoading(true);

try {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";
  const cleanBaseUrl = baseUrl.replace(/\/$/, "");

  const response = await fetch(`${cleanBaseUrl}/admin/leads`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error(`Server returned ${response.status}`);
  }

  const data = await response.json();
  console.log("Lead submitted successfully:", data);
} catch (error) {
  console.error("Failed to submit lead:", error);
}

    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      budget: "",
      message: "",
    });

  // } catch (error) {
  //   alert("Something went wrong!");
  //   console.error(error);
  // }

  setLoading(false);
};

  return (
    <div className="bg-white rounded-3xl shadow-xl p-10">

      <h2 className="text-4xl font-bold text-center">
        Get a Free Consultation
      </h2>

      <p className="text-center text-gray-500 mt-3 mb-8">
        Fill out the form below and we'll contact you soon.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">

        <div>
          <label className="font-semibold">Full Name</label>

          <input
  type="text"
  name="name"
  value={formData.name}
  onChange={handleChange}
  placeholder="Enter your full name"
  className="mt-2 w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-indigo-500"
/>
        </div>

        <div>
          <label className="font-semibold">Email Address</label>

          <input
  type="email"
  name="email"
  value={formData.email}
  onChange={handleChange}
  placeholder="Enter your email"
  className="mt-2 w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-indigo-500"
/>
        </div>

        <div>
          <label className="font-semibold">Budget Range</label>

          <select
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="mt-2 w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-indigo-500"
          >
            <option value="">Select budget range</option>
            <option>£500 - £1,000</option>
            <option>£1,000 - £5,000</option>
            <option>£5,000+</option>
          </select>
        </div>

        <div>
          <label className="font-semibold">Message</label>
<textarea
  name="message"
  value={formData.message}
  onChange={handleChange}
  rows="5"
  placeholder="Tell us about your project..."
  className="mt-2 w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-indigo-500"
/>
        </div>

       <button
  type="submit"
  disabled={loading}
  className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-semibold"
>
  {loading ? "Submitting..." : "Submit Enquiry"}
</button>

      </form>

      {/* {submitted && (
        <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4">
          <h3 className="text-lg font-semibold text-green-700">
            ✅ Thank you!
          </h3>

          <p className="mt-2 text-green-700">
            Your enquiry has been submitted successfully.
            We'll contact you soon through email.
          </p>
        </div>
      )} */}
      {submitted && (
  <div className="relative mt-6 rounded-xl border border-green-200 bg-green-50 p-5">

    <button
      onClick={() => setSubmitted(false)}
      className="absolute top-3 right-3 text-green-700 hover:text-red-500 text-xl font-bold"
    >
      ✕
    </button>

    <h3 className="text-lg font-semibold text-green-700 flex items-center gap-2">
      ✅ Thank you!
    </h3>

    <p className="mt-2 text-green-700">
      Your enquiry has been submitted successfully.
      We'll contact you soon through email.
    </p>

  </div>
)}

    </div>
  );
}