"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../../store";
import { fetchProducts, Product } from "../../../features/products/productsSlice";
import AddProductForm from "./AddProductForm";
import { ToastContainer } from "react-toastify";
import Loader from "./Loader";
import "react-toastify/dist/ReactToastify.css";

export default function ProductsTable() {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading } = useSelector((state: RootState) => state.products);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState<keyof Product | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const itemsPerPage = 5;

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    let data = [...products];
    if (searchTerm) {
      data = data.filter((p) =>
        `${p.name} ${p.category}`.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (sortKey) {
      data.sort((a, b) => {
        if (a[sortKey]! < b[sortKey]!) return sortOrder === "asc" ? -1 : 1;
        if (a[sortKey]! > b[sortKey]!) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    }
    setFilteredProducts(data);
  }, [products, searchTerm, sortKey, sortOrder]);

  const getStatus = (stock: number) => {
    if (stock === 0) return { label: "Out of Stock", color: "bg-red-100 text-red-800" };
    if (stock < 5) return { label: "Low Stock", color: "bg-yellow-100 text-yellow-800" };
    return { label: "In Stock", color: "bg-green-100 text-green-800" };
  };

  const toggleSort = (key: keyof Product) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div className="p-4 sm:p-6">
      <ToastContainer position="top-center" autoClose={3000} />

      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Product
        </button>

        <input
          type="text"
          placeholder="Search by name or category..."
          className="border border-gray-300 rounded p-2 w-full max-w-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <AddProductForm
            onClose={() => setShowForm(false)}
            onAdd={() => {
              setShowForm(false);
              dispatch(fetchProducts());
              setCurrentPage(1);
            }}
          />
        </div>
      )}

      <div className="overflow-x-auto rounded-lg shadow border bg-white">
        <table className="min-w-[640px] w-full text-sm text-left text-gray-500 break-words">
          <thead className="text-xs uppercase bg-gray-50 text-gray-700">
            <tr>
              {["name", "category", "price", "stock", "created"].map((key) => (
                <th
                  key={key}
                  onClick={() => toggleSort(key as keyof Product)}
                  className="px-6 py-3 cursor-pointer select-none"
                >
                  <span className="flex items-center gap-1">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                    <span className="text-xs">▲▼</span>
                  </span>
                </th>
              ))}
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="p-6 text-center">
                  <Loader />
                </td>
              </tr>
            ) : currentItems.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-6 text-center text-gray-500">No products found.</td>
              </tr>
            ) : (
              currentItems.map((product) => {
                const status = getStatus(product.stock);
                const createdDate = new Date(product.created).toLocaleDateString();

                return (
                  <tr key={product.id} className="border-t">
                    <td className="px-6 py-4 max-w-[140px] truncate font-medium text-gray-900">{product.name}</td>
                    <td className="px-6 py-4 max-w-[140px] truncate">{product.category}</td>
                    <td className="px-6 py-4 max-w-[140px] truncate">${product.price.toFixed(2)}</td>
                    <td className="px-6 py-4 max-w-[140px] truncate">{product.stock}</td>
                    <td className="px-6 py-4 max-w-[140px] truncate">{createdDate}</td>
                    <td className="px-6 py-4 max-w-[140px] truncate">
                      <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${status.color}`}>
                        {status.label}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-6 flex-wrap gap-2">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          className="px-3 h-8 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-100"
        >
          Prev
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 h-8 text-sm border rounded ${
              currentPage === i + 1
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          className="px-3 h-8 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-100"
        >
          Next
        </button>
      </div>
    </div>
  );
}
