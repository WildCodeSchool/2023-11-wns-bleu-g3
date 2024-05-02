import Footer from "@/components/footer";
import HeaderVisitor from "@/components/header-visitor";

export default function LayoutVisitor({
  children,
  isOpen,
  setIsOpen,
}: {
  children: any;
  isOpen: boolean;
  setIsOpen: any;
}) {
  return (
    <>
      <HeaderVisitor isOpen={isOpen} setIsOpen={setIsOpen} />
      <main className="h-full">{children}</main>
      <Footer />
    </>
  );
}
