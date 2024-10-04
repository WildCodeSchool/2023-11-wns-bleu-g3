import { useLogoutMutation, useProfileQuery } from "@/graphql/generated/schema";
import { useRouter } from "next/router";

export default function NotifDropdown() {
  const router = useRouter();

  const { data: user, client } = useProfileQuery({
    errorPolicy: "ignore",
  });

  return (
    <div className="mt-10 fixed top-5 right-[8.5rem] z-50 w-full max-w-sm">
      <div className="p-4 text-anchor bg-lightPearl rounded-lg shadow">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-semibold">Notification</span>
          <button
            type="button"
            className="flex items-center justify-center w-8 h-8 bg-slate-500 text-gray-200 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 hover:bg-gray-100"
            aria-label="Close"
          >
            <span className="material-icons text-xl">close</span>
          </button>
        </div>
        <div className="flex items-start">
          <div className="relative flex-shrink-0">
            <img
              className="w-12 h-12 rounded-full"
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fplay-lh.googleusercontent.com%2F7Ak4Ye7wNUtheIvSKnVgGL_OIZWjGPZNV6TP_3XLxHC-sDHLSE45aDg41dFNmL5COA&f=1&nofb=1&ipt=714243143a7e9f547ceb9dd2d2df54d48dfaa7d9ec312b8bc66acadd6371fbf7&ipo=images"
              alt="User avatar"
            />
            <span className="text-white absolute material-icons bottom-0 right-0 inline-flex items-center justify-center w-6 h-6 bg-red-600 rounded-full">
              flag
            </span>
          </div>
          <div className="ml-3 text-sm">
            <div className="font-semibold">MarieMer</div>
            <div className="font-normal">
              vient de signaliser une publication.
            </div>
            <span className="text-xs font-medium text-reef mt-1">
              à l'instant
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
