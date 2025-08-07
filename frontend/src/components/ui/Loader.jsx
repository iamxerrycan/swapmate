// components/Loader.jsx
import React from 'react';
import './Loader.css'; // import the spinner styles

const Loader = ({ fullHeight = false }) => {
  return (
    <div
      className="loader-overlay-loader"
      style={{ minHeight: fullHeight ? '100vh' : '200px' }}
    >
      <div className="spinner-loader" />
    </div>
  );
};

export default Loader;
