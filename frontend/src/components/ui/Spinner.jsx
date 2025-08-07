// src/components/ui/Spinner.jsx
import React from 'react';
import './Spinner.css';

export default function Spinner({ small = false }) {
  return (
    <div className={small ? 'spinner-inline' : 'spinner'}>
      <div className="lds-dual-ring"></div>
    </div>
  );
}
