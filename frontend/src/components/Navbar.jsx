import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div>
        <Link to="/dashboard">Dashboard</Link>
      </div>
      <div>
        <button onClick={logout}>Logout</button>
      </div>
    </nav>
  );
}