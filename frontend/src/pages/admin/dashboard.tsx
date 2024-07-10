import LayoutAdmin from "@/layouts/layout-admin";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
  const data = {
    labels: [
      "Positif < 2 tonnes de CO2 par an ",
      "Acceptable: Entre 2 et 6 tonnes de CO2 par an",
      "Négatif: > 6 tonnes de CO2 par an",
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

  //example
  const percentage = "48%";

  return (
    <LayoutAdmin>
      <div className="max-w-[95rem] xl m-auto h-auto mt-14 ">
        <div className="flex flex-wrap justify-between ">
          <div className="w-[60%]">
            <div className="bg-white shadow-lg rounded-lg p-6 h-[35vh]">
              <div className="flex">
                <img
                  src="../../img/bluepiggy.png"
                  alt="petit couchon mignon"
                  className="w-14"
                />
                <h2 className="text-xl font-semibold mb-4">Donations</h2>
              </div>

              <div className="w-full rounded-full bg-pearl mt-5">
                <div
                  className="bg-reef text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                  style={{ width: percentage }}
                >
                  {percentage}
                </div>
              </div>
            </div>
          </div>
          <div className="w-[38%]  ">
            <div className="bg-white shadow-lg rounded-lg p-6  h-[35vh]">
              <h2 className="text-lg font-semibold mb-4">
                Consummation Moyenne Utlisateurs GreenFoot
              </h2>
              <div className="mt-4 h-[22vh] w-[25vw]  items-start justify-left">
                <Doughnut data={data} options={options} />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <div className="bg-white shadow-lg rounded-lg p-6 h-[35vh]">
            <h2 className="text-xl font-semibold mb-4">Notifications</h2>
            <p>coming soon...</p>
          </div>
        </div>
      </div>
    </LayoutAdmin>
  );
}
