import React from "react";
import SideLoggedInUserItem from "./side-logged-in-user-item";
import Icon from "./icon";
import { useLogoutMutation, useProfileQuery } from "@/graphql/generated/schema";
import { useRouter } from "next/router";

export default function SideLoggedInUser({ isOpen }: { isOpen: any }) {
  const router = useRouter();
  const [logout] = useLogoutMutation();
  const { data: user, client } = useProfileQuery({
    errorPolicy: "ignore",
  });

  return (
    <aside
      id="default-sidebar"
      className={` md:translate-x-0 h-full ${
        isOpen === false
          ? "-translate-x-full left-0 z-40 h-full w-64 transition-transform"
          : "translate-x-0 z-40 left-0 absolute sm:relative w-full h-full transition-transform"
      }`}
    >
      <div className="px-3 py-4 bg-reef flex flex-col justify-between min-h-screen h-full">
        <ul className="flex flex-col gap-16 h-full">
          <div className="gap-4 flex flex-col">
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
            <SideLoggedInUserItem href="/new-activity" name="Ajouter une dépense" />
            <SideLoggedInUserItem href="#" name="Mes dépenses" />
            <SideLoggedInUserItem href="#" name="Donations" />
            <SideLoggedInUserItem href="/feed" name="Les bons plans" />
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
