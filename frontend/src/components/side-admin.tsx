import React from "react";
import SideAdminItem from "./side-admin-item";

export default function SideAdmin({ isOpen }: { isOpen: any }) {
  return (
    <aside
      id="default-sidebar"
      className={` md:translate-x-0 ${
        isOpen === false
          ? "-translate-x-full left-0 z-40 w-64 h-full transition-transform"
          : "translate-x-0 z-40 left-0 absolute sm:relative w-full sm:w-1/2 md:w-64 h-full transition-transform"
      }`}
    >
      <div className=" px-3 py-4 bg-anchor flex flex-col justify-between h-full">
        <ul className="flex flex-col gap-4">
          <SideAdminItem href="#" name="Nouveau type d'activité" />
          <SideAdminItem href="#" name="Types d'activité" />
          <SideAdminItem href="#" name="Utilisateurs" />
          <SideAdminItem href="#" name="Donations" />
          <SideAdminItem href="#" name="Déconnexion" />
        </ul>
      </div>
    </aside>
  );
}
