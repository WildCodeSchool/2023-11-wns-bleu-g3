import Footer from "@/components/footer";
import { useProfileQuery } from "@/graphql/generated/schema";
import LayoutVisitor from "@/layouts/layout-visitor";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: user } = useProfileQuery({
    errorPolicy: "ignore",
  });
  return (
    // <main className="">

    // </main>
    <LayoutVisitor>
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-reef">
        </h1>
      </div>
    </LayoutVisitor>
  );
}
