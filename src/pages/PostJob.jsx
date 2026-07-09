import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../api';

function PostJob() {
  const [form, setForm] = useState({
    title: '', 
    company: '', 
    location: '', 
    type: '',
    salary: ''
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await apiFetch(`${import.meta.env.VITE_API_URL}/jobs`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(form)
      }, 8000);

      await res.json();
      alert('Job Posted Successfully!');
      navigate('/'); // Home pe wapas bhej dega
    } catch (err) {
      console.log('Error:', err);
    }
  };

  return (
    <div style={{padding: "40px", maxWidth: "600px", margin: "0 auto"}}>
      <h2 style={{fontSize: "32px", marginBottom: "20px", textAlign: "center"}}>
        Post a Job
      </h2>
      
      <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column", gap: "15px"}}>
        <input 
          style={{padding: "10px", fontSize: "16px"}}
          placeholder="Job Title" 
          value={form.title}
          onChange={e => setForm({...form, title: e.target.value})} 
          required
        />
        <input 
          style={{padding: "10px", fontSize: "16px"}}
          placeholder="Company Name" 
          value={form.company}
          onChange={e => setForm({...form, company: e.target.value})} 
          required
        />
        <input 
          style={{padding: "10px", fontSize: "16px"}}
          placeholder="Location" 
          value={form.location}
          onChange={e => setForm({...form, location: e.target.value})} 
          required
        />
        <input 
          style={{padding: "10px", fontSize: "16px"}}
          placeholder="Job Type: Remote/Hybrid/Onsite" 
          value={form.type}
          onChange={e => setForm({...form, type: e.target.value})} 
          required
        />
        <input 
          type="number"
          style={{padding: "10px", fontSize: "16px"}}
          placeholder="Salary (in rupees)" 
          value={form.salary}
          onChange={e => setForm({...form, salary: Number(e.target.value)})} 
          required
        />
        <button
          type="submit" 
          style={{padding: "12px", background: "#3b82f6", color: "white", border: "none", cursor: "pointer", fontSize: "16px"}}
        >
          Post Job
        </button>
      </form>
    </div>
  );
}

export default PostJob;