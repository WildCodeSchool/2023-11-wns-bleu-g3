import { useEffect, useState } from "react";
import ModalAuthentication from "./modal-authentication";
import useScroll from "@/hooks/useScroll";

export default function HeaderVisitor() {
  const scrollY = useScroll();

  return (
    <header
      className={`flex justify-between p-4 sticky ${
        scrollY > 90
          ? "bg-shore shadow-sm transition duration-300 ease-in-out"
          : "transition duration-300 ease-in-out"
      } top-0`}
    >
      <div className="flex justify-center items-center gap-2">
        <img src="../../img/greenfoot-logo.png" alt="" className="w-14" />

        <h1 className="text-reef text-xl md:text-3xl font-bold drop-shadow-lg">
          GreenFoot
        </h1>
      </div>
      <ModalAuthentication />
    </header>
  );
}
