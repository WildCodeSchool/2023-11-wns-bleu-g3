import Icon from "@/components/icon";
import {
  useDeleteActivityMutation,
  useGetUserActivitiesQuery,
} from "@/graphql/generated/schema";
import { useEffect, useState } from "react";
import Link from "next/link";
import ModalBin from "./modalBin";
import { useRouter } from "next/router";
import { ActivityTypeEnum } from "@/enums/ActivityTypeEnum";

export default function TableUserActivities() {
  const router = useRouter();
  // pagination offset limit
  const [page, setPage] = useState(0);
  const [notEndPage, setNotEndPage] = useState(true);
  const [orderBy, setOrderBy] = useState("starts_at");
  const [orderDir, setOrderDir] = useState("DESC");
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const PAGE_SIZE = 10;

  const convertDate = (isoString: string) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const { data, loading, error, refetch } = useGetUserActivitiesQuery({
    variables: {
      limit: PAGE_SIZE,
      offset: page * PAGE_SIZE,
      orderBy: orderBy !== "" ? orderBy : undefined,
      orderDir: orderDir !== "" ? orderDir : undefined,
      name: search,
      category: category,
    },
  });

  const activities = data?.getUserActivities || [];

  useEffect(() => {
    if (activities) {
      setNotEndPage(activities.length === PAGE_SIZE);
    }
  }, [activities]);

  const handleChangeCategory = (e: any) => {
    setCategory(e.target.value);
    setPage(0)
    refetch();
  };

  const handleChangeOrderBy = (order: string) => {
    setOrderBy(order);
    handleChangeOrderDir();
    setPage(0)
    refetch();
  };

  const [deleteActiv] = useDeleteActivityMutation();

  const handleChangeOrderDir = () => {
    switch (orderDir) {
      case "":
        setOrderDir("ASC");
        break;
      case "ASC":
        setOrderDir("DESC");
        break;
      case "DESC":
        setOrderDir("");
      default:
        setOrderDir("");
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-md m-auto my-6 sm:rounded-lg w-4/5">
      <div className="flex justify-between bg-reef p-3 gap-4">
        <form
          className="w-1/3 hidden md:block"
          action="/search"
          autoComplete="off"
        >
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 right-2 flex items-center pr-3 pointer-events-none">
              <Icon name="search" color="reef" />
            </div>
            <input
              name="name"
              type="search"
              className="block w-full pl-4 pr-12 py-2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Rechercher une dépense ..."
              required
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </form>
        <div className="w-4/12">
          <select
            className="select-lg select-arrow"
            name="category"
            id="category"
            onChange={handleChangeCategory}
            value={category}
          >
            <option value="">Toutes les catégories</option>
            {Object.values(ActivityTypeEnum).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <button
          className="btn-xs bg-pearl hover:text-pearl hover:bg-anchor flex justify-center items-center gap-4"
          onClick={() => router.push("/new-activity")}
        >
          Nouvelle dépense <Icon name="add" />
        </button>
      </div>
      <table className="w-full text-xs md:text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs bg-shore text-anchor h-12">
          <tr>
            <th scope="col" className="items-center gap-2 w-3/12">
              <button
                className="px-4 flex justify-center items-center"
                type="button"
                onClick={() => handleChangeOrderBy("name")}
              >
                Nom
                {orderBy === "name" && orderDir === "ASC" && (
                  <Icon name="keyboard_arrow_down" size="md" />
                )}
                {orderBy === "name" && orderDir === "DESC" && (
                  <Icon name="keyboard_arrow_up" />
                )}
              </button>
            </th>
            <th scope="col" className="items-center gap-2  w-3/12">
              <button
                className=" px-4 flex justify-center items-center"
                type="button"
                onClick={() => handleChangeOrderBy("category")}
              >
                Type
                {orderBy === "category" && orderDir === "ASC" && (
                  <Icon name="keyboard_arrow_down" size="md" />
                )}
                {orderBy === "category" && orderDir === "DESC" && (
                  <Icon name="keyboard_arrow_up" />
                )}
              </button>
            </th>
            <th scope="col" className="items-center gap-2 w-3/12">
              <button
                className="px-4 flex justify-center items-center"
                type="button"
                onClick={() => handleChangeOrderBy("emissionPerMonth")}
              >
                Emission (en Kg de CO2)
                {orderBy === "emissionPerMonth" && orderDir === "ASC" && (
                  <Icon name="keyboard_arrow_down" size="md" />
                )}
                {orderBy === "emissionPerMonth" && orderDir === "DESC" && (
                  <Icon name="keyboard_arrow_up" />
                )}
              </button>
            </th>
            <th scope="col" className="items-center gap-2  w-3/12">
              <button
                className="px-4 flex justify-center items-center"
                type="button"
                onClick={() => handleChangeOrderBy("starts_at")}
              >
                Date de création{" "}
                {orderBy === "starts_at" && orderDir === "ASC" && (
                  <Icon name="keyboard_arrow_down" size="md" />
                )}
                {orderBy === "starts_at" && orderDir === "DESC" && (
                  <Icon name="keyboard_arrow_up" />
                )}{" "}
              </button>
            </th>
            <th scope="col" className="w-2/12 md:px-2 md:py-3"></th>
          </tr>
        </thead>
        <tbody>
          {activities.length === 0 && (
            <tr>
              <td colSpan={4} className="text-center py-2">
                Vous n'avez enregistré aucune dépense carbone correspondant à
                ces critères
              </td>
            </tr>
          )}
          {activities.map((activity) => (
            <tr
              key={activity.id}
              className="border-t border-gray-500 bg-pearl text-reef hover:bg-shore hover:text-anchor"
            >
              <td
                scope="row"
                className="px-2 py-1 md:px-6 md:py-4 font-medium whitespace-nowrap"
              >
                {activity.name}
              </td>
              <td className="px-2 py-1 md:px-6 md:py-4 hidden md:table-cell">
                {activity.category}
              </td>
              <td className="px-2 py-1 md:px-6 md:py-4 hidden md:table-cell">
                {Math.round(activity.emissionPerMonth / 1000)}
              </td>
              <td className="px-2 py-1 md:px-6 md:py-4 hidden md:table-cell">
                {convertDate(activity.starts_at)}
              </td>
              <td className="px-1 py-1 md:px-2 md:py-4">
                <div className="flex justify-end pr-4">
                  <ModalBin
                    operation={() =>
                      deleteActiv({
                        variables: {
                          activityId: activity.id,
                        },
                      }).then(() => window.location.reload())
                    }
                    expression="supprimer"
                    mappedVar={activity}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <nav
        className="flex bg-pearl text-reef items-center flex-col md:flex-row justify-between pt-2 md:pt-4 border-t border-gray-500"
        aria-label="Table navigation"
      >
        <ul className="inline-flex m-auto mb-2 md:mb-4 -space-x-px rtl:space-x-reverse text-xs md:text-sm h-6 md:h-8">
          <li>
            <button
              className={`flex items-center justify-center px-2 md:px-3 h-6 md:h-8 ms-0 leading-tight bg-pearl border border-anchor rounded-s-lg font-medium ${
                !page
                  ? "text-gray-400"
                  : "text-reef hover:bg-lightPearl hover:text-anchor"
              }`}
              disabled={!page}
              onClick={() => setPage((prev) => prev - 1)}
            >
              &lt; Précédente
            </button>
          </li>
          <li>
            <p className="flex items-center justify-center px-4 md:px-7 h-6 md:h-8 leading-tight bg-pearl text-reef border border-anchor font-medium">
              Page {page + 1}
            </p>
          </li>
          <li>
            <button
              disabled={!notEndPage}
              className="rounded-e-lg flex items-center justify-center px-4 md:px-6 h-6 md:h-8 leading-tight bg-pearl text-reef border border-anchor font-medium hover:bg-lightPearl hover:text-anchor"
              onClick={() => {
                if (notEndPage) {
                  setPage((prev) => prev + 1);
                }
              }}
            >
              Suivante &gt;
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
