import SideAdmin from "@/components/backoffice/side-admin";
import TopbarAdmin from "@/components/topbar-admin";
import React, { ReactNode, use, useState } from "react";

export default function LayoutAdmin({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <TopbarAdmin
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isOpen2={isOpen}
        setIsOpen2={setIsOpen}
      />
      <div className="flex flex-1 overflow-hidden bg-lightPearl">
        <div className={`${isOpen ? "block" : "hidden"} md:block`}>
          <SideAdmin isOpen={isOpen} />
        </div>
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
