import { HashRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import TaskManager from "./pages/TaskManager";

function Navbar() {
  const location = useLocation();

  const navLinks = [
    { path: "/", label: "Dashboard" },
    { path: "/task", label: "Task Manager" },
  ];

  return (
    <nav className="min-h-16 p-3 bg-gray-900 text-white flex flex-wrap items-center gap-4 shadow-md">
      {/* Logo */}
      <img
        src="/STM.png"
        alt="STM"
        className="w-12 h-12 rounded-full object-cover"
      />

      {/* Navigation Buttons */}
      <div className="flex gap-4">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`px-4 py-2 rounded-2xl font-medium transition-all duration-300 ${
              location.pathname === link.path
                ? "bg-gray-800 text-white shadow-lg scale-105"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/task" element={<TaskManager />} />
      </Routes>
    </Router>
  );
}
