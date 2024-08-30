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
      className={`md:translate-x-0 h-[calc(100vh-64px)] ${
        isOpen === false
          ? "-translate-x-full left-0 z-40 w-64 transition-transform"
          : "translate-x-0 z-40 left-0 fixed md:static w-full md:w-64 transition-transform"
      } overflow-y-auto`}
    >
      <div className="px-3 py-4 bg-anchor flex flex-col justify-between h-full">
        <ul className="flex flex-col gap-5 justify-between h-full">
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
          </div>

          <div className="flex  flex-col gap-3 py-2 mb-2 ">
            <a
              className="btn bg-neutral-900 hover:bg-neutral-950 text-left bg-opacity-90 text-gray-600"
              href="/profile"
            >
              Mon compte
            </a>
            <button
              className=" text-gray-400 py-[0.3rem]   rounded-lg bg-red-900 bg-opacity-50  hover:bg-opacity-80"
              onClick={async () => {
                await logout();
                router.push("/");
                client.resetStore();
              }}
            >
              <span className="material-icons text-xl">logout</span>
            </button>
          </div>
        </ul>
      </div>
    </aside>
  );
}
