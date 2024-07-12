import { useGetUsersPaginationQuery } from "@/graphql/generated/schema";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const PAGE_SIZE = 6;

export default function TableAdminUsers() {
  const router = useRouter();

  // pagination offset limit
  const [page, setPage] = useState(0);
  const [notEndPage, setNotEndPage] = useState(true);

  const { data, loading, error } = useGetUsersPaginationQuery({
    variables: {
      limit: PAGE_SIZE,
      offset: page * PAGE_SIZE,
    },
  });

  useEffect(() => {
    if (data) {
      setNotEndPage(data.getUsersPagination.length === PAGE_SIZE);
    }
  }, [data]);

  if (loading) {
    return (
      <p className="mt-3 text-center justify-center align-middle m-auto">
        Chargement...
      </p>
    );
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const users = data?.getUsersPagination || [];

  return (
    <div className="m-auto w-4/5 mt-8">
      <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-lightPearl  m-auto ">
        <div>
          <button
            id="dropdownActionButton"
            data-dropdown-toggle="dropdownAction"
            className="inline-flex items-center text-reef bg-shore border border-reef focus:outline-none focus:border-reef hover:bg-shore hover:text-anchor hover:border-anchor focus:ring-2 focus:ring-reef  font-medium rounded-lg text-sm ml-1 px-4 py-1.5    "
            type="button"
          >
            Action
            <svg
              className="w-2.5 h-2.5 ms-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          {/* Dropdown menu */}
          <div
            id="dropdownAction"
            className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
          >
            <ul
              className="py-1 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownActionButton"
            >
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Reward
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Promote
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Activate account
                </a>
              </li>
            </ul>
            <div className="py-1">
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Delete User
              </a>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-reef "
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>

          <input
            id="table-search-users"
            className="text-reef bg-shore border border-reef block p-2 ps-10 text-sm rounded-lg w-80  focus:text-anchor placeholder-reef "
            placeholder="Recherche Utilisateur"
          />
        </div>
      </div>

      {/* //TABLE */}

      <table className="w-full text-xs md:text-sm text-left rtl:text-right text-gray-500 ">
        <thead className="text-xs uppercase bg-shore text-anchor ">
          <tr>
            <th scope="col" className="p-4 rounded-tl-lg">
              <div className="flex items-center">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  className="w-4 h-4 text-reef bg-pearl rounded-lg   "
                />
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Role
            </th>
            <th scope="col" className="px-6 py-3">
              État
            </th>
            <th scope="col" className="px-6 py-3 rounded-tr-lg">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {/* //rows */}
          {users.map((user) => (
            <tr
              key={user.id}
              className="border-b   border-gray-700 hover:bg-gray-50 "
            >
              <td className="w-4 p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-table-search-1"
                    type="checkbox"
                    className="w-4 h-4 text-reef bg-pearl rounded-lg   "
                  />
                </div>
              </td>
              <th
                scope="row"
                className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
              >
                <img
                  className="w-10 h-10 rounded-full  bg-shore"
                  src={user.avatarUrl as string}
                  alt="error display photo"
                />
                <div className="ps-3">
                  <div className="text-base font-semibold text-reef">
                    {" "}
                    {user.nickname}
                  </div>
                  <div className="font-normal text-gray-500">{user.email}</div>
                </div>
              </th>
              <td className="px-6 py-4">{user.role}</td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2 animate-pulse animate-fast"></div>
                  Online
                </div>
              </td>
              <td className="px-6 py-4">
                <Link
                  href=""
                  //href={`/admin/user_profile/${activity.id}`}
                  className=" text-anchor hover:underline text-md"
                >
                  <span className="pb-2">Modifié User</span>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <nav
        className="flex bg-lightpearl text-reef items-center flex-col md:flex-row justify-between pt-2 md:pt-4 border-t "
        aria-label="Table navigation"
      >
        <ul className="inline-flex m-auto mb-2 md:mb-4 -space-x-px rtl:space-x-reverse text-xs md:text-sm h-6 md:h-8 ">
          <li>
            <button
              className={`flex items-center justify-center rounded-s-lg font-medium px-2 md:px-3 h-6 md:h-8 ms-0 leading-tight bg-shore border border-reef    ${
                !page
                  ? "text-gray-400"
                  : "text-reef  hover:bg-shore hover:text-anchor hover:border-anchor"
              }`}
              disabled={!page}
              onClick={() => setPage((prev) => prev - 1)}
            >
              &lt; Précédente
            </button>
          </li>
          <li>
            <p className="flex items-center justify-center px-4 md:px-7 h-6 md:h-8 leading-tight text-reef bg-shore border border-reef font-medium">
              Page {page + 1}
            </p>
          </li>
          <li>
            <button
              className="rounded-e-lg flex items-center justify-center px-4 md:px-6 h-6 md:h-8 leading-tight text-reef bg-shore border border-reef font-medium hover:bg-shore hover:text-anchor hover:border-anchor"
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
      {/* OFFLINE STATUS<td className="px-6 py-4">
              <div className="flex items-center">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div>{" "}
                Offline
              </div>
            </td> */}
    </div>
  );
}
