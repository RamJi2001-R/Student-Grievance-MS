import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import "../App.css";

export default function Dashboard () {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({});

  const fetchData = async () => {
    const res = await API.get("/grievances");
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/grievances", form);
      setForm({});
      fetchData();
    } catch (error) {
      console.error("Grievance submit failed:", error.response?.data || error.message);
      alert("Unable to submit grievance. Please try again.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="dashboard">
        <h2>Student Grievance Dashboard</h2>

        {/* Form */}
        <div className="form-card">
          <h3>Submit a New Grievance</h3>
          <form onSubmit={submit}>
            <input
              type="text"
              placeholder="Title"
              value={form.title || ""}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
            <textarea
              placeholder="Description"
              value={form.description || ""}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={4}
              required
            />
            <select
              value={form.category || "Other"}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              <option value="Academic">Academic</option>
              <option value="Hostel">Hostel</option>
              <option value="Transport">Transport</option>
              <option value="Other">Other</option>
            </select>
            <button type="submit">Submit Grievance</button>
          </form>
        </div>

        {/* List */}
        <div className="list-card">
          <h3>All Grievances</h3>
          {data.length === 0 ? (
            <p>No grievances submitted yet.</p>
          ) : (
            data.map((g) => (
              <div key={g._id} className="grievance-item">
                <b>{g.title}</b>
                <p>{g.description}</p>
                <p><strong>Category:</strong> {g.category}</p>
                <small>Status: {g.status}</small>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}