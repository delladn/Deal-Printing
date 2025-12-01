import { useState } from "react";
import { db, storage } from "../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function OrderForm() {
  const [nama, setNama] = useState("");
  const [telepon, setTelepon] = useState("");
  const [produk, setProduk] = useState("Undangan Pernikahan");
  const [jumlah, setJumlah] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [fileDesain, setFileDesain] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [tanggalAmbilDisplay, setTanggalAmbilDisplay] = useState(null);

  const listProduk = [
    "Undangan Pernikahan",
    "Undangan Khitanan",
    "Undangan Aqiqah",
    "Undangan Ulang Tahun",
    "Banner",
    "Spanduk",
    "Poster",
    "Brosur",
    "Kartu Nama",
    "Stiker",
    "Nota / Invoice",
    "Print Warna",
    "Print Hitam Putih",
    "Jilid Buku",
    "Laminating",
    "Sablon",
    "Foto Copy",
  ];

  const kirimPesanan = async (e) => {
    e.preventDefault();
    if (fileDesain && fileDesain.size > 10 * 1024 * 1024) {
      alert("File terlalu besar, maksimal 10MB");
      return;
    }

    setLoading(true);
    setProgress(0);

    try {
      let fileUrl = "";
      if (fileDesain) {
        const storageRef = ref(storage, `desain/${Date.now()}_${fileDesain.name}`);
        const uploadTask = uploadBytesResumable(storageRef, fileDesain);

        await new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setProgress(Math.round(prog));
            },
            (error) => reject(error),
            async () => {
              fileUrl = await getDownloadURL(uploadTask.snapshot.ref);
              resolve();
            }
          );
        });
      }

      const tanggalPesan = new Date();
      const durasiHariDefault = 7;
      const tanggalAmbil = new Date(tanggalPesan.getTime() + durasiHariDefault*24*60*60*1000);

      await addDoc(collection(db, "pesanan"), {
        nama,
        telepon,
        produk,
        jumlah,
        keterangan,
        fileDesain: fileUrl,
        tanggal: tanggalPesan.toISOString(),
        tanggalAmbil: tanggalAmbil.toISOString(),
      });

      alert("Pesanan berhasil dikirim!");
      setTanggalAmbilDisplay(tanggalAmbil); // tampil ke customer
      setNama("");
      setTelepon("");
      setProduk("Undangan Pernikahan");
      setJumlah("");
      setKeterangan("");
      setFileDesain(null);
      setProgress(0);
    } catch (e) {
      console.error(e);
      alert("Gagal mengirim pesanan.");
    }

    setLoading(false);
  };

  return (
    <div className="p-10 bg-white dark:bg-slate-800 shadow rounded-xl mt-20 max-w-xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-slate-50 text-center">
        Form Pemesanan
      </h2>

      <form onSubmit={kirimPesanan} className="flex flex-col space-y-4">
        <input
          className="border p-3 rounded dark:text-slate-900"
          placeholder="Nama Pemesan"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          required
        />

        <input
          className="border p-3 rounded dark:text-slate-900"
          placeholder="Nomor Telepon"
          value={telepon}
          onChange={(e) => setTelepon(e.target.value)}
          required
        />

        <select
          className="border p-3 rounded dark:text-slate-900"
          value={produk}
          onChange={(e) => setProduk(e.target.value)}
          required
        >
          {listProduk.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>

        <input
          className="border p-3 rounded dark:text-slate-900"
          placeholder="Jumlah (pcs)"
          value={jumlah}
          onChange={(e) => setJumlah(e.target.value)}
          required
        />

        <textarea
          className="border p-3 rounded dark:text-slate-900"
          placeholder="Keterangan tambahan (opsional)"
          rows={4}
          value={keterangan}
          onChange={(e) => setKeterangan(e.target.value)}
        ></textarea>

        <div>
          <label className="block font-semibold mb-1">Upload Desain (opsional)</label>
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={(e) => setFileDesain(e.target.files[0])}
          />
          {progress > 0 && (
            <div className="w-full bg-gray-200 h-3 rounded mt-2">
              <div
                className="bg-teal-500 h-3 rounded"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          )}
        </div>

        <button
          type="submit"
          className={`bg-teal-600 hover:bg-teal-700 text-white p-3 rounded-full mt-3 transition ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? `Mengirim... ${progress}%` : "Kirim Pesanan"}
        </button>

        {tanggalAmbilDisplay && (
          <p className="text-teal-600 mt-2 font-semibold">
            Pesanan kamu bisa diambil mulai: {tanggalAmbilDisplay.toLocaleDateString()}
          </p>
        )}
      </form>
    </div>
  );
}
