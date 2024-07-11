import Icon from "./icon";

export default function TopbarAdmin({
  isOpen,
  setIsOpen,
}: {
  isOpen: any;
  setIsOpen: any;
}) {
  console.log(isOpen);
  return (
    <nav className="flex flex-row justify-between items-center p-4 bg-anchor opacity-85 w-full">
      <div className="flex justify-center items-center gap-2">
        <a href="/admin/dashboard">
          <img
            src="../../img/greenfoot-logo.png"
            alt="greenfoot logo"
            className="w-14"
          />
        </a>

        <h1 className="text-white text-xl md:text-3xl font-bold drop-shadow-lg">
          <a href="/admin/dashboard">
            {" "}
            GreenFoot <br className="md:hidden" /> BackOffice
          </a>
        </h1>
      </div>
      <div className="hidden md:block">
        <a
          href="/dashboard"
          className="bg-gradient-to-r bg-pearl  hover:bg-gradient-to-br hover:from-pearl  hover:to-shore focus:ring-4 focus:outline-none focus:ring-shore font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center space-x-2"
        >
          <svg
            className="w-5 h-5 text-anchor  group-hover:text-blue-600 "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
          </svg>
          <span className="text-md">User Interface</span>
        </a>
      </div>

      {isOpen === false ? (
        <button onClick={() => setIsOpen(true)} className="md:hidden">
          <Icon name="menu" size="4xl" color="white" />
        </button>
      ) : (
        <button onClick={() => setIsOpen(false)} className="md:hidden">
          <Icon name="close" size="4xl" color="white" />
        </button>
      )}
    </nav>
  );
}
