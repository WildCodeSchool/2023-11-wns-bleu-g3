import React from "react";
import SideLoggedInUserItem from "./side-logged-in-user-item";
import Icon from "./icon";

export default function SideLoggedInUser({ isOpen }: { isOpen: any }) {
  return (
    <aside
      id="default-sidebar"
      className={` md:translate-x-0 ${
        isOpen === false
          ? "-translate-x-full left-0 z-40 w-64 h-full transition-transform"
          : "translate-x-0 z-40 left-0 absolute sm:relative w-full sm:w-1/2 md:w-64 h-full transition-transform"
      }`}
    >
      <div className=" px-3 py-4 bg-reef flex flex-col justify-between h-full">
        <ul className="flex flex-col gap-4">
          <form
            className="w-full block md:hidden"
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
              <div className="absolute inset-y-0 end-2 flex items-center ps-3 pointer-events-none">
                <Icon name="search" color="reef" />
              </div>
              <input
                type="search"
                name="name"
                className="block input-text-sm"
                placeholder="Rechercher un utilisateur ..."
                required
              />
            </div>
          </form>
          <SideLoggedInUserItem href="/dashboard" name="Tableau de bord" />
          <SideLoggedInUserItem href="#" name="Ajouter une dépense" />
          <SideLoggedInUserItem href="#" name="Mes dépenses" />
          <SideLoggedInUserItem href="#" name="Donations" />
          <SideLoggedInUserItem href="#" name="Les bons plans" />
        </ul>
      </div>
    </aside>
  );
}
