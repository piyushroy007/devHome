import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Placeholder Components
const Home = () => (
  <div>
    <h1>Welcome to devHome</h1>
    <p>Find your coding match!</p>
    {/* TODO: Add Login/Signup buttons */}
  </div>
);

const Dashboard = () => (
  <div>
    <h1>Dashboard</h1>
    <p>Your matches and projects.</p>
    {/* TODO: Add Swipe functionality */}
  </div>
);

const NotFound = () => (
  <div>
    <h1>404</h1>
    <p>Page not found.</p>
  </div>
);

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* TODO: Add Header/Navbar here */}
        
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* TODO: Add more routes (e.g., /match, /chat, /profile) */}
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {/* TODO: Add Footer here */}
      </div>
    </Router>
  );
}

export default App;
