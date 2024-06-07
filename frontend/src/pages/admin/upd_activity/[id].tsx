import LayoutAdmin from "@/layouts/layout-admin";
import { useRouter } from "next/router";
import Link from "next/link";

import { useGetActivityTypesByIdQuery } from "@/graphql/generated/schema";

export default function ProductDetails() {
  const router = useRouter();

  const { id } = router.query;

  const { data } = useGetActivityTypesByIdQuery({
    variables: { getActivityTypesById: parseInt(id as string) },
    skip: typeof id === "undefined",
  });

  const activity = data?.getActivityTypesById;

  return (
    <LayoutAdmin>
      <form className="max-w-3xl mx-auto mt-5 p-5">
        <div>
          <p className="pb-2 text-lg font-medium text-gray-700">
            Modifie type activité
          </p>
          <h1 className="text-3xl font-bold underline text-reef">
            {activity?.name || ""}
          </h1>
          <br />
          <p className="text-sm text-gray-600 mb-1">
            Vous avez la possibilité de modifier les caractéristiques de cette
            type d'activité, comme la catégorie, le valeur de émission de CO
            <sub>2</sub> et l'unité pour la mesure.
          </p>
          <br />
        </div>
        <div className="mb-3">
          <label
            htmlFor="firstName"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Catégorie
          </label>
          <select
            id="category"
            name="category"
            className="bg-gray-50 shadow-sm border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            defaultValue={activity?.category || ""}
          >
            <option selected>{activity?.category || ""}</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
          </select>
        </div>
        <div className="mb-3">
          <label
            htmlFor="lastName"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Emissions CO<sub>2</sub>
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
            defaultValue={activity?.emissions || ""}
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="nickname"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Unité Mesure
          </label>
          <input
            type="text"
            name="nickname"
            id="nickname"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
            defaultValue={activity?.unit || ""}
            required
          />
        </div>
        
        
        <button
          type="submit"
          className="text-lightPearl bg-reef hover:bg-shore hover:text-anchor focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 mt-2 py-2.5 text-center"
        >
          Modifier
        </button>
      </form>
    </LayoutAdmin>
  );
}
