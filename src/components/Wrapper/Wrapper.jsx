// components/Wrapper.jsx
import React from 'react';
import Header from '../Header';
import { Outlet } from 'react-router-dom';

const Wrapper = () => {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Header />
      <main className="pt-20 md:pt-24">
        <Outlet /> {/* This is where child routes will render */}
      </main>
    </div>
  );
};

export default Wrapper;
