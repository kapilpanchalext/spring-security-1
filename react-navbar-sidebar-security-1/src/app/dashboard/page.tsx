"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Dashboard = () => {

  const router = useRouter();
  const [data, setData] = useState<string>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:9001/student', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('Authorization')!,
          },
        });

        if (response.ok) {
          const contentType = response.headers.get('content-type');

          if (contentType && contentType.includes('application/json')) {
            const jsonData = await response.json();
            console.log('Parsed JSON data:', jsonData);
            setData(jsonData);
          } else {
            const text = await response.text();
            console.log('Non-JSON response:', text);
            setData(text);
          }
        } else {
          console.error('Error fetching data:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [router]);

  return (
    <>
      <h1>My Component</h1>
      <h2>{JSON.stringify(data, null, 2)}</h2>
    </>
  )
};

export default Dashboard;