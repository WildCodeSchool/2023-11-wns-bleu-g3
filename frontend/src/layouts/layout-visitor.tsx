import Footer from "@/components/footer";
import HeaderVisitor from "@/components/header-visitor";
import { ReactNode } from "react";

export default function LayoutVisitor({
  children,
  isOpen,
  setIsOpen,
}: {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: any;
}) {
  return (
    <>
      <HeaderVisitor isOpen={isOpen} setIsOpen={setIsOpen} />
      <main className="">{children}</main>
      <Footer />
    </>
  );
}
