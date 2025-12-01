import React, { useState } from "react";
import data from "../data.json";

const ProductAndServices = () => {
  const [expandedId, setExpandedId] = useState(null);

  return (
    <div id="product&services">
      <div className="bg-gradient-to-r from-teal-500 to-cyan-500 dark:from-teal-900 dark:to-cyan-900 py-16 px-5 sm:px-20">
        <h1 className="text-2xl pb-10 text-center text-white poppins-bold">
          Produk dan Layanan
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {data.map((item) => (
            <div
              key={item.id}
              className="bg-slate-100 rounded-lg overflow-hidden shadow-md hover:scale-105 transition"
            >
              <img src={item.images} alt={item.title} className="w-full" />

              <div className="px-5 py-3">
                <h2 className="poppins-semibold text-xl text-slate-800 mb-2">
                  {item.title}
                </h2>

                <p className="poppins-regular text-slate-700">
                  {expandedId === item.id
                    ? item.description
                    : `${item.description.slice(0, 50)}...`}
                  <span
                    onClick={() =>
                      setExpandedId(expandedId === item.id ? null : item.id)
                    }
                    className="text-sm text-teal-500 ml-1 cursor-pointer"
                  >
                    {expandedId === item.id ? "lebih sedikit" : "selanjutnya"}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductAndServices;
