"use client";

import { useState, useEffect } from 'react';

export function useBackendStatus() {
  const [status, setStatus] = useState({
    isConnected: false,
    isChecking: true,
    error: null
  });

  useEffect(() => {
    const checkBackend = async () => {
      try {
        // Try to connect to the Django admin endpoint which doesn't require auth
        const response = await fetch('http://localhost:8000/admin/', {
          method: 'GET',
        });

        // Even a 401 unauthorized response means the backend is running
        setStatus({
          isConnected: response.ok || response.status === 401,
          isChecking: false,
          error: null
        });
      } catch (error) {
        console.error('Backend connection error:', error);
        setStatus({
          isConnected: false,
          isChecking: false,
          error: error.message
        });
      }
    };

    checkBackend();
  }, []);

  return status;
} 