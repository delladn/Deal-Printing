export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-10 mt-20">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10">
        
        <div>
          <h2 className="text-xl font-bold mb-3">Artha Prints</h2>
          <p className="text-gray-300">
            Percetakan profesional melayani undangan, banner, kartu nama, stempel,
            brosur, sablon, fotocopy, dan layanan printing lainnya.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-3">Lokasi Kami</h2>

          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.243855591683!2d103.52005737399432!3d-1.6096884360630435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e2f6295174d3c39%3A0xa365e87c9bb6d938!2sARTHA%20PRINTS!5e0!3m2!1sid!2sid!4v1764534525686!5m2!1sid!2sid"
            width="100%"
            height="250"
            className="rounded-lg border-0"
            loading="lazy"
            allowFullScreen
          ></iframe>
        </div>

      </div>

      <p className="text-center text-gray-400 mt-10">
        © {new Date().getFullYear()} Artha Prints — All Rights Reserved.
      </p>
    </footer>
  );
}
