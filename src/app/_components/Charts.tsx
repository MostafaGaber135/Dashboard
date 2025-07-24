"use client";

import dynamic from "next/dynamic";
import type { ApexOptions } from "apexcharts";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface ChartProps {
  options: ApexOptions;
  series: ApexOptions["series"];
  type: "line" | "area" | "bar" | "pie" | "donut";
  height?: number;
  width?: number;
}

export default function Charts({ options, series, type, height = 300, width }: ChartProps) {
  return (
    <div className="w-full">
      <ApexChart
        options={options}
        series={series}
        type={type}
        height={height}
        width={width || "100%"}
      />
    </div>
  );
}
