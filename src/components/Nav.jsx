function Nav() {
  return (
    <nav style={{background: "black", padding: "10px", display:"flex",justifyContent: "space-between"}}>
      <div>
      <h2 style={{color: "white",margin: 0}}>Job Portal</h2>
      </div>
      <div>
        <a href="/" style={{color: "white",margin: "0 10px",textDecoration: "none"}}>Home</a>
        <a href="/jobs" style={{color: "white",margin: "0 10px",textDecoration: "none"}}>Find jobs</a>
        <a href="/post-job" style={{color: "white",margin: "0 10px",textDecoration: "none"}}>Post a job</a>
        <a href="/login" style={{color: "white",margin: "0 10px",textDecoration: "none"}}>Login</a>
        <a href="/register" style={{color: "white",margin: "0 10px",textDecoration: "none"}}>Register</a>
      </div>
    </nav>
  );
}

export default Nav;