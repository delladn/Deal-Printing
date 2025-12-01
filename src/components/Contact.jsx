import React, { useState } from 'react';

const Contact = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const phoneNumber = '6281327679035';
    const encodedMessage = encodeURIComponent(
      `Nama: ${name}\nAlamat: ${address}\nPesan: ${message}`
    );

    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`);
    setName('');
    setAddress('');
    setMessage('');
  };

  return (
    <div id="contact" className="py-12 w-full sm:w-2/3 mx-auto">
      <h1 className="text-center poppins-bold text-2xl mb-10 text-slate-900 dark:text-slate-50">
        Hubungi Kami
      </h1>

      <form
        onSubmit={handleSubmit}
        className="w-full px-5 mx-auto flex flex-col gap-2 dark:text-slate-50"
      >
        <div>
          <label className="poppins-bold">Nama</label>
          <input
            className="w-full rounded-md p-2 dark:text-slate-900"
            placeholder="masukkan nama"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="poppins-bold">Alamat</label>
          <input
            className="w-full rounded-md p-2 dark:text-slate-900"
            placeholder="masukkan alamat"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="poppins-bold">Pesan</label>
          <textarea
            className="w-full rounded-md p-2 dark:text-slate-900"
            rows={5}
            placeholder="masukkan pesan"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>

        <button className="bg-teal-500 w-full p-3 rounded-full text-white poppins-bold my-5">
          Kirim
        </button>
      </form>

      {/* MAP ARTHA PRINTS */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-3 text-center text-slate-900 dark:text-slate-50">
          Lokasi Artha Prints
        </h2>

        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.243855591683!2d103.52005737399432!3d-1.6096884360630435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e2f6295174d3c39%3A0xa365e87c9bb6d938!2sARTHA%20PRINTS!5e0!3m2!1sid!2sid!4v1764534525686!5m2!1sid!2sid"
          width="100%"
          height="350"
          style={{ border: 0, borderRadius: '12px' }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
