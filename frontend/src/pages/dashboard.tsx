import React, { useState } from "react";
import LayoutLoggedInUser from "@/layouts/layout-logged-in-user";
import {
  Activity,
  useGetGraphActivitiesQuery,
} from "@/graphql/generated/schema";
import EmissionBarChart from "@/components/charts/emissionBarCharts";
import EmissionPieChart from "@/components/charts/emissionPieCharts";

export default function Dashboard() {
  const { data } = useGetGraphActivitiesQuery();
  const activities = data?.getGraphActivities || [];

  const totalEmission = (
    activities.reduce(
      (sum, activity) => sum + activity.emissionPerMonth / 1000,
      0
    ) / 1000
  ).toFixed(2);

  const [showBarChart, setShowBarChart] = useState(true);

  const lastFiveActivities = activities.slice(-5).reverse();
  console.log(lastFiveActivities);

  return (
    <LayoutLoggedInUser>
      <h1 className="mb-4 mx-4 text-2xl font-semibold text-center lg:text-left">
        Mon tableau de bord
      </h1>

      <div className="flex flex-col items-center gap-4 mb-6 px-4">
        <div className="w-32 h-32 md:w-44 md:h-44 lg:w-60 lg:h-60 rounded-full bg-reef flex justify-center items-center flex-col">
          <h2 className="font-bold text-lightPearl text-lg md:text-2xl lg:text-3xl">
            {totalEmission} Tonnes
          </h2>
          <p className="text-lightPearl text-sm md:text-base lg:text-lg">
            de CO₂/an
          </p>
        </div>
      </div>

      <div className="flex justify-center mb-6">
        <button
          className={`px-4 py-2 mx-2 ${
            showBarChart ? "bg-reef text-white" : "bg-gray-200"
          } rounded`}
          onClick={() => setShowBarChart(true)}
        >
          Voir le graphique en barres
        </button>
        <button
          className={`px-4 py-2 mx-2 ${
            !showBarChart ? "bg-reef text-white" : "bg-gray-200"
          } rounded`}
          onClick={() => setShowBarChart(false)}
        >
          Voir le graphique en secteurs
        </button>
      </div>

      <div className="flex justify-center items-center mb-10 px-4">
        {showBarChart ? (
          <EmissionBarChart activities={activities as Activity[]} />
        ) : (
          <EmissionPieChart activities={activities as Activity[]} />
        )}
      </div>

      <div className="mb-10 px-4">
        <h2 className="text-xl font-semibold mb-4">Mes 5 dernières dépenses</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Date</th>
                <th className="py-2 px-4 border-b">Catégorie</th>
                <th className="py-2 px-4 border-b">Émission (kg CO₂)</th>
              </tr>
            </thead>
            <tbody>
              {lastFiveActivities.map((activity) => (
                <tr key={activity.id}>
                  <td className="py-2 px-4 border-b">
                    {new Date(activity.starts_at).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border-b">{activity.category}</td>
                  <td className="py-2 px-4 border-b">
                    {(activity.emissionPerMonth / 1000).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </LayoutLoggedInUser>
  );
}
