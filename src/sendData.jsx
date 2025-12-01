import { useState } from "react";
import { db } from "./firebase/config";
import { collection, addDoc } from "firebase/firestore";

export default function SendData() {
  const [nama, setNama] = useState("");
  const [jenis, setJenis] = useState("");

  const kirimData = async () => {
    try {
      await addDoc(collection(db, "pesanan"), {
        nama: nama,
        jenis: jenis,
        tanggal: new Date().toISOString()
      });
      alert("Data berhasil dikirim ke Firebase!");
    } catch (err) {
      console.error("Gagal mengirim:", err);
      alert("Gagal mengirim data.");
    }
  };

  return (
    <div className="p-10 space-y-4">
      <h1 className="text-2xl font-bold">Kirim Data ke Firebase</h1>

      <input
        type="text"
        placeholder="Nama pemesan"
        value={nama}
        onChange={(e) => setNama(e.target.value)}
        className="border p-2 rounded w-full"
      />

      <input
        type="text"
        placeholder="Jenis cetakan (contoh: Undangan Pernikahan)"
        value={jenis}
        onChange={(e) => setJenis(e.target.value)}
        className="border p-2 rounded w-full"
      />

      <button
        onClick={kirimData}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Kirim
      </button>
    </div>
  );
}
