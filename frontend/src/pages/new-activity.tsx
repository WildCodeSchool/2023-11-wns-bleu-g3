import LayoutLoggedInUser from "@/layouts/layout-logged-in-user";
import { ActivityTypeEnum } from "@/enums/ActivityTypeEnum";
import { FormEvent, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addMinutes } from "date-fns";
import { fr } from "date-fns/locale/fr";
import { ReccurenceIntervalEnum } from "@/enums/ReccurenceIntervalEnum";
import { VehicleTypeEnum } from "@/enums/VehicleTypeEnum";
import { useRouter } from "next/router";
import {
  Category,
  useCreateActivityMutation,
  useGetActivityTypesByCategoryQuery,
  useGetPersonalVehiclesQuery,
} from "@/graphql/generated/schema";
import { TrainTypeEnum } from "@/enums/TrainTypeEnum";
import { MotoTypeEnum } from "@/enums/MotoTypeEnum";
import { CarTypeEnum } from "@/enums/CarTypeEnum";
import { toast } from "react-toastify";
import * as Yup from "yup";

export default function NewActivity() {
  const [emissionType, setEmissionType] = useState("");
  const [startAt, setStartAt] = useState(new Date());
  const [endAt, setEndAt] = useState(new Date());
  const [isReccurent, setIsReccurent] = useState(false);
  const [isSecondHand, setIsSecondHand] = useState(false);
  const [isMadeInFrance, setIsMadeInFrance] = useState(false);
  const [reccurenceInterval, setReccurenceInterval] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [heatingType, setHeatingType] = useState("");
  const [clothingType, setClothingType] = useState("");
  const [error, setError] = useState("");

  const [createActivity] = useCreateActivityMutation();
  const router = useRouter();

  const notify = (res: number) =>
    toast.success(
      `Votre dépense carbone de ${Math.round(
        res / 1000
      )} kg de CO2 a bien été enregistrée !`
    );

  const { data } = useGetPersonalVehiclesQuery({
    errorPolicy: "ignore",
  });

  const { data: shifting } = useGetActivityTypesByCategoryQuery({
    variables: {
      getActivityTypesByCategory: Category.Heating,
    },
    errorPolicy: "ignore",
  });

  const { data: heating } = useGetActivityTypesByCategoryQuery({
    variables: {
      getActivityTypesByCategory: Category.Heating,
    },
    errorPolicy: "ignore",
  });

  const { data: clothing } = useGetActivityTypesByCategoryQuery({
    variables: {
      getActivityTypesByCategory: Category.Clothing,
    },
    errorPolicy: "ignore",
  });

  const { data: electronic } = useGetActivityTypesByCategoryQuery({
    variables: {
      getActivityTypesByCategory: Category.Electronics,
    },
    errorPolicy: "ignore",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setError("");
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formJSON: any = Object.fromEntries(formData.entries());
    formJSON.quantity = formJSON.quantity ? parseInt(formJSON.quantity) : 1;
    formJSON.is_reccurent = formJSON.is_reccurent === "on" ? true : false;
    formJSON.is_secondhand = formJSON.is_secondhand === "on" ? true : false;
    formJSON.is_made_in_france =
      formJSON.is_made_in_france === "on" ? true : false;
    formJSON.reccurence_count = !formJSON.reccurence_count
      ? 0
      : parseInt(formJSON.reccurence_count);
    formJSON.reccurence_interval = !formJSON.reccurence_interval
      ? ReccurenceIntervalEnum.Day
      : formJSON.reccurence_interval;
    if (formJSON.starts_at) {
      const startAtDate = formJSON.starts_at.split("/");
      formJSON.starts_at = new Date(
        startAtDate[2],
        startAtDate[1] - 1,
        startAtDate[0]
      );
      formJSON.starts_at = addMinutes(
        formJSON.starts_at,
        -formJSON.starts_at.getTimezoneOffset()
      );
    } else formJSON.starts_at = new Date().toISOString();
    if (formJSON.ends_at) {
      const endAtDate = formJSON.ends_at.split("/");
      formJSON.ends_at = new Date(endAtDate[2], endAtDate[1] - 1, endAtDate[0]);
      formJSON.ends_at = addMinutes(
        formJSON.ends_at,
        -formJSON.ends_at.getTimezoneOffset()
      );
    } else formJSON.ends_at = null;
    console.log("🚀 ~ handleSubmit ~ formJSON:", formJSON)
    console.log("🚀 ~ awaitcreateActivity ~ data:", data)

    try {
      await newActivitySchema.validate(formJSON, { abortEarly: false });
      delete formJSON.emissionType;
      await createActivity({ variables: { data: formJSON } }).then((res) => {
        if (
          res.data?.createActivity !== undefined &&
          res.data?.createActivity > 0
        ) {
          router.push("/dashboard");
          notify(res.data?.createActivity);
        }
      });
    } catch (e: any) {
      if (e.errors !== undefined) {
        setError(e.errors.join(", \n"));
      }
    }
  };

  const newActivitySchema = Yup.object().shape({
    name: Yup.string()
      .required("Vous devez renseigner un titre de dépense carbone")
      .min(
        5,
        "le titre de votre dépense carbone doit contenir au moins 5 caractères"
      )
      .max(
        150,
        "le titre de votre dépense carbone ne peut dépasser les 150 caractères"
      ),
    emissionType: Yup.string().notOneOf(
      ["default"],
      "vous devez sélectionner un type de dépense"
    ),
    type: Yup.string().notOneOf(
      ["default"],
      "vous devez sélectionner un type de dépense"
    ),
    reccurence_interval: Yup.string().notOneOf(
      ["default"],
      "si votre dépense est récurrente, vous devez sélectionner une récurrence"
    ),
  });

  return (
    <LayoutLoggedInUser>
      <h1 className="mb-10 mx-10 text-lg md:text-xl lg:text-2xl">
        Enregistrer une nouvelle dépense carbone
      </h1>
      <form onSubmit={handleSubmit} className="text-reef font-semibold">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-7 pb-6">
          <div>
            <label htmlFor="name"> Titre </label>
            <input type="text" name="name" id="name" className="input-text" />
          </div>
          <div>
            <label htmlFor="emissionType">Type d&apos;émission</label>
            <select
              className="select-lg select-arrow"
              name="emissionType"
              id="emissionType"
              onChange={(e) => setEmissionType(e.target.value)}
              value={emissionType}
            >
              <option value="default">Choisir un type d&apos;émission</option>
              {Object.values(ActivityTypeEnum).map((activity) => (
                <option key={activity} value={activity}>
                  {activity}
                </option>
              ))}
            </select>
          </div>
        </div>
        {emissionType === ActivityTypeEnum.Shifting && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-7 pb-6">
              <div className="flex flex-col">
                <label htmlFor="starts_at"> Date de début </label>
                <DatePicker
                  selected={startAt}
                  onChange={(date) => setStartAt(date as Date)}
                  locale={fr}
                  dateFormat="dd/MM/yyyy"
                  className="border-2 border-pearl text-anchor text-sm rounded-lg focus:ring-reef outline-reef focus:border-reef block w-full p-2.5"
                  name="starts_at"
                  id="starts_at"
                />
              </div>
              <div className="bg-white border-2 border-pearl text-anchor text-sm rounded-lg focus:ring-reef outline-reef focus:border-reef w-full ps-4 pe-10 text-start py-2.5 flex items-center mt-6">
                <label htmlFor="is_reccurent"> Dépense récurrente : </label>
                <input
                  type="checkbox"
                  name="is_reccurent"
                  id="is_reccurent"
                  className="ml-10"
                  onChange={(e) =>
                    isReccurent ? setIsReccurent(false) : setIsReccurent(true)
                  }
                />
              </div>
            </div>
            {isReccurent && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-7 pb-6">
                <div className="flex flex-col">
                  <label htmlFor="ends_at"> Date de fin </label>
                  <DatePicker
                    selected={endAt}
                    onChange={(date) => setEndAt(date as Date)}
                    locale={fr}
                    dateFormat="dd/MM/yyyy"
                    minDate={startAt}
                    className="border-2 border-pearl text-anchor text-sm rounded-lg focus:ring-reef outline-reef focus:border-reef block w-full p-2.5"
                    name="ends_at"
                    id="ends_at"
                  />
                </div>
                <div className="flex items-end gap-4">
                  <div className=" w-4/12">
                    <label htmlFor="reccurence_count">Nb de dépenses</label>
                    <input
                      type="number"
                      name="reccurence_count"
                      id="reccurence_count"
                      className="input-text"
                    />
                  </div>
                  <p className="mb-3 block w-4/12 text-center">fois /</p>
                  <div className=" w-4/12">
                    <label htmlFor="reccurence_interval">Récurrence</label>
                    <select
                      className="select-lg select-arrow"
                      name="reccurence_interval"
                      id="reccurence_interval"
                      onChange={(e) => setReccurenceInterval(e.target.value)}
                      value={reccurenceInterval}
                    >
                      <option value="default"></option>
                      {Object.values(ReccurenceIntervalEnum).map((interval) => (
                        <option key={interval} value={interval}>
                          {interval}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-7 pb-6">
              <div className="flex flex-col">
                <label htmlFor="type"> Type de vehicule </label>
                <select
                  className="select-lg select-arrow"
                  name="type"
                  id="type"
                  onChange={(e) => setVehicleType(e.target.value)}
                  value={vehicleType}
                >
                  <option value="default">Choisir un type de véhicule</option>
                  <optgroup label="Véhicule personnel">
                    {data?.getPersonalVehicles.map((vehicle) => (
                      <option key={vehicle.id} value={vehicle.name}>
                        {vehicle.name}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Voitures">
                    {Object.values(CarTypeEnum).map((vehicle) => (
                      <option key={vehicle} value={vehicle}>
                        {vehicle}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Trains">
                    {Object.values(TrainTypeEnum).map((vehicle) => (
                      <option key={vehicle} value={vehicle}>
                        {vehicle}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Motos">
                    {Object.values(MotoTypeEnum).map((vehicle) => (
                      <option key={vehicle} value={vehicle}>
                        {vehicle}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Autres">
                    {Object.values(VehicleTypeEnum).map((vehicle) => (
                      <option key={vehicle} value={vehicle}>
                        {vehicle}
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>
              <div>
                <label htmlFor="quantity">Distance (en km)</label>
                <input
                  type="number"
                  name="quantity"
                  id="quantity"
                  className="input-text"
                />
              </div>
            </div>
          </div>
        )}
        {emissionType === ActivityTypeEnum.Heating && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-7 pb-6">
            <div className="flex flex-col">
              <label htmlFor="type"> Type de chauffage </label>
              <select
                className="select-lg select-arrow"
                name="type"
                id="type"
                onChange={(e) => setHeatingType(e.target.value)}
                value={heatingType}
              >
                <option value="default">Choisir un type de chauffage</option>
                {heating?.getActivityTypesByCategory.map((heating) => (
                  <option key={heating.name} value={heating.name}>
                    {heating.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="quantity">Superficie (en m²)</label>
              <input
                type="number"
                name="quantity"
                id="quantity"
                className="input-text"
              />
            </div>
          </div>
        )}
        {emissionType === ActivityTypeEnum.Clothing && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-7 pb-6">
              <div className="flex flex-col">
                <label htmlFor="starts_at"> Date de début </label>
                <DatePicker
                  selected={startAt}
                  onChange={(date) => setStartAt(date as Date)}
                  locale={fr}
                  dateFormat="dd/MM/yyyy"
                  className="border-2 border-pearl text-anchor text-sm rounded-lg focus:ring-reef outline-reef focus:border-reef block w-full p-2.5"
                  name="starts_at"
                />
              </div>
              <div className="bg-white border-2 border-pearl text-anchor text-sm rounded-lg focus:ring-reef outline-reef focus:border-reef w-full ps-4 pe-10 text-start py-2.5 flex items-center mt-6">
                <label htmlFor="is_reccurent"> Dépense récurrente : </label>
                <input
                  type="checkbox"
                  name="is_reccurent"
                  id="is_reccurent"
                  className="ml-10"
                  onChange={() =>
                    isReccurent ? setIsReccurent(false) : setIsReccurent(true)
                  }
                />
              </div>
            </div>
            {isReccurent && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-7 pb-6">
                <div className="flex flex-col">
                  <label htmlFor="ends_at"> Date de fin </label>
                  <DatePicker
                    selected={endAt}
                    onChange={(date) => setEndAt(date as Date)}
                    locale={fr}
                    dateFormat="dd/MM/yyyy"
                    minDate={startAt}
                    className="border-2 border-pearl text-anchor text-sm rounded-lg focus:ring-reef outline-reef focus:border-reef block w-full p-2.5"
                    name="ends_at"
                  />
                </div>
                <div className="flex items-end gap-4">
                  <div className=" w-4/12">
                    <label htmlFor="reccurence_count">Nb de dépenses</label>
                    <input
                      type="number"
                      name="reccurence_count"
                      id="reccurence_count"
                      className="input-text"
                    />
                  </div>
                  <p className="mb-3 block w-4/12 text-center">fois /</p>
                  <div className=" w-4/12">
                    <label htmlFor="reccurence_interval">Récurrence</label>
                    <select
                      className="select-lg select-arrow"
                      name="reccurence_interval"
                      id="reccurence_interval"
                      onChange={(e) => setReccurenceInterval(e.target.value)}
                      value={reccurenceInterval}
                    >
                      <option value="default"></option>
                      {Object.values(ReccurenceIntervalEnum).map((interval) => (
                        <option key={interval} value={interval}>
                          {interval}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-7 pb-6">
              <div className="flex flex-col">
                <label htmlFor="type"> Type de vêtement </label>
                <select
                  className="select-lg select-arrow"
                  name="type"
                  id="type"
                  onChange={(e) => setClothingType(e.target.value)}
                  value={clothingType}
                >
                  <option value="default">Choisir un type de vêtement</option>
                  {clothing?.getActivityTypesByCategory.map((clothe) => (
                    <option key={clothe.name} value={clothe.name}>
                      {clothe.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="bg-white border-2 border-pearl text-anchor text-sm rounded-lg focus:ring-reef outline-reef focus:border-reef w-full ps-4 pe-10 text-start py-2.5 flex items-center mt-6">
                <label htmlFor="is_secondhand"> Seconde main : </label>
                <input
                  type="checkbox"
                  name="is_secondhand"
                  id="is_secondhand"
                  className="ml-10"
                  onChange={() =>
                    isSecondHand
                      ? setIsSecondHand(false)
                      : setIsSecondHand(true)
                  }
                />
              </div>
              <div className="bg-white border-2 border-pearl text-anchor text-sm rounded-lg focus:ring-reef outline-reef focus:border-reef w-full ps-4 pe-10 text-start py-2.5 flex items-center mt-6">
                <label htmlFor="is_made_in_france">
                  {" "}
                  Fabriqué en France :{" "}
                </label>
                <input
                  type="checkbox"
                  name="is_made_in_france"
                  id="is_made_in_france"
                  className="ml-10"
                  onChange={() =>
                    isMadeInFrance
                      ? setIsMadeInFrance(false)
                      : setIsMadeInFrance(true)
                  }
                />
              </div>
            </div>
          </div>
        )}
        {emissionType === ActivityTypeEnum.Electronics && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-7 pb-6">
            <div className="flex flex-col">
              <label htmlFor="starts_at"> Date de début </label>
              <DatePicker
                selected={startAt}
                onChange={(date) => setStartAt(date as Date)}
                locale={fr}
                dateFormat="dd/MM/yyyy"
                className="border-2 border-pearl text-anchor text-sm rounded-lg focus:ring-reef outline-reef focus:border-reef block w-full p-2.5"
                name="starts_at"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="type"> Type d&apos;objet électronique </label>
              <select
                className="select-lg select-arrow"
                name="type"
                id="type"
                onChange={(e) => setClothingType(e.target.value)}
                value={clothingType}
              >
                <option value="default">
                  Choisir un type d&apos;objet électronique
                </option>
                {electronic?.getActivityTypesByCategory.map((electronic) => (
                  <option key={electronic.name} value={electronic.name}>
                    {electronic.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="bg-white border-2 border-pearl text-anchor text-sm rounded-lg focus:ring-reef outline-reef focus:border-reef w-full ps-4 pe-10 text-start py-2.5 flex items-center mt-6">
              <label htmlFor="is_secondhand"> Seconde main : </label>
              <input
                type="checkbox"
                name="is_secondhand"
                id="is_secondhand"
                className="ml-10"
                onChange={() =>
                  isSecondHand ? setIsSecondHand(false) : setIsSecondHand(true)
                }
              />
            </div>
          </div>
        )}
        {error !== "" && (
          <pre className="text-error text-xs" data-testid="login-error">
            {error}
          </pre>
        )}
        <button className="btn btn-reef mt-16 block mx-auto">
          Calculer ma dépense
        </button>
      </form>
    </LayoutLoggedInUser>
  );
}
