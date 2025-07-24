"use client";

import { useEffect, useState } from "react";
import ApexChart from "../_components/Charts";
import type { ApexOptions } from "apexcharts";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../utils/firebase";

interface Product {
  price?: number;
  stock?: number;
  category?: string;
}

export default function Overview() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const snapshot = await getDocs(collection(db, "products"));
      const data = snapshot.docs.map((doc) => doc.data() as Product);
      setProducts(data);
    };

    fetchProducts();
  }, []);

  const totalProducts = products.length;
  const totalRevenue = products.reduce((acc, p) => acc + (p.price || 0), 0);
  const totalSales = products.reduce((acc, p) => acc + ((p.stock || 0) * 2), 0);
  const totalOrders = Math.floor(products.reduce((acc, p) => acc + (p.stock || 0), 0) / 2);

  const categoryCounts = products.reduce<Record<string, number>>((acc, p) => {
    if (p.category) acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});

  const pieChartOptions: ApexOptions = {
    labels: Object.keys(categoryCounts),
    colors: ["#3B82F6", "#10B981", "#F59E0B", "#6366F1", "#F97316"],
    legend: { position: "bottom" },
  };

  const lineChartOptions: ApexOptions = {
    chart: { id: "overview-line-chart", toolbar: { show: false } },
    xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    yaxis: { labels: { formatter: (val) => val.toFixed(0) } },
    colors: ["#3B82F6", "#10B981", "#F59E0B"],
    stroke: { curve: "smooth", width: 2 },
    legend: { position: "top" },
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <p className="text-gray-600 mb-6 text-sm sm:text-base">
        Get insights into your business performance
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Products", value: totalProducts },
          { label: "Total Revenue", value: `$${totalRevenue.toFixed(2)}` },
          { label: "Total Sales", value: totalSales },
          { label: "Total Orders", value: totalOrders },
        ].map((item) => (
          <div
            key={item.label}
            className="bg-white rounded-lg shadow p-4 flex flex-col justify-center items-center text-center"
          >
            <h3 className="text-gray-500 text-sm">{item.label}</h3>
            <p className="text-2xl font-bold text-gray-900">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Analytics Overview
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            Product sales and revenue trends over time
          </p>
          <ApexChart
            options={lineChartOptions}
            series={[
              {
                name: "Products",
                data: [10, 20, 15, totalProducts, 40, 30, 35],
              },
              {
                name: "Revenue",
                data: [5000, 7000, 6000, totalRevenue, 9000, 10000, 11000],
              },
            ]}
            type="line"
            height={300}
          />
        </div>

        <div className="bg-white rounded-lg shadow p-4 flex flex-col justify-between">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Product Categories
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            Product distribution by category
          </p>
          <ApexChart
            options={pieChartOptions}
            series={Object.values(categoryCounts)}
            type="pie"
            height={300}
          />
        </div>
      </div>
    </div>
  );
}
