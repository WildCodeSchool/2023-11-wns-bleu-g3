import { useProfileQuery } from "@/graphql/generated/schema";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: user } = useProfileQuery({
    errorPolicy: "ignore",
  });
  return (
    <main className="p-5">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-reef">
          {!user ? "Hello, World!" : `Bonjour ${user?.profile[0]?.nickname}`}
        </h1>
      </div>
    </main>
  );
}
