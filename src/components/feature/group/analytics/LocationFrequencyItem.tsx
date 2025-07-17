"use client";

import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const LocationFrequencyItem = ({
  locationFrequencyData,
}: {
  locationFrequencyData: number[];
}) => {
  const data = {
    datasets: [
      {
        data: locationFrequencyData,
        backgroundColor: ["#8A38F5", "#338aff", "#ff5353", "#626262"],
        borderWidth: 0,
      },
    ],
  };
  return <Doughnut data={data} />;
};

export default LocationFrequencyItem;
