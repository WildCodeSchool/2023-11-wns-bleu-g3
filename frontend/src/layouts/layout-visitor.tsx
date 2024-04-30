import Footer from "@/components/footer";
import HeaderVisitor from "@/components/header-visitor";

export default function LayoutVisitor({ children }: { children: any }) {
  return (
    <>
      <HeaderVisitor />
      <main>{children}</main>
      <Footer />
    </>
  );
}
