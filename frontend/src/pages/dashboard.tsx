import LayoutLoggedInUser from "@/layouts/layout-logged-in-user";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import useScreenSize from "@/hooks/useScreenSize";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
  const screenSize = useScreenSize();

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Détails de mes émissions de CO2 par mois",
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
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

  const data = {
    labels,
    datasets: [
      {
        label: "Déplacements",
        data: [967, 59, 80, 810, 56, 55, 40, 650, 59, 80, 81, 56],
        backgroundColor: "rgb(255, 99, 132)",
      },
      {
        label: "Chauffage",
        data: [347, 59, 800, 81, 56, 550, 40, 65, 59, 80, 81, 56],
        backgroundColor: "rgb(75, 192, 192)",
      },
      {
        label: "Achat vêtements",
        data: [800, 100, 200, 300, 400, 500, 600, 150, 100, 200, 300, 400],
        backgroundColor: "rgb(53, 162, 235)",
      },
      {
        label: "Achat électronique",
        data: [524, 100, 200, 300, 400, 500, 600, 150, 100, 200, 300, 400],
        backgroundColor: "#2D7487",
      },
      {
        label: "Autre",
        data: [150, 100, 200, 300, 400, 500, 600, 150, 100, 200, 300, 400],
        backgroundColor: "#C0D6D8",
      },
    ],
  };

  const mobileData = {
    labels: labels.slice(6),
    datasets: [
      {
        label: "Déplacements",
        data: [40, 650, 59, 80, 81, 56],
        backgroundColor: "rgb(255, 99, 132)",
      },
      {
        label: "Chauffage",
        data: [40, 65, 59, 80, 81, 56],
        backgroundColor: "rgb(75, 192, 192)",
      },
      {
        label: "Achat vêtements",
        data: [600, 150, 100, 200, 300, 400],
        backgroundColor: "rgb(53, 162, 235)",
      },
      {
        label: "Achat électronique",
        data: [600, 150, 100, 200, 300, 400],
        backgroundColor: "#2D7487",
      },
      {
        label: "Autre",
        data: [600, 150, 100, 200, 300, 400],
        backgroundColor: "#C0D6D8",
      },
    ],
  };

  const totalByType = data.datasets.map((dataset) =>
    dataset.data.reduce((acc, curr) => acc + curr, 0)
  );
  const total = totalByType.reduce((acc, curr) => acc + curr, 0);
  const totalByTypeInTons = totalByType.map((total) =>
    (total / 1000).toFixed(2)
  );

  const dataPie = {
    labels: [
      "Déplacements",
      "Chauffage",
      "Achat vêtements",
      "Achat électronique",
      "Autre",
    ],
    datasets: [
      {
        label: "Tonnes de CO2/an",
        data: totalByTypeInTons,
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(75, 192, 192)",
          "rgb(53, 162, 235)",
          "#2D7487",
          "#C0D6D8",
        ],
      },
    ],
  };

  return (
    <LayoutLoggedInUser>
      <h1 className="mb-2 mx-10 text-lg md:text-xl lg:text-2xl">
        Mon tableau de bord
      </h1>
      <div className="lg:flex h-80 justify-center gap-x-10 items-center mb-10">
        <div className="mx-auto lg:w-60 lg:h-60 md:w-44 md:h-44 w-32 h-32 rounded-full bg-reef flex justify-center items-center flex-col">
          <h2 className="font-bold text-lightPearl md:text-2xl">
            {(total / 1000).toFixed(2)} Tonnes
          </h2>
          <p className="text-lightPearl">de CO2/an</p>
        </div>
        {
          <div className="mx-auto h-full lg:w-3/5">
            <Bar
              className="mx-auto w-full"
              options={options}
              data={screenSize.width > 768 ? data : mobileData}
            />
          </div>
        }
      </div>
      <div className="lg:flex h-80 justify-center gap-x-10 items-center">
        <h2 className="mx-auto bg-anchor text-lightPearl text-center">
          Mes dernières dépenses
        </h2>
        <div className="mx-auto h-full lg:w-3/5">
          <Pie className="mx-auto" data={dataPie} />
        </div>
      </div>
    </LayoutLoggedInUser>
  );
}
