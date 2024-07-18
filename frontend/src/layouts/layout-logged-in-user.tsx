import SideLoggedInUser from "@/components/side-logged-in-user";
import Footer from "@/components/footer";
import TopbarLoggedInUser from "@/components/topbar-logged-in-user";
import { ReactNode, useState } from "react";
import useScreenSize from "@/hooks/useScreenSize";

export default function LayoutLoggedInUser({
  children,
}: {
  children: ReactNode;
}) {
  const screenSize = useScreenSize();
  const [isOpen, setIsOpen] = useState(false);

  if (screenSize.width > 768) {
    return (
      <>
        <TopbarLoggedInUser isOpen={isOpen} setIsOpen={setIsOpen} />
        <main className="flex min-h-screen w-full h-full">
          <SideLoggedInUser isOpen={isOpen} />
          <div className="p-4 md:p-6 w-full">{children}</div>
        </main>
        <Footer />
      </>
    );
  } else {
    return (
      <>
        <TopbarLoggedInUser isOpen={isOpen} setIsOpen={setIsOpen} />
        <main className="flex min-h-screen w-full h-full">
          <div className={`${isOpen ? "flex w-full h-full" : "hidden"}`}>
            <SideLoggedInUser isOpen={isOpen} />
          </div>
          <div className="p-4 md:p-6 w-full">{children}</div>
        </main>
        <Footer />
      </>
    );
  }
}
