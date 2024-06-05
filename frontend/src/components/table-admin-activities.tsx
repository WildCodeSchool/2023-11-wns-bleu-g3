import Icon from "@/components/icon";
import { useGetActivitiesTypesPaginationQuery } from "@/graphql/generated/schema";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

const PAGE_SIZE = 8;

export default function TableActivities() {
  const [page, setPage] = useState(0);
  const [notEndPage, setNotEndPage] = useState(true);

  const { data, loading, error } = useGetActivitiesTypesPaginationQuery({
    variables: {
      limit: PAGE_SIZE,
      offset: page * PAGE_SIZE,
    },
  });

  //this useEffect regards if next page doesnt contain thhe expected number of items from page size
  useEffect(() => {
    if (data) {
      setNotEndPage(data.getActivitiesTypesPagination.length === PAGE_SIZE);
    }
  }, [data]);

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const activities = data?.getActivitiesTypesPagination || [];

  return (
    <div className="relative  overflow-x-auto shadow-md m-auto my-6 sm:rounded-lg w-4/5">
      <table
        className="w-full text-sm text-left  rtl:text-right text-gray-500 "
        id="toptable"
      >
        <thead className="text-xs  uppercase bg-shore  text-anchor">
          <tr>
            <th scope="col" className="px-6 py-3">
              Nom
            </th>
            <th scope="col" className="px-6 py-3">
              Catégorie
            </th>
            <th scope="col" className="px-6 py-3">
              Emissions
            </th>
            <th scope="col" className="px-6 py-3">
              Unité
            </th>
            <th scope="col" className="px-2 py-3"></th>
            <th scope="col" className="px-2 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activities) => (
            <tr className=" border-t border-gray-500 bg-pearl text-reef  hover:bg-shore hover:text-anchor">
              <th
                scope="row"
                className="px-6 py-4 font-medium  whitespace-nowrap "
              >
                {activities.name}
              </th>

              <td className="px-6 py-4">{activities.category}</td>
              <td className="px-6 py-4">{activities.emissions}</td>
              <td className="px-6 py-4">{activities.unit}</td>
              <td className=" py-4">
                <a
                  href="#"
                  className="font-medium text-anchor hover:underline "
                >
                  <Icon name="edit" size="" color="reef" />
                </a>
              </td>
              <td className=" py-4">
                <a href="#" className="font-medium text-error hover:underline">
                  <Icon name="delete" size="" color="" />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <nav
        className="flex bg-pearl text-reef items-center flex-column flex-wrap md:flex-row justify-between pt-4  border-t border-gray-500 "
        aria-label="Table navigation"
      >
        <ul className="inline-flex m-auto mb-4  -space-x-px rtl:space-x-reverse text-sm h-8 hover:bg-lightPearl">
          <li>
            <button
              className="flex items-center justify-center px-3 h-8 ms-0 leading-tight  bg-pearl text-reef border border-anchor rounded-s-lg  font-medium  hover:bg-lightPearl hover:text-anchor"
              disabled={!page}
              onClick={() => setPage((prev) => prev - 1)}
            >
              &lt; Précédente
            </button>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-7 h-8  leading-tight  bg-pearl text-reef border border-anchor   font-medium   "
            >
              Page {page + 1}
            </a>
          </li>
          <li>
            <button
              className="rounded-e-lg  flex items-center justify-center px-6 h-8  leading-tight  bg-pearl text-reef border border-anchor   font-medium  hover:bg-lightPearl hover:text-anchor"
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
