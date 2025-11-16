"use client";

import { useState } from "react";

export default function AddProductForm() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [imageBase64, setImageBase64] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Convert uploaded file into Base64
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setImageBase64(reader.result as string);
    reader.readAsDataURL(file);
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    const newProduct = {
      title,
      price: Number(price),
      description,
      category,
      image: imageBase64 ?? "",
    };

    try {
      const res = await fetch("https://fakestoreapi.com/apiproduct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });

      const result = await res.json();
      console.log("API response:", result);

      // Reset the form
      setSuccessMessage("Product added!");
      setTitle("");
      setPrice("");
      setDescription("");
      setCategory("");
      setImageBase64(null);
    } catch (err) {
      console.error(err);
      setErrorMessage("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold text-center mb-4">Add New Product</h2>

      {successMessage && (
        <p className="text-center text-green-600 mb-2">{successMessage}</p>
      )}
      {errorMessage && (
        <p className="text-center text-red-600 mb-2">{errorMessage}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Title</label>
          <input
            required
            className="w-full border p-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium">Price</label>
          <input
            required
            type="number"
            className="w-full border p-2 rounded"
            min="0"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <textarea
            required
            className="w-full border p-2 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium">Category</label>
          <input
            required
            className="w-full border p-2 rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium">Product Image</label>
          <input
            required
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>

        {imageBase64 && (
          <div className="mt-3">
            <p className="font-medium mb-1">Preview:</p>
            <img
              src={imageBase64}
              alt="preview"
              className="w-32 h-32 border rounded object-cover"
            />
          </div>
        )}

        <button
          disabled={loading}
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? "Submitting..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}
