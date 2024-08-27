import React from "react";
import SideAdminItem from "./side-admin-item";
import { useLogoutMutation, useProfileQuery } from "@/graphql/generated/schema";
import { useRouter } from "next/router";

export default function SideAdmin({ isOpen }: { isOpen: any }) {
  const router = useRouter();
  const [logout] = useLogoutMutation();
  const { data: user, client } = useProfileQuery({
    errorPolicy: "ignore",
  });

  return (
    <aside
      id="default-sidebar"
      // className={` md:translate-x-0 h-full  bg-anchor ${
      //   isOpen === false
      //     ? "-translate-x-full left-0 z-40 h-full w-64 transition-transform  bg-anchor"
      //     : "translate-x-0 z-40 left-0 absolute sm:relative w-full h-full transition-transform  bg-anchor"
      // }`}
      className={`md:translate-x-0 h-[calc(100vh-64px)] ${
        isOpen === false
          ? "-translate-x-full left-0 z-40 w-64 transition-transform"
          : "translate-x-0 z-40 left-0 fixed md:static w-full md:w-64 transition-transform"
      } overflow-y-auto`}
    >
      <div className="px-3 py-4 bg-anchor flex flex-col justify-between h-full">
        <ul className="flex flex-col gap-4 ">
          <div className="gap-4 flex flex-col">
            <SideAdminItem href="/admin/dashboard" name="Dashboard Admin" />
            <SideAdminItem href="/admin/users" name="Utilisateurs" />
            <SideAdminItem href="/admin/posts" name="Moderation Posts" />
            <SideAdminItem href="/admin/activities" name="Activités Type" />
            <SideAdminItem
              href="/admin/newActivType"
              name="Ajouté Activité Type"
            />
            <SideAdminItem href="/admin/donations" name="Consulter Donations" />
            <SideAdminItem href="/dashboard" name="Retour a l'Accueil" />
          </div>

          <div className="md:hidden flex flex-col gap-2 py-4">
            <button
              className="btn btn-shore bg-gray-100"
              onClick={() => router.push("/profile")}
            >
              Mon compte
            </button>
            <button
              className="btn btn-error"
              onClick={async () => {
                await logout();
                router.push("/");
                client.resetStore();
              }}
            >
              Déconnexion
            </button>
          </div>
        </ul>
      </div>
    </aside>
  );
}
