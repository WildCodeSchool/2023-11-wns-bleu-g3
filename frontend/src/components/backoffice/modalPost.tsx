import { useState } from "react";

export default function ModalPost({
  title,
  content,
  imgUrl,
}: {
  title: any;
  content: any;
  imgUrl: any;
}) {
  const [isOpen, setIsOpen] = useState(false);
  let btn;
  btn = (
    <button
      type="button"
      onClick={() => setIsOpen(true)}
      className=" material-icons text-neutral-500 text-3xl"
    >
      plagiarism
    </button>
  );
  return (
    <>
      {btn}
      {isOpen ? (
        <>
          <div className="md:ml-[13%] sm:ml-0 justify-center items-center flex  overflow-y-auto fixed inset-0 z-50 outline-none  ">
            <div className="relative p-4 w-full max-w-3xl max-h-full">
              <div className="relative bg-pearl rounded-lg shadow ">
                <button
                  type="button"
                  className="absolute top-3 end-2.5 text-anchor bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center hover:bg-reef hover:text-white"
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
                <div className="p-[8rem] md:p-5  gap-5 text-center justify-center m-auto">
                  <div className="py-5 max-w-lg m-auto text-lg">{title}</div>
                  <div className="py-5 max-w-lg m-auto text-justify">
                    {content}
                  </div>
                  <div className="py-5 max-w-md m-auto">
                    <img src={imgUrl} alt="publication sans image" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
