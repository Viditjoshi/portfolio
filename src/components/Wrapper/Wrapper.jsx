// components/Wrapper.jsx
import React from 'react';
import Header from '../Header';

const Wrapper = ({ children }) => {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Header />
      <main className="pt-20 md:pt-24">
        {children}
      </main>
    </div>
  );
};

export default Wrapper;