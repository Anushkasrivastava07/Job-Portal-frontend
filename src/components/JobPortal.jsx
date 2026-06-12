import React, { useState, useEffect } from 'react';
import JobCard from './JobCard';

const JobPortal = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form ke liye states
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [type, setType] = useState("Full stack");
  

  // Backend se jobs laane ke liye
  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`${import.meta.env.VITE_API_URL}/jobs`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch jobs');
        return res.json();
      })
      .then(data => {
        console.log("Backend se data aaya:", data);
        setJobs(data.data);
        setLoading(false);
      })
      .catch(err => {
        console.log("Error:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Nayi job add karne ke liye
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${import.meta.env.VITE_API_URL}/jobs`,{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        company,
        location,
        type,
        salary: salary ? parseInt(salary) : null
      })
    })
      .then(res => res.json())
      .then(data => {
        setJobs(prevJobs => [...prevJobs, data]);
        setTitle("");
        setCompany("");
        setLocation("");
        setSalary(""); 
      })
      .catch(err => console.log("Add job error:", err));
  };

  const handleDelete = async (id, e) => {
    console.log("Handle Delete Called", id);
    e.preventDefault();
    e.stopPropagation();
    try {
        await fetch(`${import.meta.env.VITE_API_URL}/jobs/${id}`,
        {
          method: 'DELETE'
        }
      );

      setJobs(prevJobs =>
        prevJobs.filter(job => job._id !== id)
      );

      console.log("Job deleted from frontend");
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(search.toLowerCase()) ||
    job.company.toLowerCase().includes(search.toLowerCase())
  );

  if (loading)
    return (
      <h2 style={{ textAlign: 'center', marginTop: '50px' }}>
        Loading jobs...
      </h2>
    );

  if (error)
    return (
      <h2
        style={{
          textAlign: 'center',
          marginTop: '50px',
          color: 'red'
        }}
      >
        Error: {error}
      </h2>
    );

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "1200px",
        margin: "0 auto"
      }}
    >
      <h1 style={{ textAlign: "center" }}>
        DevJobs Portal
      </h1>

      {/* Add Job Form */}
      <form
        onSubmit={handleSubmit}
        style={{
          marginBottom: "30px",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          background: "#2d2d2d"
        }}
      >
        <h3 style={{ marginTop: "0" }}>
          Post a Job
        </h3>

        <input
          type="text"
          placeholder="Job Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{
            margin: "5px",
            padding: "10px",
            width: "200px",
            borderRadius: "4px",
            border: "1px solid #ccc"
          }}
        />

        <input
          type="text"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
          style={{
            margin: "5px",
            padding: "10px",
            width: "200px",
            borderRadius: "4px",
            border: "1px solid #ccc"
          }}
        />
        <input 
        type="text"
        placeholder="location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
        style={{
          margin: "5px",
          padding: "10px",
          width: "200px",
          borderRadius: "4px",
          border: "1px solid #ccc"
        }}
        />
        <select 
        value={type}
        onChange={(e) => setType(e.target.Value)}
        reuired
        style={{
          margin: "5px",
          padding: "10px",
          width: "200px",
          borderRadius: "4px",
          border: "1px solid #ccc"
        }}
        >
       <option value="Full-Time">Full-time</option>
       <option value="Part-time">Part-time</option>
       <option value="Internship">Internship</option>
       <option value="Contract">Contract</option>
       <option value="Full stack">Full stack</option>
        </select>

        <div className="flex flex-row gap-2">
  <input 
    type="number" 
    placeholder="Salary" 
    value={salary}
    onChange={(e) => setSalary(e.target.value)}
    required 
    className="flex-1 p-2 border rounded"
  />
  <button 
    type="submit" 
    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full sm:w-auto"
  >
    Add Job
  </button>
</div>
      </form>

      {/* Search Box */}
      <input
        type="text"
        placeholder="Search jobs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "20px",
          borderRadius: "6px",
          border: "1px solid #ccc"
        }}
      />

      {/* Job List */}
      <div style={{ display: "grid", gap: "15px" }}>
        {loading && (
          <h3 style={{ textAlign: "center" }}>
            Loading jobs...
          </h3>
        )}

        {error && (
          <h3
            style={{
              textAlign: "center",
              color: "red"
            }}
          >
            Error: {error}
          </h3>
        )}

        {!loading &&
        !error &&
        filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
              onDelete={handleDelete}
            />
          ))
        ) : !loading && !error ? (
          <h3 style={{ textAlign: "center" }}>
            No jobs found
          </h3>
        ) : null}
      </div>
    </div>
  );
};

export default JobPortal;