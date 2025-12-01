import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    const querySnapshot = await getDocs(collection(db, "pesanan"));
    const data = querySnapshot.docs.map(docSnap => ({
      id: docSnap.id,
      ...docSnap.data()
    }));
    setOrders(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateTanggalAmbil = async (id, durasiHari) => {
    const order = orders.find(o => o.id === id);
    if (!order) return;
    const tanggalPesan = new Date(order.tanggal);
    const tanggalAmbil = new Date(tanggalPesan.getTime() + durasiHari * 24*60*60*1000);
    await updateDoc(doc(db, "pesanan", id), {
      tanggalAmbil: tanggalAmbil.toISOString()
    });
    fetchOrders(); // refresh
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-10 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Daftar Pesanan</h2>
      <table className="w-full border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">Nama</th>
            <th className="p-2 border">Produk</th>
            <th className="p-2 border">Jumlah</th>
            <th className="p-2 border">Tanggal Pesan</th>
            <th className="p-2 border">Tanggal Ambil</th>
            <th className="p-2 border">Desain</th>
            <th className="p-2 border">Ubah Tenggat</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id} className="text-center">
              <td className="p-2 border">{order.nama}</td>
              <td className="p-2 border">{order.produk}</td>
              <td className="p-2 border">{order.jumlah}</td>
              <td className="p-2 border">{new Date(order.tanggal).toLocaleDateString()}</td>
              <td className="p-2 border">{new Date(order.tanggalAmbil).toLocaleDateString()}</td>
              <td className="p-2 border">
                {order.fileDesain ? (
                  <a href={order.fileDesain} target="_blank" rel="noreferrer" className="text-teal-500 underline">
                    Lihat
                  </a>
                ) : "-"}
              </td>
              <td className="p-2 border">
                <select
                  className="border p-1 rounded"
                  onChange={(e) => updateTanggalAmbil(order.id, parseInt(e.target.value))}
                  defaultValue=""
                >
                  <option value="" disabled>Pilih</option>
                  <option value="2">2 hari</option>
                  <option value="7">1 minggu</option>
                  <option value="30">1 bulan</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
