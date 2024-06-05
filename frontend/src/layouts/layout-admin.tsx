import SideAdmin from "@/components/side-admin";
import TopbarAdmin from "@/components/topbar-admin";
import React, { use, useState } from "react";

export default function LayoutAdmin({ children }: { children: any }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <TopbarAdmin isOpen={isOpen} setIsOpen={setIsOpen} />
      <main className="flex justify-between bg-lightPearl h-full">
        <SideAdmin isOpen={isOpen} />
        <div className="p-4 md:p-6 w-full absolute md:relative">{children}</div>
      </main>
    </>
  );
}
