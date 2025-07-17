"use client";

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

interface WeekdayFrequencyBarChartProps {
  weekdayData: Record<string, number>;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      display: true,
      grid: {
        display: false,
        drawBorder: false,
      },
      ticks: {
        font: {
          weight: "bold" as const,
        },
      },
    },
    y: {
      display: false,
      grid: {
        display: false,
        drawBorder: false,
      },
    },
  },
};

const WeekdayFrequencyBarChart = ({
  weekdayData,
}: WeekdayFrequencyBarChartProps) => {
  const labels = Object.keys(weekdayData);
  const values = Object.values(weekdayData);
  const sorted = [...values]
    .map((el, i) => ({ el, i }))
    .sort((a, b) => b.el - a.el);
  const topTwo = sorted.slice(0, 2).map(({ i }) => i);

  const backgroundColors = values.map((_, i) =>
    topTwo.includes(i) ? "#8A38F5" : "#338aff"
  );

  const data = {
    labels,
    datasets: [
      {
        data: Object.values(weekdayData),
        backgroundColor: backgroundColors,
        borderRadius: 8,
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default WeekdayFrequencyBarChart;
