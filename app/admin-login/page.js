"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginAdmin } from '../../lib/apiClient';
import { useBackendStatus } from '../../hooks/useBackend';

export default function AdminLogin() {
  const [email, setEmail] = useState('admin@agsavn.org');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const backendStatus = useBackendStatus();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await loginAdmin(email, password);
      
      // On success, redirect directly to Django admin
      window.location.href = 'http://localhost:8000/admin/';
    } catch (err) {
      console.error('Login failed:', err);
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
          <p className="mt-2 text-sm text-gray-600">
            Enter your credentials to access the admin panel
          </p>
        </div>

        {!backendStatus.isChecking && !backendStatus.isConnected && (
          <div className="p-4 text-sm text-red-600 bg-red-50 rounded-md">
            <p className="font-medium">Backend Connection Error</p>
            <p>Unable to connect to the backend at http://localhost:8000/admin/</p>
            <p className="mt-2 text-xs">{backendStatus.error}</p>
            <p className="mt-2">
              The Django backend server needs to be running. Please make sure it's started with:
              <pre className="mt-1 p-2 bg-gray-800 text-white rounded overflow-x-auto">
                python manage.py runserver 0.0.0.0:8000 --settings=agsavn_backend.local_settings
              </pre>
            </p>
          </div>
        )}

        {backendStatus.isConnected && (
          <div className="p-4 text-sm text-green-600 bg-green-50 rounded-md">
            <p className="font-medium">Backend Connected</p>
            <p>Successfully connected to Django backend at http://localhost:8000/admin/</p>
          </div>
        )}

        {error && (
          <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading || !backendStatus.isConnected}
              className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Default credentials: admin@agsavn.org / admin123
            </p>
          </div>
          
          <div className="mt-2 text-center">
            <p className="text-sm text-gray-600">
              Or access Django admin directly at: <a href="http://localhost:8000/admin/" className="text-indigo-600 hover:text-indigo-800" target="_blank" rel="noopener noreferrer">http://localhost:8000/admin/</a>
            </p>
          </div>
        </form>

        <div className="flex justify-center mt-6">
          <button 
            onClick={() => router.push('/')}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
} 