import React from 'react';
import { Navbar } from './Navbar';

export function Layout({ children }) {
  return (
    <div className="container mx-auto">
      <Navbar />
      {children}
    </div>
  );
}
