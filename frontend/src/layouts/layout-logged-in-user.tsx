import SideLoggedInUser from "@/components/side-logged-in-user";
import Footer from "@/components/footer";
import TopbarLoggedInUser from "@/components/topbar-logged-in-user";
import { useState } from "react";

export default function LayoutLoggedInUser({ children }: { children: any }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <TopbarLoggedInUser isOpen={isOpen} setIsOpen={setIsOpen} />
      <main className="flex justify-between h-full">
        <SideLoggedInUser isOpen={isOpen} />
        <div className="p-4 md:p-6 w-full absolute md:relative">{children}</div>
      </main>
      <Footer />
    </>
  );
}
