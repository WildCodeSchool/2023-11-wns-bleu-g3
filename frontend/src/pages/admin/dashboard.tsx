import LayoutAdmin from "@/layouts/layout-admin";
import {
  useGetDonationsQuery,
  useGetPostsQuery,
  useGetUsersPaginationQuery,
  useGetUsersPaginationSuspenseQuery,
} from "@/graphql/generated/schema";
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
import formatTimestamp from "@/components/backoffice/formatTimestamp";

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
  // DONATIONS HOOK

  const { data, loading: loadingDons } = useGetDonationsQuery();
  const donations = data?.getDonations || [];
  const lastDons = data?.getDonations.slice(-4).reverse() || [];

  const donsPerMonth = donations.reduce((acc, donation) => {
    //get month and year
    const [date] = donation.dateOfDonation.split("T");
    const [year, month] = date.split("-");
    const monthYear = `${year}-${month}`;

    acc[monthYear] = (acc[monthYear] || 0) + donation.amount;
    return acc;
  }, {} as any);

  const { data: postsData, loading: loadingPosts } = useGetPostsQuery() || [];
  const totalPosts = postsData?.getPosts?.length ?? 0;

  // USERS HOOK

  const { data: usersData, loading: loadingUsers } = useGetUsersPaginationQuery(
    {
      variables: {
        limit: 10000000,
        offset: 0,
      },
    }
  );

  const users = usersData?.getUsersPagination || [];
  const totalUsers = users.length;

  // new users per month
  const newUsersPerMonth = users?.reduce((acc, user) => {
    //get month and year
    const date = formatTimestamp(user.createdAt);
    const [day, month, year] = date.split("/");
    const monthYear = `${year}-${month}`;

    acc[monthYear] = (acc[monthYear] || 0) + 1;
    return acc;
  }, {} as any);

  //in case too much data is being loaded
  if (loadingUsers || loadingPosts || loadingDons) {
    return <p>...</p>;
  }

  //total donated
  const totalAmountDonated = donations.reduce(
    (sum, donation) => sum + donation.amount,
    0
  );

  //most generous
  function mostGenerous(
    donations: { amount: number; user: { nickname: string | undefined } }[]
  ): { amount: number; nickname: string } {
    const highestDon = Math.max(
      ...donations.map((donation) => donation.amount)
    );
    const mostGenerous = donations.find(
      (donation) => donation.amount === highestDon
    );

    return {
      amount: highestDon,
      nickname: mostGenerous?.user.nickname || "anonyme",
    };
  }

  const goal = 6000;

  //CHARTS

  const data2 = {
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

  const currDate = new Date();
  const currYear = currDate.getFullYear();
  const monthNames = [
    "Jan",
    "Fev",
    "Mars",
    "Avr",
    "Mai",
    "Jun",
    "Juil",
    "Aout",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  // COUNTS FOR GRAPH

  const donationCounts = monthNames.map((_, index) => {
    const monthYear = `${currYear}-${String(index + 1).padStart(2, "0")}`;
    return donsPerMonth[monthYear] || 0;
  });

  const inscriptionsCounts = monthNames.map((_, index) => {
    const monthYear = `${currYear}-${String(index + 1).padStart(2, "0")}`;
    return newUsersPerMonth[monthYear] || 0;
  });

  // GRAPH DATA CONFIG

  const lineOptions = {
    responsive: true,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: "Évolution mensuelle: Nouveaux Utilisateurs vs Dons",
      },
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Mois",
        },
      },
      y: {
        type: "linear" as const,
        display: true,
        position: "left" as const,
        title: {
          display: true,
          text: "Dons (€)",
        },
        beginAtZero: true,
      },
      y2: {
        type: "linear" as const,
        display: false,
        position: "right" as const,
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  const lineData = {
    labels: monthNames,
    datasets: [
      {
        label: "Utilisateurs",
        data: inscriptionsCounts,
        backgroundColor: "rgba(58, 141, 166, 1)",
        tension: 0.2,
        fill: true,
        yAxisID: "y2",
      },
      {
        label: "Donations",
        data: donationCounts,
        backgroundColor: "rgba(192, 214, 216, 1)",
        tension: 0.2,
        fill: true,
        yAxisID: "y",
      },
    ],
  };

  //DONATIONS GOAL

  const percentage = (totalAmountDonated / goal) * 100;
  const roundedPercentage = Math.round(percentage * 100) / 100;

  //limits percentage to 100% max due to UI issue when surpassed
  const limitPercentage = Math.min(roundedPercentage, 100);

  const percentageBar = `${limitPercentage}%`;

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
                      Dons totaux: {totalAmountDonated}€
                    </h2>
                    <p className="text-lg py-2 ">
                      <span className="text-lg font-semibold ">Objectif: </span>
                      {goal}€ jusqu'au 01/01/2025
                    </p>
                    <p className="text-md  ">
                      <span className="text-md font-semibold ">
                        Plus haute donation: {mostGenerous(donations).amount}
                      </span>
                      € par {mostGenerous(donations).nickname}
                    </p>
                  </div>
                  <div className="text-right justify-end ml-4 mt-2">
                    <a
                      href="/admin/users"
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
                  style={{ width: percentageBar }}
                >
                  {roundedPercentage}
                </div>
              </div>
              <div className="flex justify-between">
                <div className="m-4 p-2 ">
                  <h2 className="text-xl">Contributions</h2>
                  <p>{donations.length} dons</p>
                </div>
                <div className="m-4 p-2 ">
                  <h2 className="text-xl">Nº Greenfooters</h2>
                  <p>{totalUsers} inscriptions totales</p>
                </div>
                <div className="m-4 p-2 ">
                  <h2 className="text-xl">Réseau Social</h2>
                  <p>{totalPosts} publications totales</p>
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
                <Doughnut data={data2} options={options} />
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
            <div className="bg-white shadow-lg rounded-lg p-4 h-[35vh]">
              <h2 className="text-xl font-semibold mb-4">Dérniere Donations</h2>
              {lastDons.map((donation) => (
                <span className="block w-full p-2 mt-5 bg-gray-100 border border-gray-200 rounded-lg shadow-lg hover:bg-gray-200">
                  {" "}
                  <div className="flex justify-between">
                    {/* simple random text effect */}
                    <p className="pl-4 font-normal text-anchor flex justify-between">
                      {donation.user.nickname}{" "}
                      {
                        [
                          "vient de faire un don de ",
                          "a contribué 💖 chez nous avec ",
                          "nous soutient 🤝 avec ",
                          "renforce notre cause avec ",
                          "est un vrai greenfooter, il donne ",
                        ][Math.floor(Math.random() * 5)]
                      }
                      {donation.amount}€
                    </p>
                    <p className="px-2 bg-pearl rounded-lg">
                      {donation.dateOfDonation.split("T")[0]}
                    </p>
                  </div>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </LayoutAdmin>
  );
}