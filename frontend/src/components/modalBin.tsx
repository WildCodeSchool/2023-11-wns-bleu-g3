import { useState } from "react";

export default function ModalBin({
  operation,
  expression,
  mappedVar,
}: {
  operation: any;
  expression: string;
  mappedVar: any;
}) {
  const [isOpen, setIsOpen] = useState(false);

  let btn;

  switch (expression) {
    case "supprimer":
      btn = (
        <button
          type="button"
          className="material-icons text-red-700 "
          onClick={() => setIsOpen(true)}
        >
          delete
        </button>
      );
      break;
    case "bloquer":
      if (!mappedVar.isBlocked) {
        btn = (
          <button
            type="button"
            className="material-icons text-gray-500  text-3xl"
            onClick={() => setIsOpen(true)}
          >
            person_off
          </button>
        );
      }
      break;
    case "debloquer":
      btn = (
        <button
          type="button"
          className="material-icons text-green-700 text-3xl"
          onClick={() => setIsOpen(true)}
        >
          lock_open
        </button>
      );
      break;
    case "empty": //need for a placeholder (fake space 2rem) to avoid table layout issue
      btn = <div className="w-[1.5rem] h-[2rem]:" aria-hidden="true"></div>;
  }

  return (
    <>
      {btn}
      {isOpen ? (
        <>
          <div className=" justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
            <div className="relative p-4 w-full max-w-md max-h-full">
              <div className="relative bg-lightPearl rounded-lg shadow ">
                <button
                  type="button"
                  className="absolute top-3 end-2.5 text-reef bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center hover:bg-reef hover:text-white"
                  onClick={() => setIsOpen(false)}
                >
                  <svg
                    className="w-2 h-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
                <div className="p-4 md:p-5 text-center">
                  <svg
                    className="mx-auto mb-4 text-reef w-12 h-12 "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  <h3 className="mb-5 text-md font-normal text-anchor ">
                    Êtes-vous certain de de vouloir {expression} ce(s)
                    élément(s)? Attention, cette action est irréversible.
                  </h3>
                  <button
                    data-modal-hide="popup-modal"
                    type="button"
                    onClick={operation}
                    className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                  >
                    Oui, {expression}
                  </button>
                  <button
                    data-modal-hide="popup-modal"
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    Annuler
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
