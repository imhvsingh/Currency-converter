import React from 'react';
import './Header.css'

export default function Header() {
  return (
    <div className="header">
      <div className="header-image">
        <img src="https://img.freepik.com/free-vector/indian-rupee-composition-with-flat-design_23-2147992019.jpg" alt="Currency" className="currency-image" />
      </div>
      <div className="header-titles">
        <h2>Currency</h2>
        <h2>Exchange</h2>
      </div>
    </div>
  );
}

export { Header };
