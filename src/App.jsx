import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PostJob from "./pages/PostJob";

function App() {
  return (
    <BrowserRouter>
      {/* Navbar */}
      <nav style={{
        display: "flex", 
        justifyContent: "space-between", 
        padding: "16px 40px", 
        background: "#111827", 
        color: "white",
        alignItems: "center",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
      }}>
        <h2 style={{margin: 0, fontSize: "24px", fontWeight: "700"}}>
          DevJobs
        </h2>
        <div style={{display: "flex", gap: "30px"}}>
          <Link 
            to="/" 
            style={{color: "white", textDecoration: "none", fontSize: "16px"}}
          >
            Home
          </Link>
          <Link 
            to="/post-job" 
            style={{color: "white", textDecoration: "none", fontSize: "16px"}}
          >
            Post a Job
          </Link>
          <Link 
            to="/login" 
            style={{color: "white", textDecoration: "none", fontSize: "16px"}}
          >
            Login
          </Link>
        </div>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;