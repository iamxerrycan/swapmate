import React from 'react';
import './ButtonLoader.css';

export default function ButtonLoader({ isLoading, text }) {
  return (
    <button type="submit" disabled={isLoading}>
      <div className="btn-inner">
        {isLoading && <span className="spinner"></span>}
        <span className="btn-text">{isLoading ? `${text}...` : text}</span>
      </div>
    </button>
  );
}
