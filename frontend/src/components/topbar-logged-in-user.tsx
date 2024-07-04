import { useEffect, useRef, useState } from "react";
import Icon from "./icon";
import TopbarMenu from "./topbar-menu";
import { useSearchUserLazyQuery } from "@/graphql/generated/schema";

export default function TopbarLoggedInUser({
  isOpen,
  setIsOpen,
}: {
  isOpen: any;
  setIsOpen: any;
}) {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [getUsers, { data: users }] = useSearchUserLazyQuery();

  const handleOpenMenu = () => {
    setMenuIsOpen(!menuIsOpen);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (searchQuery.length) {
      url.searchParams.set("search", searchQuery);
      try {
        if (searchQuery.length > 2) {
          getUsers({ variables: { name: searchQuery } });
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      url.searchParams.delete("search");
    }
    // Router.replace(url.toString());
  }, [searchQuery]);

  return (
    <nav className="flex flex-row justify-between items-center p-4 bg-shore w-full">
      <div className="flex justify-center items-center gap-2">
        <img src="/img/greenfoot-logo.png" alt="" className="w-14" />

        <h1 className="text-reef text-xl md:text-3xl font-bold drop-shadow-lg">
          GreenFoot
        </h1>
      </div>
      {isOpen === false ? (
        <button onClick={() => setIsOpen(true)} className="md:hidden">
          <Icon name="menu" size="4xl" color="reef" />
        </button>
      ) : (
        <button onClick={() => setIsOpen(false)} className="md:hidden">
          <Icon name="close" size="4xl" color="reef" />
        </button>
      )}
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
            className="block w-full pl-10 pr-3 py-2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Rechercher un utilisateur ..."
            required
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {users && users.searchUser.length > 0 && searchQuery.length > 2 && (
          <ul className="bg-white space-y-2 py-4 mt-2 rounded-lg shadow-md absolute z-10 w-[32%] mx-auto">
            {users.searchUser.map((user) => (
              <li
                key={user.id}
                className="flex items-center space-x-4 hover:bg-gray-100 px-4"
              >
                <img
                  src={user.avatarUrl}
                  alt={`${user.nickname}'s avatar`}
                  className="w-8 h-8 rounded-full"
                />
                <a
                  href={`/user/${user.id}/${user.nickname}`}
                  className="text-gray-900 w-full py-2"
                >
                  {user.nickname}
                </a>
              </li>
            ))}
          </ul>
        )}
      </form>

      <div className="hidden md:block" ref={menuRef}>
        <button
          onClick={handleOpenMenu}
          className="h-14 w-14 rounded-full bg-reef flex justify-center items-center text-xl text-white font-semibold btn hover:bg-anchor transition ease-in-out"
        >
          GT
        </button>
        {menuIsOpen && (
          <div className="relative">
            <TopbarMenu />
          </div>
        )}
      </div>
    </nav>
  );
}
