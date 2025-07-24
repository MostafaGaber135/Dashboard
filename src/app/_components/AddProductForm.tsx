"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";
import { addProduct } from "../../../features/products/productsSlice";

interface Props {
  onClose: () => void;
  onAdd: () => void;
}

export default function AddProductForm({ onClose, onAdd }: Props) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Electronics");
  const [price, setPrice] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await dispatch(addProduct({ name, category, price, stock })).unwrap();
      toast.success("Product added successfully!");
      onAdd();
      onClose();
    } catch (error) {
      toast.error("Failed to add product!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 before:absolute before:inset-0 before:bg-black/20 before:backdrop-blur-md">
      <form
        onSubmit={handleAdd}
        className="relative w-full max-w-md bg-white p-6 rounded-2xl shadow-2xl border border-gray-100"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Add New Product
        </h2>

        <div className="space-y-3">
          <input
            className="w-full border border-gray-300 p-2 rounded-lg"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <select
            className="w-full border border-gray-300 p-2 rounded-lg"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="Electronics">Electronics</option>
            <option value="Clothes">Clothes</option>
            <option value="Foods">Foods</option>
          </select>

          <input
            className="w-full border border-gray-300 p-2 rounded-lg"
            placeholder="Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(+e.target.value)}
            required
          />

          <input
            className="w-full border border-gray-300 p-2 rounded-lg"
            placeholder="Stock"
            type="number"
            value={stock}
            onChange={(e) => setStock(+e.target.value)}
            required
          />
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
}
