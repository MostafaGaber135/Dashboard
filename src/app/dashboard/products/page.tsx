"use client";
import ProductsTable from "@/app/_components/ProductsTable";
export default function ProductsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <ProductsTable />
    </div>
  );
}
