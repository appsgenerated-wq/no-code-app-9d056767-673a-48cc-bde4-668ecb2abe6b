import React, { useEffect, useState } from 'react';
import config from '../constants.js';

const DashboardPage = ({ user, restaurants, onLogout, onLoadRestaurants, onCreateRestaurant }) => {
  const [newRestaurant, setNewRestaurant] = useState({ name: '', description: '', address: '', cuisine: 'American' });

  useEffect(() => {
    onLoadRestaurants();
  }, [onLoadRestaurants]);

  const handleCreateRestaurant = async (e) => {
    e.preventDefault();
    if (!newRestaurant.name || !newRestaurant.address) {
        alert('Restaurant name and address are required.');
        return;
    }
    await onCreateRestaurant(newRestaurant);
    setNewRestaurant({ name: '', description: '', address: '', cuisine: 'American' });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-8 bg-white p-4 rounded-lg shadow">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome, {user.name}!</h1>
            <p className="text-gray-600">Your role: <span className='font-mono bg-gray-200 px-2 py-1 rounded'>{user.role}</span></p>
          </div>
          <div className="space-x-4">
             <a 
              href={`${config.BACKEND_URL}/admin`} 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200"
            >
              Admin
            </a>
            <button 
              onClick={onLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition duration-200"
            >
              Logout
            </button>
          </div>
        </header>
        
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Add a New Restaurant</h2>
              <form onSubmit={handleCreateRestaurant} className="space-y-4">
                <input
                  type="text"
                  placeholder="Restaurant Name"
                  value={newRestaurant.name}
                  onChange={(e) => setNewRestaurant({...newRestaurant, name: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  required
                />
                <textarea
                  placeholder="Description"
                  value={newRestaurant.description}
                  onChange={(e) => setNewRestaurant({...newRestaurant, description: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  rows="3"
                />
                 <input
                  type="text"
                  placeholder="Address"
                  value={newRestaurant.address}
                  onChange={(e) => setNewRestaurant({...newRestaurant, address: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  required
                />
                <select value={newRestaurant.cuisine} onChange={(e) => setNewRestaurant({...newRestaurant, cuisine: e.target.value})} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white">
                    <option>Italian</option>
                    <option>Mexican</option>
                    <option>Japanese</option>
                    <option>Indian</option>
                    <option>American</option>
                    <option>Other</option>
                </select>
                <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-md font-bold hover:bg-blue-700 transition duration-200">
                  Add Restaurant
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">All Restaurants</h2>
              {restaurants.length === 0 ? (
                <p className="text-gray-500 italic">No restaurants found. Add one to get started!</p>
              ) : (
                <div className="space-y-4">
                  {restaurants.map(restaurant => (
                    <div key={restaurant.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                      <h3 className="font-bold text-lg text-gray-900">{restaurant.name}</h3>
                      <p className="text-gray-600 text-sm mb-2">{restaurant.address}</p>
                      <p className="text-gray-700">{restaurant.description}</p>
                      <div className="mt-2 flex justify-between items-center text-xs text-gray-500">
                         <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-semibold">{restaurant.cuisine}</span>
                         <span>Owner: {restaurant.owner?.name || 'N/A'}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
