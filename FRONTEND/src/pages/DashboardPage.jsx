import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirect to login if token is missing
      return;
    }

    const fetchUserDetails = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user details");
        }

        const data = await response.json();
        setUser(data.user);
      } catch (error) {
        console.error("Error fetching user details:", error);
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchUserDetails();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="p-4 bg-indigo-600 text-white">
        <h1 className="text-xl font-bold">Dashboard</h1>
      </header>
      <main className="p-8">
        {user ? (
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              Welcome, {user.name}!
            </h2>
            <p className="mt-2 text-gray-600">
              What would you like to do today?
            </p>
            <div className="mt-6 space-y-4">
              <button
                className="w-full px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
                onClick={() => navigate("/quizzes")}
              >
                Manage Quizzes
              </button>
              <button
                className="w-full px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
                onClick={() => navigate("/users")}
              >
                Manage Users
              </button>
              <button
                className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <p>Loading user details...</p>
        )}
      </main>
    </div>
  );
};

export default DashboardPage;
