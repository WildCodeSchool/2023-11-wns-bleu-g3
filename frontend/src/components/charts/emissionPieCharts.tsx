import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Activity } from "@/graphql/generated/schema";
import useScreenSize from "@/hooks/useScreenSize";

ChartJS.register(ArcElement, Tooltip, Legend);

interface EmissionPieChartProps {
  activities: Activity[];
}

const EmissionPieChart: React.FC<EmissionPieChartProps> = ({ activities }) => {
  const screenSize = useScreenSize();
  const categories = [
    { name: "Déplacement", label: "Déplacements", color: "rgb(255, 99, 132)" },
    { name: "Chauffage", label: "Chauffage", color: "rgb(75, 192, 192)" },
    {
      name: "Achat vêtement",
      label: "Achat vêtements",
      color: "rgb(53, 162, 235)",
    },
    {
      name: "Achat électronique",
      label: "Achat électronique",
      color: "#2D7487",
    },
    { name: "Autre", label: "Autre", color: "#C0D6D8" },
  ];

  const totalByType = categories.map((category) =>
    activities
      .filter((activity) => activity.category === category.name)
      .reduce((sum, activity) => sum + activity.emissionPerMonth / 1000, 0)
  );

  const totalByTypeInTons = totalByType.map((total) =>
    (total / 1000).toFixed(2)
  );

  const dataPie = {
    labels: categories.map((category) => category.label),
    datasets: [
      {
        label: "Tonnes de CO2/an",
        data: totalByTypeInTons,
        backgroundColor: categories.map((category) => category.color),
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          boxWidth: screenSize.width < 640 ? 10 : 20,
          font: {
            size: screenSize.width < 640 ? 10 : 12,
          },
        },
      },
      title: {
        display: true,
        text: "Émissions de CO₂ dans l'année (tonne)",
        font: {
          size: screenSize.width < 640 ? 14 : 18,
        },
      },
    },
  };

  return (
    <div className="w-full h-64 md:h-80 lg:h-96">
      <Pie data={dataPie} options={options} />
    </div>
  );
};

export default EmissionPieChart;
