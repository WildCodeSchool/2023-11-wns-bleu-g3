import LayoutAdmin from "@/layouts/layout-admin";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";

import {
  useGetActivityTypesByIdQuery,
  useGetCategoriesQuery,
  useGetFuelTypesQuery,
  useGetUnitsQuery,
  useGetVehicleDecadeQuery,
  useGetVehicleTypesQuery,
} from "@/graphql/generated/schema";

export default function ProductDetails() {
  const router = useRouter();
  const { id } = router.query;

  const { data } = useGetActivityTypesByIdQuery({
    variables: { getActivityTypesById: parseInt(id as string) },
    skip: typeof id === "undefined",
  });

  const activity = data?.getActivityTypesById;

  const { data: d } = useGetCategoriesQuery();
  const cats = d?.getCategories || [];

  const { data: d2 } = useGetFuelTypesQuery();
  const fuels = d2?.getFuelTypes || [];

  const { data: d3 } = useGetUnitsQuery();
  const units = d3?.getUnits || [];

  const { data: d4 } = useGetVehicleDecadeQuery();
  const decades = d4?.getVehicleDecade || [];

  const { data: d5 } = useGetVehicleTypesQuery();
  const vehiclestypes = d5?.getVehicleTypes || [];

  const [selectedOption, setSelectedOption] = useState("");

  const optionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <LayoutAdmin>
      <form className="max-w-3xl mx-auto mt-3 p-5">
        <div>
          <p className="pb-2 text-lg font-medium text-gray-700">
            Modifie type activité
          </p>
          <h1 className="text-3xl font-bold underline text-reef">
            {activity?.name || ""}
          </h1>
          <br />
          <p className="text-sm text-gray-600 mb-4">
            Vous avez la possibilité de modifier les caractéristiques de cette
            type d'activité, comme la catégorie, le valeur de émission de CO
            <sub>2</sub> et l'unité pour la mesure.
          </p>
          
        </div>
        <div className="mb-3">
          <label
            htmlFor="category"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Catégorie
          </label>
          <select
            id="category"
            name="category"
            className="bg-gray-50 shadow-sm border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            defaultValue={activity?.category}
            value={selectedOption}
            onChange={optionChange}
          >
            <option selected>{activity?.category || ""}</option>
            {cats.map((cat) => (
              <option value={cat} key={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label
            htmlFor="emissions"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Emissions CO<sub>2</sub>
          </label>
          <input
            type="text"
            name="emissions"
            id="emissions"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
            defaultValue={activity?.emissions || ""}
          />
        </div>

        <div className="mb-3">
          <label
            htmlFor="firstName"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Unité Mesure
          </label>
          <select
            id="unit"
            name="unit"
            className="bg-gray-50 shadow-sm border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            defaultValue={activity?.unit || ""}
          >
            <option selected>{activity?.unit || ""}</option>
            {units.map((unit) => (
              <option value={unit} key={unit}>
                {unit}
              </option>
            ))}
          </select>
        </div>

        {(activity?.category === "Voiture" || selectedOption === "Voiture") && (
          <div className="mb-3">
            <label
              htmlFor="firstName"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Type Voiture
            </label>
            <select
              id="category"
              name="category"
              className="bg-gray-50 shadow-sm border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              defaultValue={activity?.vehicleAttributes?.vehicleType || ""}
            >
              {vehiclestypes.map((type) => (
                <option value={type}>{type}</option>
              ))}
            </select>
          </div>
        )}

        {(activity?.category === "Voiture" || selectedOption === "Voiture") && (
          <div className="mb-3">
            <label
              htmlFor="firstName"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Carburant
            </label>
            <select
              id="fuel"
              name="fuel"
              className="bg-gray-50 shadow-sm border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              defaultValue={activity?.vehicleAttributes?.fuelType || ""}
            >
              {fuels.map((fuel) => (
                <option value={fuel}>{fuel}</option>
              ))}
            </select>
          </div>
        )}

        {(activity?.category === "Voiture" || selectedOption === "Voiture") && (
          <div className="mb-3">
            <label
              htmlFor="firstName"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Décennie Voiture
            </label>
            <select
              id="category"
              name="category"
              className="bg-gray-50 shadow-sm border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              defaultValue={activity?.vehicleAttributes?.vehicleDecade || ""}
            >
              {decades.map((decade) => (
                <option value="US">{decade}</option>
              ))}
            </select>
          </div>
        )}

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
