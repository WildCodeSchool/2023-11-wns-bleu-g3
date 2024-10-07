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
import useScreenSize from "@/hooks/useScreenSize";
import { Activity } from "@/graphql/generated/schema";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface EmissionBarChartProps {
  activities: Activity[];
}

const EmissionBarChart: React.FC<EmissionBarChartProps> = ({ activities }) => {
  const screenSize = useScreenSize();

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          boxWidth: screenSize.width < 640 ? 10 : 20,
          font: {
            size: screenSize.width < 640 ? 10 : 12,
          },
        },
      },
      title: {
        display: true,
        text: "Émissions de CO₂ par mois (kg)",
        font: {
          size: screenSize.width < 640 ? 14 : 18,
        },
      },
    },
    scales: {
      x: { stacked: true },
      y: { stacked: true },
    },
  };

  const monthNames = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];

  const currentMonthIndex = new Date().getMonth();
  const labels = [
    ...monthNames.slice(currentMonthIndex + 1),
    ...monthNames.slice(0, currentMonthIndex + 1),
  ];

  const dataToDisplay = labels.map((label) => {
    const monthIndex = monthNames.indexOf(label);
    return activities.filter(
      (activity) => new Date(activity.starts_at).getMonth() === monthIndex
    );
  });

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

  const datasets = categories.map((category) => ({
    label: category.label,
    data: dataToDisplay.map((activities) =>
      activities
        .filter((activity) => activity.category === category.name)
        .reduce((sum, activity) => sum + activity.emissionPerMonth / 1000, 0)
    ),
    backgroundColor: category.color,
  }));

  const desktopData = { labels, datasets };
  const mobileData = {
    labels: labels.slice(-6),
    datasets: datasets.map((dataset) => ({
      ...dataset,
      data: dataset.data.slice(-6),
    })),
  };

  return (
    <div className="w-full h-64 md:h-80 lg:h-96">
      <Bar
        options={options}
        data={screenSize.width > 768 ? desktopData : mobileData}
      />
    </div>
  );
};

export default EmissionBarChart;
