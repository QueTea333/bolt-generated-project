import { useState, useEffect } from 'react';
    import { AuthProvider } from './context/AuthContext';
    import { Routes, Route } from 'react-router-dom';
    import Login from './components/Login';
    import Dashboard from './components/Dashboard';
    import ProtectedRoute from './components/ProtectedRoute';

    function App() {
      return (
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthProvider>
      );
    }

    export default App
