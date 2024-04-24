import Image from "next/image";
import { Inter } from "next/font/google";
import { useProfileQuery } from "@/graphql/generated/schema";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: user } = useProfileQuery({
    errorPolicy: "ignore",
  });

  return (
    <main>
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className=" text-reef">
          {`Bonjour ${user?.profile[0]?.nickname}` || "Hello, World!"}
        </h1>
      </div>
    </main>
  );
}
