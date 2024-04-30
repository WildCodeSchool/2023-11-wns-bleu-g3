import ModalAuthentication from "./modal-authentication";

export default function HeaderVisitor() {
  return (
    <header className="flex justify-between p-4">
      <div className="flex justify-center items-center gap-2">
        <img src="../../img/greenfoot-logo.png" alt="" className="w-14" />

        <h1
          className="text-reef text-xl md:text-3xl font-bold drop-shadow-lg"
        //   style={{ textShadow: "1px 1px 0 gray" }}
        >
          GreenFoot
        </h1>
      </div>
      <button className="flex items-center justify-center gap-2 text-reef md:text-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z"
          />
          <path
            fill-rule="evenodd"
            d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
          />
        </svg>
        Connexion
      </button>
    </header>
  );
}
