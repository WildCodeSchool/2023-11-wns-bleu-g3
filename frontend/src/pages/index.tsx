import LayoutVisitor from "@/layouts/layout-visitor";

export default function Home() {
  return (
    <LayoutVisitor>
      <section className="relative bg-[url(https://images.unsplash.com/photo-1428908728789-d2de25dbd4e2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-center bg-no-repeat">
        <div className="px-4 py-48 sm:px-6 flex flex-col lg:justify-center h-screen items-center lg:px-8 lg:pt-10">
          <h2 className="text-2xl font-medium text-reef sm:text-4xl text-center">
            Réduisez votre empreinte carbone, préservez notre avenir.
          </h2>
          <div className="mt-8 flex flex-col gap-4 text-center">
            <a
              href="#"
              className="btn bg-lightPearl text-reef px-6 md:px-24 md:text-lg shadow-sm hover:bg-reef hover:text-lightPearl transition ease-in-out"
            >
              Calculez votre empreinte carbone
            </a>
          </div>
        </div>
      </section>
    </LayoutVisitor>
  );
}
