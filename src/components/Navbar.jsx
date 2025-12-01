import React from "react";

export default function Navbar({ toggleDarkMode }) {
  return (
    <nav className="bg-slate-100 dark:bg-slate-900 shadow-md">
      <div className="max-w-6xl mx-auto px-5 py-4 flex justify-between items-center">
        
        {/* LOGO KIRI */}
        <div className="flex items-center">
          <img
            src="/assets/logo/LOGO ARTHA.png"
            alt="Logo Artha"
            className="w-32 h-auto"
          />
        </div>

        {/* DARK MODE TOGGLE */}
        <button
          onClick={toggleDarkMode}
          className="bg-teal-500 text-white px-4 py-2 rounded"
        >
          Toggle Mode
        </button>
      </div>
    </nav>
  );
}
