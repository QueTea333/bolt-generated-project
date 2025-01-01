import React from 'react';
    import { useAuth } from '../context/AuthContext';

    const Dashboard = () => {
      const { user, signOut } = useAuth();

      const handleSignOut = async () => {
        try {
          await signOut();
        } catch (error) {
          console.error('Error signing out:', error);
        }
      };

      return (
        <div>
          <h2>Dashboard</h2>
          {user && <p>Welcome, {user.email}!</p>}
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      );
    };

    export default Dashboard;
