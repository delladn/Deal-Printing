import React, { useState } from "react";
import About from './components/About';
import Client from './components/Client';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import ProductAndServices from './components/ProductAndServices';
import OrderForm from './components/OrderForm';
import AdminOrders from './components/AdminOrders';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  };

  const toggleAdmin = () => {
    const pw = prompt("Masukkan password admin:");
    if (pw === "1234") setIsAdmin(!isAdmin);
    else alert("Password salah!");
  };

  return (
    <div className="bg-slate-100 dark:bg-slate-900 min-h-screen">
      <Navbar toggleDarkMode={toggleDarkMode} />

      <div className="max-w-6xl mx-auto px-5 py-4 flex justify-end gap-3">
        <button
          onClick={toggleAdmin}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {isAdmin ? "Kembali ke User" : "Halaman Admin"}
        </button>
      </div>

      {isAdmin ? (
        <AdminOrders />
      ) : (
        <>
          <About />
          <ProductAndServices />
          <Client />
          <Contact />
          <OrderForm />
        </>
      )}

      <Footer />
    </div>
  );
};

export default App;
