import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Import Pages
import Login from './pages/Login/Login';
import Event from './pages/Event/Event';
import AuthCallback from './pages/AuthCallback/AuthCallback';

// Warning Component (shown on desktop/large screens)
const MobileWarning = () => (
  <div className="mobile-warning-overlay">
    <div className="mobile-warning-card">
      <div className="warning-icon">📱</div>
      <h2>Mobile View Only</h2>
      <p>This experience is designed for mobile screens.</p>
      <p className="sub-text">Please open on your phone or resize your browser window.</p>
    </div>
  </div>
);

function App() {
  // Track if screen is mobile width (<= 768px)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Show warning on non-mobile screens
  if (!isMobile) {
    return <MobileWarning />;
  }

  // Mobile: show the app with routing
  return (
    <Router>
      <Routes>
        
       <Route path="/" element={<Login />} />
       <Route path="/event" element={<Event />} />
       <Route path="/auth/callback" element={<AuthCallback />} />
        
        
        <Route path="*" element={<Event />} />
      </Routes>
    </Router>
  );
}

export default App;