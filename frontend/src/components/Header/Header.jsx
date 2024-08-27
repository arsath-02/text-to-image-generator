// components/Header.js
import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <h1>Text to Image Generator</h1>
      <nav>
        <ul>
          <li>Text to Image</li>
          <li>History</li>
          <li>Settings</li>
          <li>Profile</li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
