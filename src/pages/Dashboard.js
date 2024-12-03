import React, { useEffect, useState } from "react";
import { getUsers, getRoles } from "../services/api";

function Dashboard() {
  const [userCount, setUserCount] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [roleCount, setRoleCount] = useState(0);

  const fetchDashboardData = async () => {
    const userResponse = await getUsers();
    const roleResponse = await getRoles();

    setUserCount(userResponse.data.length);
    setActiveUsers(
      userResponse.data.filter((user) => user.status === "Active").length
    );
    setRoleCount(roleResponse.data.length);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-header">Admin Dashboard</h1>
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h2>{userCount}</h2>
          <p>Total Users</p>
        </div>
        <div className="dashboard-card">
          <h2>{activeUsers}</h2>
          <p>Active Users</p>
        </div>
        <div className="dashboard-card">
          <h2>{roleCount}</h2>
          <p>Total Roles</p>
        </div>
      </div>
      <div className="dashboard-links">
        <h2>Quick Links</h2>
        <ul>
          <li>
            <a href="/users">Manage Users</a>
          </li>
          <li>
            <a href="/roles">Manage Roles</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;