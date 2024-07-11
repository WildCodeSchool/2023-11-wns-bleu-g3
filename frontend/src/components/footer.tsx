/* eslint-disable @next/next/no-img-element */
export default function Footer() {
  return (
    <footer className="bg-anchor bg-opacity-80 flex flex-col md:flex-row justify-center md:justify-between items-center p-4 gap-6 md:gap-0">
      <div className="flex flex-col md:flex-row justify-center items-center gap-2">
        <img src="../../img/greenfoot-logo.png" alt="" className="w-14" />

        <div className="flex flex-col justify-center md:items-start items-center">
          <h3 className="font-bold text-shore drop-shadow-lg text-xl md:text-3xl">
            GreenFoot
          </h3>
          <h4 className="text-white font-normal">Vers un futur viable.</h4>
        </div>
      </div>
      <ul className="flex flex-col justify-center items-center text-white">
        <li className="cursor-pointer hover:underline">
          <a href="#">Contactez-nous</a>
        </li>
        <li className="cursor-pointer hover:underline">
          <a href="#">Mentions légales</a>
        </li>
      </ul>
    </footer>
  );
}
