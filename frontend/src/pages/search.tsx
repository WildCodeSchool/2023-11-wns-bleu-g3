import { useSearchUserQuery } from "@/graphql/generated/schema";
import LayoutLoggedInUser from "@/layouts/layout-logged-in-user";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Search() {
  const searchParams = useSearchParams();
  const { data: users } = useSearchUserQuery({
    variables: { name: searchParams.get("name") || "" },
  });

  console.log(users);
  return (
    <LayoutLoggedInUser>
      <h2 className="text-2xl text-center">
        {searchParams && users
          ? `Les utilisateurs qui correspondent à votre recherche '${searchParams.get(
              "name"
            )}'`
          : "Aucun utilisateur n'a été trouvé"}
      </h2>
      <section className="py-6 flex flex-wrap">
        {users?.searchUser.map((user) => (
          <a
            href={`/user/${user.id}/${user.nickname}`}
            className="relative flex w-full md:w-1/4 flex-col rounded-xl bg-clip-border text-gray-700 bg-white p-3 shadow-sm"
            key={user.id}
          >
            <div className="relative flex items-center gap-4 pt-0 pb-8 mx-0 mt-4 overflow-hidden text-gray-700 bg-transparent shadow-none rounded-xl bg-clip-border">
              <img
                src={user.avatarUrl || ""}
                alt="Tania Andrew"
                className="relative inline-block h-[58px] w-[58px] !rounded-full  object-cover object-center"
              />
              <div className="flex w-full flex-col gap-0.5">
                <div className="flex items-center justify-between">
                  <h5 className="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                    {user.nickname}
                  </h5>
                </div>
                <p className="block font-sans text-base antialiased font-light leading-relaxed text-blue-gray-900">
                  {user.firstName} {user.lastName}
                </p>
              </div>
            </div>
          </a>
        ))}
      </section>
    </LayoutLoggedInUser>
  );
}
