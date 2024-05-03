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
        <img src="../../img/greenfoot-logo.png" alt="" className="w-14" />

        <h1 className="text-white text-xl md:text-3xl font-bold drop-shadow-lg">
          GreenFoot <br className="md:hidden" /> BackOffice
        </h1>
      </div>
      <div className="hidden md:block">
        <button className="h-14 w-14 rounded-full bg-reef flex justify-center items-center text-xl text-white font-semibold btn hover:bg-white hover:text-anchor transition ease-in-out">
          GT
        </button>
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
