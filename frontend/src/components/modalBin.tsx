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
          className="material-icons text-red-700 text-[1.6rem]"
          onClick={() => setIsOpen(true)}
        >
          delete
        </button>
      );
      break;
    case "bloquer":
      if (!mappedVar.isBlocked) {
        btn = (
          <button onClick={() => setIsOpen(true)}>
            <svg
              enable-background="new 0 0 64 64"
              height="2rem"
              viewBox="0 0 64 64"
              width="2rem"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Layer_21">
                <g fill="#D3D3D3">
                  <path d="m44.3499756 18.7799683c-.9799805 0-1.7699585.8600464-1.7699585 1.9100342v8.3599854c0 .460022-.3699951.8300171-.8300171.8300171-.4500122 0-.8200073-.3699951-.8200073-.8300171v-13.630005c0-1.4799805-1.1300049-2.6900024-2.5100098-2.6900024-1.3899536 0-2.5100098 1.210022-2.5100098 2.6900024v13.6300049c0 .460022-.3699951.8300171-.8299561.8300171-.4500122 0-.8200073-.3699951-.8200073-.8300171v-16.5100098c0-1.5499878-1.1799927-2.8099976-2.6300049-2.8099976-1.4400024 0-2.6199951 1.2600098-2.6199951 2.8099976v16.5100098c0 .460022-.3699951.8300171-.8300171.8300171-.4500122 0-.8200073-.3699951-.8200073-.8300171v-12.0300293c0-1.3399658-1.0100098-2.4299927-2.2600098-2.4299927s-2.2599487 1.0900269-2.2599487 2.4299927v13.4900513c0 .0099487 0 .0099487.0099487.0199585l2.3699951 7.9400024c.1300049.4299927-.1199951.8900146-.5599976 1.0200195-.4299927.1300049-.8899536-.1099854-1.0199585-.5499878l-2.369995-7.9400024c-.3600464-1.2000122-1.1700439-2.210022-2.2000122-2.7399902-.8900146-.4700317-1.8900146-.5500488-2.8099976-.25-.2900391.0999756-.4500122.5-.3400269.8699951l2.3800049 7.9599609c.6300049 2.3099976 2.3200073 8.460022 2.6600342 9.3000488 1.9799805 4.9399414 6.5199585 8.1299438 11.5700073 8.1299438h1c6.9399414 0 12.5799561-5.9799805 12.5799561-13.3199463v-20.2600097c.0000001-1.0499878-.789978-1.9100341-1.7600097-1.9100341z" />
                  <path d="m32 3c-16.0200195 0-29 12.9799805-29 29 0 16.0199585 12.9799805 29 29 29s29-12.9800415 29-29c0-16.0200195-12.9799805-29-29-29zm15.7600098 31.3399658v.0200195 6.5900269c0 8.25-6.3900146 14.9699707-14.2299805 14.9699707h-1c-5.7300415 0-10.8700562-3.5999756-13.1000366-9.1699829-.4299927-1.0800171-2.4799805-8.6099854-2.7199707-9.460022l-2.3699951-7.9400024c-.3700562-1.2199707.2599487-2.5299683 1.3999634-2.8999634 1.3500366-.4500122 2.7999877-.3300171 4.0900268.3399658.5.2600098.9599609.6000366 1.3599854 1v-10.7700195c0-2.25 1.7600098-4.0799561 3.9099731-4.0799561.8400269 0 1.6199951.289978 2.2600098.7600098v-1.1600342c0-2.460022 1.9200439-4.460022 4.2700195-4.460022 2.1900024 0 3.9899902 1.7200317 4.2399902 3.9300537.710022-.5700073 1.5800171-.9300537 2.5499878-.9300537 2.2900391 0 4.1600342 1.9500122 4.1600342 4.3400269v2.2399902c.5100098-.3300171 1.1199951-.5299683 1.7699585-.5299683 1.8800049 0 3.4100342 1.5999756 3.4100342 3.5599976z" />
                </g>
              </g>
            </svg>
          </button>
        );
      }
      break;
    case "debloquer":
      btn = (
        <button onClick={() => setIsOpen(true)}>
          <svg
            clip-rule="evenodd"
            fill-rule="evenodd"
            stroke-linejoin="round"
            stroke-miterlimit="2"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            width="2rem"
            height="2rem"
          >
            <g transform="translate(-96 -96)">
              <g transform="matrix(1 0 0 .682 51 42.773)">
                <path
                  d="m71 103c.53 0 1.039.309 1.414.859s.586 1.296.586 2.074v16.134c0 .778-.211 1.524-.586 2.074s-.884.859-1.414.859c-3.463 0-10.537 0-14 0-.53 0-1.039-.309-1.414-.859s-.586-1.296-.586-2.074c0-4.211 0-11.923 0-16.134 0-.778.211-1.524.586-2.074s.884-.859 1.414-.859z"
                  fill="#9addfb"
                />
              </g>
              <g transform="matrix(1 0 0 .857 48 17.5)">
                <path
                  d="m59 106.75h12c.796 0 1.559.369 2.121 1.025.563.657.879 1.547.879 2.475v12.833c0 .929-.316 1.819-.879 2.475-.562.657-1.325 1.025-2.121 1.025h-14c-.796 0-1.559-.368-2.121-1.025-.563-.656-.879-1.546-.879-2.475v-12.833c0-.928.316-1.818.879-2.475.562-.656 1.325-1.025 2.121-1.025v-4.667c0-4.507 3.137-8.166 7-8.166 2.433 0 4.578 1.451 5.833 3.652.305.536.18 1.261-.279 1.617-.46.357-1.081.211-1.387-.325-.896-1.573-2.428-2.611-4.167-2.611-2.76 0-5 2.614-5 5.833zm12 2.333h-14c-.265 0-.52.123-.707.342-.188.219-.293.516-.293.825v12.833c0 .31.105.606.293.825.187.219.442.342.707.342h14c.265 0 .52-.123.707-.342.188-.219.293-.515.293-.825v-12.833c0-.309-.105-.606-.293-.825-.187-.219-.442-.342-.707-.342zm-8 7.138c-.307-.321-.5-.787-.5-1.304 0-.966.672-1.75 1.5-1.75s1.5.784 1.5 1.75c0 .517-.193.983-.5 1.304v2.779c0 .644-.448 1.167-1 1.167s-1-.523-1-1.167z"
                  fill="#405060"
                />
              </g>
            </g>
          </svg>
        </button>
      );
      break;
    case "empty": //need for a placeholder (fake space 2rem) to avoid table layout issue
      btn = <div className="w-[2rem] h-[2rem]" aria-hidden="true"></div>;
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
