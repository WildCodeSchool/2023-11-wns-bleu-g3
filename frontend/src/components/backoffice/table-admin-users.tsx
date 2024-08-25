import { useGetUsersPaginationQuery } from "@/graphql/generated/schema";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import ModalBin from "../modalBin";
import { time } from "console";

const PAGE_SIZE = 6;

export default function TableAdminUsers() {
  const router = useRouter();

  // pagination offset limit
  const [page, setPage] = useState(0);
  const [notEndPage, setNotEndPage] = useState(true);
  const [dropMenu, setDropMenu] = useState(false);

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

  const changeMenu = () => {
    setDropMenu(!dropMenu);
  };

  function formatTimestamp(timestamp: string): string {
    const timestamp2 = parseInt(timestamp, 10);
    const date = new Date(timestamp2);

    const y = date.getFullYear();
    const m = (date.getMonth() + 1).toString().padStart(2, "0"); //getmonth() returns 0-11
    const d = date.getDate().toString().padStart(2, "0");
    return `${d}/${m}/${y}`;
  }

  return (
    <div className="m-auto w-4/5 mt-8">
      <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-lightPearl  m-auto ">
        <div>
          <button
            id="dropdownActionButton"
            data-dropdown-toggle="dropdownAction"
            className="inline-flex items-center text-reef bg-shore border border-reef focus:border-reef hover:bg-shore hover:text-anchor hover:border-anchor focus:outline-none text-sm  font-medium rounded-lg  px-4 py-1.5    "
            type="button"
            onClick={changeMenu}
            onMouseOver={changeMenu}
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
          {dropMenu && (
            <div
              id="dropdownAction"
              className="z-20 absolute bg-shore divide-y divide-reef text-reef border border-reef rounded-lg shadow w-44 text-sm  font-medium"
            >
              <ul
                className="py-1 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownActionButton"
              >
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-reef bg-shore  focus:border-reef hover:bg-reef hover:text-lightPearl hover:border-anchor"
                  >
                    Bloquer
                  </a>
                </li>
              </ul>
              <div className="py-1">
                <a
                  href="#"
                  className="block px-4 py-2 text-reef bg-shore  focus:border-reef hover:bg-reef hover:text-lightPearl hover:border-anchor"
                >
                  Supprime
                </a>
              </div>
            </div>
          )}
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

            <th scope="col" className="px-6 py-3 "></th>
            <th scope="col" className=" py-3 ">
              Inscription
            </th>
            <th scope="col" className="px-6 py-3">
              Role
            </th>

            <th scope="col" className="pl-6  py-3 rounded-tr-lg">
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
              <td className="px-6 py-4">
                {user.isBlocked ? (
                  <div className="flex items-center">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        width="2rem"
                        height="2rem"
                      >
                        <g id="Layer_2" data-name="Layer 2">
                          <g id="Layer_1_copy_8" data-name="Layer 1 copy 8">
                            <g id="_24" data-name="24">
                              <path d="M184.69,357.17c48.28,34.06,115.66,29.52,158.83-13.65S391.23,233,357.17,184.69Z" />
                              <path d="M256,132.23a123,123,0,0,0-87.52,36.25C125.31,211.65,120.77,279,154.83,327.31l172.49-172.5A122.86,122.86,0,0,0,256,132.23Z" />
                              <path d="M391.32,0H120.68A120.68,120.68,0,0,0,0,120.68V391.32A120.68,120.68,0,0,0,120.68,512H391.32A120.68,120.68,0,0,0,512,391.32V120.68A120.68,120.68,0,0,0,391.32,0ZM373.38,373.38A166,166,0,1,1,422,256,164.92,164.92,0,0,1,373.38,373.38Z" />
                            </g>
                          </g>
                        </g>
                      </svg>
                    </div>
                    <div className="mx-2">
                      <p className="text-xs">Compte suspendu depuis:</p>
                      <p className="text-black">{user.blocked_at}fdhjhj</p>
                    </div>
                  </div>
                ) : null}
              </td>
              <td className="py-4">{formatTimestamp(user.createdAt)}</td>
              <td className="px-6 py-4">{user.role}</td>
              <td className="px-6  flex gap-x-8">
                <button>
                  <svg
                    enable-background="new 0 0 64 64"
                    height="2rem"
                    viewBox="0 0 64 64"
                    width="2rem"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="Layer_21">
                      <g fill="#D3D3D3">
                        <path d="m44.3499756 18.7799683c-.9799805 0-1.7699585.8600464-1.7699585 1.9100342v8.3599854c0 .460022-.3699951.8300171-.8300171.8300171-.4500122 0-.8200073-.3699951-.8200073-.8300171v-13.630005c0-1.4799805-1.1300049-2.6900024-2.5100098-2.6900024-1.3899536 0-2.5100098 1.210022-2.5100098 2.6900024v13.6300049c0 .460022-.3699951.8300171-.8299561.8300171-.4500122 0-.8200073-.3699951-.8200073-.8300171v-16.5100098c0-1.5499878-1.1799927-2.8099976-2.6300049-2.8099976-1.4400024 0-2.6199951 1.2600098-2.6199951 2.8099976v16.5100098c0 .460022-.3699951.8300171-.8300171.8300171-.4500122 0-.8200073-.3699951-.8200073-.8300171v-12.0300293c0-1.3399658-1.0100098-2.4299927-2.2600098-2.4299927s-2.2599487 1.0900269-2.2599487 2.4299927v13.4900513c0 .0099487 0 .0099487.0099487.0199585l2.3699951 7.9400024c.1300049.4299927-.1199951.8900146-.5599976 1.0200195-.4299927.1300049-.8899536-.1099854-1.0199585-.5499878l-2.369995-7.9400024c-.3600464-1.2000122-1.1700439-2.210022-2.2000122-2.7399902-.8900146-.4700317-1.8900146-.5500488-2.8099976-.25-.2900391.0999756-.4500122.5-.3400269.8699951l2.3800049 7.9599609c.6300049 2.3099976 2.3200073 8.460022 2.6600342 9.3000488 1.9799805 4.9399414 6.5199585 8.1299438 11.5700073 8.1299438h1c6.9399414 0 12.5799561-5.9799805 12.5799561-13.3199463v-20.2600097c.0000001-1.0499878-.789978-1.9100341-1.7600097-1.9100341z" />
                        <path d="m32 3c-16.0200195 0-29 12.9799805-29 29 0 16.0199585 12.9799805 29 29 29s29-12.9800415 29-29c0-16.0200195-12.9799805-29-29-29zm15.7600098 31.3399658v.0200195 6.5900269c0 8.25-6.3900146 14.9699707-14.2299805 14.9699707h-1c-5.7300415 0-10.8700562-3.5999756-13.1000366-9.1699829-.4299927-1.0800171-2.4799805-8.6099854-2.7199707-9.460022l-2.3699951-7.9400024c-.3700562-1.2199707.2599487-2.5299683 1.3999634-2.8999634 1.3500366-.4500122 2.7999877-.3300171 4.0900268.3399658.5.2600098.9599609.6000366 1.3599854 1v-10.7700195c0-2.25 1.7600098-4.0799561 3.9099731-4.0799561.8400269 0 1.6199951.289978 2.2600098.7600098v-1.1600342c0-2.460022 1.9200439-4.460022 4.2700195-4.460022 2.1900024 0 3.9899902 1.7200317 4.2399902 3.9300537.710022-.5700073 1.5800171-.9300537 2.5499878-.9300537 2.2900391 0 4.1600342 1.9500122 4.1600342 4.3400269v2.2399902c.5100098-.3300171 1.1199951-.5299683 1.7699585-.5299683 1.8800049 0 3.4100342 1.5999756 3.4100342 3.5599976z" />
                      </g>
                    </g>
                  </svg>
                </button>
                <button>
                  <ModalBin operation="" />
                </button>
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
    </div>
  );
}
