import { useLogoutMutation, useProfileQuery } from "@/graphql/generated/schema";
import { useRouter } from "next/router";

export default function TopbarMenu() {
  const router = useRouter();
  const [logout] = useLogoutMutation();
  const { data: user, client } = useProfileQuery({
    errorPolicy: "ignore",
  });

  return (
    <div className="mt-4 absolute inset-y-0 end-0 z-10">
      <div className="flex flex-col gap-2 py-4">
        <button
          className="btn btn-shore"
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
    </div>
  );
}
