import LayoutAdmin from "@/layouts/layout-admin";
import { Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);

export default function Dashboard() {
  const data = {
    labels: [
      "Positif < 2 tonnes de CO2 par an ",
      "Acceptable Entre 2 et 6 tonnes de CO2 par an",
      "Négatif > 6 tonnes de CO2 par an",
    ],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ["#3A8DA6", "#C0D6D8", "#DFE4EA"],
        hoverBackgroundColor: ["#3A8DA6", "#C0D6D8", "#DFE4EA"],
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right" as any,
      },
    },
  };
  // second chart

  const lineData = {
    labels: ["Avr", "May", "June", "Jull", "Aout", "Sept"],
    datasets: [
      {
        label: "Utilisateurs",
        data: [4, 3.8, 3.5, 3.2, 2.8, 2.5],
        backgroundColor: "rgba(58, 141, 166, 1)",
        tension: 0.8,
        fill: true,
      },
      {
        label: "Donations (par K)",
        data: [3.5, 3.2, 2.3, 3.8, 3.2, 2.8],
        backgroundColor: "rgba(192, 214, 216, 1)",
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Nouveaux Utilisateurs",
      },
      scales: {
        y: {
          beginAtZero: true, //y-axis
        },
      },
    },
  };

  //examples notifications
  const percentage = "73%";

  const notifs = [
    {
      message: "NicoEcolo vient de signalé la publication de AntoineArbre. ❌",
      date: "03/04/2024",
    },
    {
      message: "PhilipeForet vient de faire une contribuition de 35€. 🎉",
      date: "03/04/2024",
    },
  ];

  return (
    <LayoutAdmin>
      <div className="max-w-[95rem] xl m-auto h-auto mt-14 ">
        <div className="flex  justify-between ">
          <div className="w-[60%]">
            <div className="bg-white shadow-lg rounded-lg p-6 h-[35vh]">
              <div className="flex">
                <img
                  src="../../img/bluepiggy.png"
                  alt="petit couchon mignon"
                  className="w-[8rem]"
                />
                <div className="justify-between  flex w-full">
                  <div className="ml-4 mt-2 pb-2">
                    <h2 className="text-xl font-semibold ">
                      Dons totaux: 3450€
                    </h2>
                    <p className="text-lg py-2 ">
                      <span className="text-lg font-semibold ">Objectif: </span>
                      10000€ jusqu&apos;au 01/01/2025
                    </p>
                    <p className="text-md  ">
                      <span className="text-md font-semibold ">
                        Plus haute donation:{" "}
                      </span>
                      230 € par NicoEcolo
                    </p>
                  </div>
                  <div className="text-right justify-end ml-4 mt-2">
                    <a
                      href="/admin/donations"
                      className="p-3 text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm   text-center inline-flex items-center focus:ring-gray-500 "
                    >
                      <svg
                        className=" w-3 h-3 text-gray-800 "
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 8 14"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"
                        />
                      </svg>
                      Voir détails
                    </a>
                  </div>
                </div>
              </div>

              <div className="w-full rounded-full bg-pearl mt-5">
                <div
                  className="bg-reef text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                  style={{ width: percentage }}
                >
                  {percentage}
                </div>
              </div>
              <div className="flex justify-between">
                <div className="m-4 p-2 ">
                  <h2 className="text-xl">Contributions</h2>
                  <p>53 dons</p>
                </div>
                <div className="m-4 p-2 ">
                  <h2 className="text-xl">Nº Greenfooters</h2>
                  <p>87 inscriptions totales</p>
                </div>
                <div className="m-4 p-2 ">
                  <h2 className="text-xl">Réseau Social</h2>
                  <p>345 publications totales</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[38%]  ">
            <div className="bg-white shadow-lg rounded-lg p-6  h-[35vh]">
              <h2 className="text-lg font-semibold mb-4">
                Consummation de CO
                <sub>2</sub> Moyenne des Utilisateurs de GreenFoot
              </h2>
              <div className="mt-4 h-[22vh] w-[25vw]  items-start justify-left">
                <Doughnut data={data} options={options} />
              </div>
            </div>
          </div>
        </div>
        {/* second row Dashboard */}
        <div className="flex justify-between mt-6">
          <div className="w-[38%] bg-white shadow-lg rounded-lg p-5 h-[35vh] justify-center ">
            <div className="pl-[0.40rem] pb-1 m-auto h-[29svh] w-[28vw]  items-start justify-center">
              <Line data={lineData} options={lineOptions} />
            </div>
          </div>
          <div className=" w-[60%] ">
            <div className="bg-white shadow-lg rounded-lg p-6 h-[35vh]">
              <h2 className="text-xl font-semibold mb-4">Notifications</h2>
              {notifs.map((notif) => (
                <a
                  key={notif.message}
                  href="#"
                  className="block w-full p-2 mt-5 bg-pearl border border-gray-200 rounded-lg shadow-lg hover:bg-gray-100"
                >
                  {" "}
                  <div className="flex justify-between">
                    <p className="pl-4 font-normal text-anchor ">
                      {notif.message}
                    </p>
                    <button
                      type="button"
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                      data-modal-hide="default-modal"
                    >
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                      </svg>
                      <span className="sr-only">Close modal</span>
                    </button>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </LayoutAdmin>
  );
}
