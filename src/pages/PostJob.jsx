import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PostJob() {
  const [form, setForm] = useState({
    title: '', 
    company: '', 
    location: '', 
    type: ''
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/jobs', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(form)
    })
    .then(res => res.json())
    .then(() => {
      alert('Job Posted Successfully!');
      navigate('/'); // Home pe wapas bhej dega
    })
    .catch(err => console.log('Error:', err));
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