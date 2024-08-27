import LayoutAdmin from "@/layouts/layout-admin";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import {
  GetActivityTypesByIdDocument,
  UpdateActivityTypeInput,
  useGetActivityTypesByIdQuery,
  useGetCategoriesQuery,
  useGetFuelTypesQuery,
  useGetUnitsQuery,
  useGetMotoEnginesQuery,
  useGetVehicleDecadeQuery,
  useGetVehicleTypesQuery,
  useUpdateActivityTypeMutation,
} from "@/graphql/generated/schema";

export default function UpdateActivity() {
  const [error, setError] = useState({ message: "", errorInput: "" });
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

  const { data: d6 } = useGetMotoEnginesQuery();
  const motoengines = d6?.getMotoEngines || [];

  const [selectedOption, setSelectedOption] = useState(
    activity?.category || ""
  );

  useEffect(() => {
    if (activity?.category) {
      setSelectedOption(activity.category);
    }
  }, [activity]);

  const optionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  // update mutation
  // const activId = parseInt( id as string);

  // const activId = parseInt( id as string);

  const [updateActivityType] = useUpdateActivityTypeMutation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setError({ message: "", errorInput: "" });
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formJSON: any = Object.fromEntries(formData.entries());

    //validation
    if (
      !/^\d*\.?\d*$/.test(formJSON.emissions) ||
      formJSON.emissions.length > 50 ||
      formJSON.emissions === ""
    ) {
      setError({
        message:
          "Le champ emissions ne doit pas être vide et doit comporter que des chiffres",
        errorInput: "emissions",
      });
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
            variables: { getActivityTypesById: parseFloat(id as string) },
          },
        ],
      });
      setError({ message: "", errorInput: "" });
      router.push(`/admin/activities`);
    } catch (e) {
      setError({ message: "Une erreur est survenue.", errorInput: "general" });
      console.error("Error :", error);
    }
  };

  return (
    <LayoutAdmin>
      <form className="max-w-3xl mx-auto mt-3 p-5" onSubmit={handleSubmit}>
        <div>
          <p className="pb-2 text-lg font-medium text-gray-700">
            Modifie type activité
          </p>
          <h1 className="text-3xl font-bold underline text-reef">
            {activity?.name || ""}
          </h1>
          <br />
          <p className="text-sm text-gray-600 mb-4">
            Vous avez la possibilité de modifier les caractéristiques de ce type
            d&apos;activité, comme la catégorie, la valeur d&apos;émission de CO
            <sub>2</sub> et l&apos;unité de mesure.
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
          >
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
              error.errorInput === "emissions"
                ? "border-red-700"
                : "border-gray-300"
            } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3`}
            defaultValue={activity?.emissions || ""}
          />
          {error.errorInput === "emissions" && (
            <pre className="text-red-700">{error.message}</pre>
          )}
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
            defaultValue={activity?.unit || ""}
          >
            {units.map((unit) => (
              <option key={unit} value={unit}>{unit}</option>
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
              defaultValue={activity?.vehicleAttributes?.vehicleType || ""}
            >
              {vehiclestypes.map((type) => (
                <option key={type} value={type}>{type}</option>
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
              defaultValue={activity?.vehicleAttributes?.fuelType || ""}
            >
              {fuels.map((fuel) => (
                <option key={fuel} value={fuel}>{fuel}</option>
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
              defaultValue={activity?.vehicleAttributes?.vehicleDecade || ""}
            >
              {decades.map((decade) => (
                <option key={decade} value={decade}>{decade}</option>
              ))}
            </select>
          </div>
        ) : null}

        {selectedOption === "Moto" ? (
          <div className="mb-3">
            <label
              htmlFor="motoEngine"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Moto Engine
            </label>
            <select
              id="motoEngine"
              name="motoEngine"
              className="bg-gray-50 shadow-sm border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              defaultValue={activity?.vehicleAttributes?.motoEngine || ""}
            >
              {motoengines.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        ) : null}

        {error.errorInput === "general" && (
          <pre className="text-red-700">{error.message}</pre>
        )}
        <button
          type="submit"
          className="text-lightPearl bg-reef hover:bg-shore hover:text-anchor focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 mt-2 py-2.5 text-center"
        >
          Modifier
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/activities")}
          className="text-lightPearl bg-anchor hover:bg-shore hover:text-anchor focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 mt-2 ml-3 py-2.5 text-center"
        >
          Annuler
        </button>
      </form>
    </LayoutAdmin>
  );
}
