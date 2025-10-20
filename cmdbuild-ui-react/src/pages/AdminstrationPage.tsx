import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
  username: string;
  role: string;
  email: string;
}
/** This is just template code for the Administration Page */
const AdministrationPage: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("users");

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/");

    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_URL}/admin/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data);
      } catch (err: any) {
        setError("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [API_URL, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Navigation Bar */}
      <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-700">Administration</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </header>

      {/* Tabs */}
      <nav className="flex space-x-6 px-6 border-b bg-white">
        {["users", "roles", "settings", "logs"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-3 text-sm font-medium border-b-2 ${
              activeTab === tab
                ? "border-indigo-500 text-indigo-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </nav>

      {/* Content Section */}
      <main className="flex-1 p-6">
        {loading && <p className="text-gray-500">Loading data...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && (
          <>
            {activeTab === "users" && (
              <section>
                <h2 className="text-lg font-semibold mb-4">User Management</h2>
                <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="text-left py-2 px-3">Username</th>
                      <th className="text-left py-2 px-3">Email</th>
                      <th className="text-left py-2 px-3">Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length > 0 ? (
                      users.map((user) => (
                        <tr key={user.id} className="border-t hover:bg-gray-50">
                          <td className="py-2 px-3">{user.username}</td>
                          <td className="py-2 px-3">{user.email}</td>
                          <td className="py-2 px-3">{user.role}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={3}
                          className="py-3 text-center text-gray-500 italic"
                        >
                          No users found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </section>
            )}

            {activeTab === "roles" && (
              <section>
                <h2 className="text-lg font-semibold mb-4">Role Management</h2>
                <p className="text-gray-500">
                  Here you can define user roles and permissions (coming soon).
                </p>
              </section>
            )}

            {activeTab === "settings" && (
              <section>
                <h2 className="text-lg font-semibold mb-4">System Settings</h2>
                <p className="text-gray-500">
                  Manage configurations and preferences (coming soon).
                </p>
              </section>
            )}

            {activeTab === "logs" && (
              <section>
                <h2 className="text-lg font-semibold mb-4">System Logs</h2>
                <p className="text-gray-500">
                  View audit and access logs (coming soon).
                </p>
              </section>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t py-3 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Tecnoteca (Demo) | CMDBuild React Admin
      </footer>
    </div>
  );
};

export default AdministrationPage;
