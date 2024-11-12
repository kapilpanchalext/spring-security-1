"use client"
import React, { useState } from 'react';

const Dashboard = () => {

  const [accountData, setAccountData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dashboardHandler = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:9001/myAccount?email=happy@example.com');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setAccountData(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1>Dashboard</h1>
      <button onClick={dashboardHandler}>Dashboard</button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {accountData && (
        <div>
          <h2>Account Details:</h2>
          <pre>{JSON.stringify(accountData, null, 2)}</pre>
        </div>
      )}
    </>
  )
};

export default Dashboard;