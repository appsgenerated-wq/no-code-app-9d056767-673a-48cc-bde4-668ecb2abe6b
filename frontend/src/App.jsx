import React, { useState, useEffect } from 'react';
import Manifest from '@mnfst/sdk';
import LandingPage from './screens/LandingPage';
import DashboardPage from './screens/DashboardPage';
import './index.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [currentScreen, setCurrentScreen] = useState('landing');
  const [isBackendConnected, setBackendConnected] = useState(false);
  const manifest = new Manifest();

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await fetch('/api/health');
        if (response.ok) {
          setBackendConnected(true);
          // Check if user is already logged in
          manifest.from('User').me()
            .then(user => {
              if (user) {
                setCurrentUser(user);
                setCurrentScreen('dashboard');
              }
            })
            .catch(() => setCurrentUser(null));
        } else {
          setBackendConnected(false);
        }
      } catch (err) {
        setBackendConnected(false);
      }
    };
    checkBackend();
  }, []);

  const handleLogin = async (email, password) => {
    try {
      await manifest.login(email, password);
      const userRecord = await manifest.from('User').me();
      setCurrentUser(userRecord);
      setCurrentScreen('dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  const handleLogout = async () => {
    await manifest.logout();
    setCurrentUser(null);
    setRestaurants([]);
    setCurrentScreen('landing');
  };

  const loadRestaurants = async () => {
    try {
      const response = await manifest.from('Restaurant').find({ include: ['owner'], sort: { createdAt: 'desc' } });
      setRestaurants(response.data);
    } catch (error) {
      console.error('Failed to load restaurants:', error);
    }
  };

  const createRestaurant = async (restaurantData) => {
    try {
      const newRestaurant = await manifest.from('Restaurant').create(restaurantData);
      setRestaurants([newRestaurant, ...restaurants]);
    } catch (error) {
      console.error('Failed to create restaurant:', error);
      alert('Could not create restaurant. Please check the form and try again.');
    }
  };

  return (
    <div>
      <div className="fixed top-4 right-4 z-50 flex items-center space-x-2">
        <div className={`w-3 h-3 rounded-full ${isBackendConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
        <span className={`text-sm font-medium ${isBackendConnected ? 'text-gray-700' : 'text-red-600'}`}>
          {isBackendConnected ? 'Backend Connected' : 'Backend Disconnected'}
        </span>
      </div>
      
      {currentScreen === 'landing' || !currentUser ? (
        <LandingPage onLogin={handleLogin} />
      ) : (
        <DashboardPage 
          user={currentUser} 
          restaurants={restaurants} 
          onLogout={handleLogout} 
          onLoadRestaurants={loadRestaurants}
          onCreateRestaurant={createRestaurant}
        />
      )}
    </div>
  );
}

export default App;
