import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      background: '#f8f9fa',
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center',
      padding: '20px'
    }}>
      <h1 style={{ fontSize: '6rem', margin: '0', color: '#ff6b6b' }}>404</h1>
      <p style={{ fontSize: '1.5rem', margin: '10px 0', color: '#495057' }}>
        Oops! E Page na ba... 😢
      </p>
      <button
        onClick={() => navigate('/')}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          fontSize: '1rem',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}
      >
        Go to Home
      </button>
    </div>
  );
};

export default NotFound;
