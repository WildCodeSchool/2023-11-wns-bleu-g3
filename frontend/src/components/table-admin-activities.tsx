import Icon from "@/components/icon";

export default function TableActivities() {


    




  return (
    <div className="relative  overflow-x-auto shadow-md m-auto my-12 sm:rounded-lg w-4/5">
      <table className="w-full text-sm text-left  rtl:text-right text-gray-500 ">
        <thead className="text-xs  uppercase bg-shore  text-anchor">
          <tr>
            <th scope="col" className="px-6 py-3">
              Nom
            </th>
            <th scope="col" className="px-6 py-3">
              Catégorie
            </th>
            <th scope="col" className="px-6 py-3">
              Emissions
            </th>
            <th scope="col" className="px-6 py-3">
              Unité
            </th>
            <th scope="col" className="px-2 py-3"></th>
            <th scope="col" className="px-2 py-3"></th>
          </tr>
        </thead>
        <tbody>
          <tr className=" border-t border-gray-500 bg-pearl text-reef  hover:bg-shore hover:text-anchor">
            <th
              scope="row"
              className="px-6 py-4 font-medium  whitespace-nowrap "
            >
              Chemise
            </th>

            <td className="px-6 py-4">Vetements</td>
            <td className="px-6 py-4">267</td>
            <td className="px-6 py-4">co2/pc</td>
            <td className=" py-4">
              <a href="#" className="font-medium text-anchor hover:underline ">
                <Icon name="edit" size="" color="reef" />
              </a>
            </td>
            <td className=" py-4">
              <a href="#" className="font-medium text-error hover:underline">
                <Icon name="delete" size="" color="" />
              </a>
            </td>
          </tr>
        </tbody>
      </table>
      <nav
        className="flex bg-pearl text-reef items-center flex-column flex-wrap md:flex-row justify-between pt-4  border-t border-gray-500"
        aria-label="Table navigation"
      >
        <ul className="inline-flex m-auto mb-4  -space-x-px rtl:space-x-reverse text-sm h-8">
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 ms-0 leading-tight  bg-pearl text-reef border border-anchor rounded-s-lg  font-medium  hover:bg-reef hover:text-white"
            >
              Previous
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8  leading-tight  bg-pearl text-reef border border-anchor   font-medium  hover:bg-reef hover:text-white"
            >
              1
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8  leading-tight  bg-pearl text-reef border border-anchor   font-medium  hover:bg-reef hover:text-white"
            >
              2
            </a>
          </li>
          <li>
            <a
              href="#"
              aria-current="page"
              className="flex items-center justify-center px-3 h-8  leading-tight  bg-lightPearl text-anchor border border-anchor   font-medium  hover:bg-shore hover:text-white"
            >
              3
            </a>
          </li>

          <li>
            <a
              href="#"
              className="rounded-e-lg  flex items-center justify-center px-3 h-8  leading-tight  bg-pearl text-reef border border-anchor   font-medium  hover:bg-reef hover:text-white"
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
