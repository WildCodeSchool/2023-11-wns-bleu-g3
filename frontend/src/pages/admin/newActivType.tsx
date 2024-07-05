import LayoutAdmin from "@/layouts/layout-admin";
import { useRouter } from "next/router";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
// import Activities from "../activities";
import {
  GetActivityTypesByIdDocument,
  UpdateActivityTypeDocument,
  UpdateActivityTypeInput,
  useGetActivityTypesByIdQuery,
  useGetCategoriesQuery,
  useGetFuelTypesQuery,
  useGetUnitsQuery,
  useGetVehicleDecadeQuery,
  useGetVehicleTypesQuery,
  useUpdateActivityTypeMutation,
} from "@/graphql/generated/schema";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";

import { updateSourceFile } from "typescript";

export default function newActivType() {
  const [error, setError] = useState("");
  const router = useRouter();

  const { id } = router.query;

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

  // update mutation
  // const activId = parseInt( id as string);
  const [updateActivityType] = useUpdateActivityTypeMutation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setError("");
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formJSON: any = Object.fromEntries(formData.entries());

    if (!/^\d*\.?\d*$/.test(formJSON.emissions) || formJSON.emissions === "") {
      setError("Ton champ emissions ne comporte que des chiffres");
      return;
    }

    const object: UpdateActivityTypeInput = {
      category: formJSON.category as string,
      emissions: parseFloat(formJSON.emissions as string),
      unit: formJSON.unit as string,
      vehicleAttributes: {
        vehicleType: formJSON.vehicletype as string,
        fuelType: formJSON.fuelType as string,
        vehicleDecade: formJSON.vehicleDecade as string,
      },
    };
    console.log("form data:", formJSON);

    try {
      await updateActivityType({
        variables: { activityTypeId: parseFloat(id as string), data: object },
        refetchQueries: [
          {
            query: GetActivityTypesByIdDocument,
            variables: { getActivityTypesById: parseInt(id as string) },
          },
        ],
      });
      setError("");
      router.push(`/admin/activities`);
    } catch (e) {
      setError("une erreur est survenue");
      console.error("Error :", error);
    }
  };

  return (
    <LayoutAdmin>
      <form
        className="max-w-3xl mx-auto mt-3 p-5"
        //   onSubmit={handleSubmit}
      >
        <div>
          <h1 className="text-3xl font-bold  text-reef">
            Créer Nouveau Type d'Activité
          </h1>

          <br />
          <p className="text-sm text-gray-600 mb-4">
            Vous avez la possibilité de créer un nouveau type d'activité.
            Assurez-vous de bien remplir les valeurs pour la catégorie, la
            valeur d'émission de CO<sub>2</sub>, et l'unité de mesure, en
            veillant à ce que ces attributs soient conformes aux valeurs les
            plus acceptables par la communauté écologique.
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
            value={selectedOption}
            onChange={optionChange}
            defaultValue="default"
          >
            <option value="default" hidden></option>
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
            className={`shadow-sm bg-gray-50 border ${
              error ? "border-red-700" : "border-gray-300"
            } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3`}
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="unit"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Unité Mesure
          </label>
          <select
            id="unit"
            name="unit"
            className="bg-gray-50 shadow-sm border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            defaultValue="default"
          >
            <option value="default" hidden></option>
            {units.map((unit) => (
              <option value={unit}>{unit}</option>
            ))}
          </select>
        </div>

        {selectedOption === "Voiture" ? (
          <div className="mb-3">
            <label
              htmlFor="vehicletype"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Type Voiture
            </label>
            <select
              id="vehicletype"
              name="vehicletype"
              className="bg-gray-50 shadow-sm border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              defaultValue="default"
            >
              <option value="default" hidden></option>
              {vehiclestypes.map((type) => (
                <option value={type}>{type}</option>
              ))}
            </select>
          </div>
        ) : null}

        {selectedOption === "Voiture" ? (
          <div className="mb-3">
            <label
              htmlFor="fuelType"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Carburant
            </label>
            <select
              id="fuelType"
              name="fuelType"
              className="bg-gray-50 shadow-sm border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              defaultValue="default"
            >
              <option value="default" hidden></option>
              {fuels.map((fuel) => (
                <option value={fuel}>{fuel}</option>
              ))}
            </select>
          </div>
        ) : null}

        {selectedOption === "Voiture" ? (
          <div className="mb-3">
            <label
              htmlFor="vehicleDecade"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Décennie Voiture
            </label>
            <select
              id="vehicleDecade"
              name="vehicleDecade"
              className="bg-gray-50 shadow-sm border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              defaultValue="default"
            >
              <option value="default" hidden></option>
              {decades.map((decade) => (
                <option value={decade}>{decade}</option>
              ))}
            </select>
          </div>
        ) : null}

        {error !== "" && <pre className="text-red-700">{error}</pre>}
        <button
          type="submit"
          className="text-lightPearl bg-reef hover:bg-shore hover:text-anchor focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 mt-2 py-2.5 text-center"
        >
          Confirmer
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/activities")}
          className="text-lightPearl bg-anchor hover:bg-shore hover:text-anchor focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 mt-2 ml-3 py-2.5 text-center"
        >
          Annuller
        </button>
      </form>
    </LayoutAdmin>
  );
}
