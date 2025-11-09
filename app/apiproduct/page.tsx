"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function ProductTable() {
  type Product = {
    id: number;
    title: string;
    price: number;
    category: string;
    image: string;
    rating: {
      rate: number;
      count: number;
    };
  };

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-8">Loading products...</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Products Page</h1>

      {/* ---------------- TABLE ---------------- */}
      <div className="overflow-x-auto mb-12 border border-gray-200 rounded-lg shadow-sm">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border text-left">ID</th>
              <th className="px-4 py-2 border text-left">Title</th>
              <th className="px-4 py-2 border text-left">Category</th>
              <th className="px-4 py-2 border text-right">Price</th>
              <th className="px-4 py-2 border text-center">Rating</th>
              <th className="px-4 py-2 border text-center">Stock</th>
              <th className="px-4 py-2 border text-center">Image</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{p.id}</td>
                <td className="px-4 py-2 border">{p.title}</td>
                <td className="px-4 py-2 border">{p.category}</td>
                <td className="px-4 py-2 border text-right">${p.price}</td>
                <td className="px-4 py-2 border text-center">{p.rating.rate}</td>
                <td className="px-4 py-2 border text-center">{p.rating.count}</td>
                <td className="px-4 py-2 border text-center">
                  <Image
                    src={p.image}
                    alt={p.title}
                    width={50}
                    height={50}
                    className="mx-auto object-contain"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ---------------- CARDS ---------------- */}
      <h2 className="text-2xl font-semibold mb-4 text-center">Product Cards</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <div
            key={p.id}
            className="border rounded-xl shadow-sm p-4 hover:shadow-md transition bg-white"
          >
            <Image
              src={p.image}
              alt={p.title}
              width={200}
              height={200}
              className="mx-auto object-contain mb-2"
            />
            <h3 className="font-semibold text-lg line-clamp-2">{p.title}</h3>
            <p className="text-gray-500 text-sm mb-1">{p.category}</p>
            <p className="text-yellow-500 text-sm mb-1">
              ⭐ {p.rating.rate} ({p.rating.count})
            </p>
            <p className="text-lg font-bold">${p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
