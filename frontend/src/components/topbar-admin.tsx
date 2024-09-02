import { useEffect, useRef, useState } from "react";
import Icon from "./icon";
import {
  useProfileQuery,
  useSearchUserLazyQuery,
} from "@/graphql/generated/schema";
import TopbarMenu from "./topbar-menu";

export default function TopbarAdmin({
  isOpen,
  setIsOpen,
}: {
  isOpen: any;
  setIsOpen: any;
}) {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { data: loggedInUser } = useProfileQuery();
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

  return (
    <nav className="flex flex-row justify-between items-center p-4 bg-anchor opacity-85 w-full">
      <div className="flex justify-center items-center gap-2">
        <a href="/admin/dashboard">
          <img
            src="../../img/greenfoot-logo.png"
            alt="greenfoot logo"
            className="w-14"
          />
        </a>

        <h1 className="text-white text-xl md:text-3xl font-bold drop-shadow-lg">
          <a href="/admin/dashboard">
            GreenFoot <br className="md:hidden" /> BackOffice
          </a>
        </h1>
      </div>

      <div className="flex gap-x-3">
        <div className="relative mx-2">
          <button className="hover:bg-black focus:bg-opacity-60 px-1 rounded-full    ">
            <span className="material-icons text-[2.4rem] text-white pt-1">
              notifications
            </span>
            <span className="absolute top-5 right-[0.15rem] inline-flex items-center justify-center w-1 h-1 p-2.5 text-sm font-medium rounded-full bg-reef text-white">
              3
            </span>
          </button>
        </div>
        <button onClick={handleOpenMenu}>
          <img
            src={loggedInUser?.profile.avatarUrl || ""}
            alt={`${loggedInUser?.profile.role}`}
            className="w-12 h-12 rounded-full mx-4 opacity-90 border-2 border-reef hover:border-whiten hover:opacity-100 transition ease-in-out mr-5"
          />
        </button>
        {menuIsOpen && (
          <div className="relative">
            <TopbarMenu />
          </div>
        )}
      </div>

      {isOpen === false ? (
        <button onClick={() => setIsOpen(true)} className="md:hidden">
          <Icon name="menu" size="4xl" color="white" />
        </button>
      ) : (
        <button onClick={() => setIsOpen(false)} className="md:hidden">
          <Icon name="close" size="4xl" color="white" />
        </button>
      )}
    </nav>
  );
}
