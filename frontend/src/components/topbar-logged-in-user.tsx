import { useEffect, useRef, useState } from "react";
import Icon from "./icon";
import TopbarMenu from "./topbar-menu";

export default function TopbarLoggedInUser({
  isOpen,
  setIsOpen,
}: {
  isOpen: any;
  setIsOpen: any;
}) {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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

  return (
    <nav className="flex flex-row justify-between items-center p-4 bg-shore w-full">
      <div className="flex justify-center items-center gap-2">
        <img src="../../img/greenfoot-logo.png" alt="" className="w-14" />

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
      <form className="w-1/3 hidden md:block">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 end-2 flex items-center ps-3 pointer-events-none">
            <Icon name="search" color="reef" />
          </div>
          <input
            type="search"
            id="default-search"
            className="block input-text-sm"
            placeholder="Rechercher un utilisateur ..."
            required
          />
        </div>
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
