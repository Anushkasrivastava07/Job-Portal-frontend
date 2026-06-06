function JobCard({ job, onDelete }) {
  function handleApply() {
    alert(`Applied to ${job.company} for ${job.title}! `);
  }

  return (
    <div
      style={{
        background: "white",
        width: "360px",
        margin: "16px auto",
        padding: "18px",
        borderRadius: "14px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.10)",
        fontFamily: "Arial",
        border: "1px solid #eee",
      }}
    >
      {/* Title */}
      <h3
        style={{
          margin: "0 0 6px 0",
          fontSize: "18px",
          color: "#111",
        }}
      >
        {job.title}
      </h3>

      {/* Company */}
      <p
        style={{
          margin: "4px 0",
          color: "#555",
          fontSize: "14px",
          fontWeight: "500",
        }}
      >
        {job.company}
      </p>

      {/* Location */}
      <p
        style={{
          margin: "4px 0 12px 0",
          color: "#777",
          fontSize: "13px",
        }}
      >
         {job.location}
      </p>

      {/* Button */}
      <button
        onClick={handleApply}
        style={{
          width: "100%",
          padding: "10px",
          border: "none",
          borderRadius: "10px",
          background: "#2563eb",
          color: "white",
          fontSize: "14px",
          fontWeight: "600",
          cursor: "pointer",
          transition: "0.2s",
        }}
        onMouseOver={(e) => (e.target.style.background = "#1d4ed8")}
        onMouseOut={(e) => (e.target.style.background = "#2563eb")}
      >
        Apply Now
      </button>
      <button
      onClick={() => onDelete(job.id)}
      style={{
        padding: "8px 16px",
        background:"#455d81",
        color: "white",
        borderRadius: "16px",
        marginTop: "10px",
        cursor: "pointer"
      }}
      >
      Delete
      </button>
    </div>
  );
}

export default JobCard;