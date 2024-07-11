import LayoutLoggedInUser from "@/layouts/layout-logged-in-user";
import { ActivityTypeEnum } from "@/enums/ActivityTypeEnum";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { fr } from "date-fns/locale/fr";
import { ReccurenceIntervalEnum } from "@/enums/ReccurenceIntervalEnum";
import { VehicleTypeEnum } from "@/enums/VehicleTypeEnum";
registerLocale("fr", fr);

export default function NewActivity() {
  const [activityType, setActivityType] = useState("");
  const [startAt, setStartAt] = useState(new Date());
  const [endAt, setEndAt] = useState(new Date());
  const [isRecurrent, setIsRecurrent] = useState(false);
  const [reccurenceInterval, setReccurenceInterval] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  console.log(vehicleType);

  return (
    <LayoutLoggedInUser>
      <h1 className="mb-10 mx-10 text-lg md:text-xl lg:text-2xl">
        Enregistrer une nouvelle dépense carbone
      </h1>
      <form className="text-reef font-semibold">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-7 pb-6">
          <div>
            <label htmlFor="name"> Titre </label>
            <input type="text" name="name" id="name" className="input-text" />
          </div>
          <div>
            <label htmlFor="activityType">Type d&apos;émission</label>
            <select
              className="select-lg select-arrow"
              name="activityType"
              id="activityType"
              onChange={(e) => setActivityType(e.target.value)}
              value={activityType}
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
        {activityType === ActivityTypeEnum.Shifting && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-7 pb-6">
              <div className="flex flex-col">
                <label htmlFor="startsAt"> Date de début </label>
                <DatePicker
                  selected={startAt}
                  onChange={(date) => setStartAt(date as Date)}
                  locale={fr}
                  dateFormat="dd/MM/yyyy"
                  className="border-2 border-pearl text-anchor text-sm rounded-lg focus:ring-reef outline-reef focus:border-reef block w-full p-2.5"
                />
              </div>
              <div className="bg-white border-2 border-pearl text-anchor text-sm rounded-lg focus:ring-reef outline-reef focus:border-reef w-full ps-4 pe-10 text-start py-2.5 flex items-center mt-6">
                <label htmlFor="isRecurrent"> Dépense récurrente : </label>
                <input
                  type="checkbox"
                  name="isRecurrent"
                  id="isRecurrent"
                  className="ml-10"
                  onChange={(e) =>
                    isRecurrent ? setIsRecurrent(false) : setIsRecurrent(true)
                  }
                />
              </div>
            </div>
            {isRecurrent && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-7 pb-6">
                <div className="flex flex-col">
                  <label htmlFor="endsAt"> Date de fin </label>
                  <DatePicker
                    selected={endAt}
                    onChange={(date) => setEndAt(date as Date)}
                    locale={fr}
                    dateFormat="dd/MM/yyyy"
                    minDate={startAt}
                    className="border-2 border-pearl text-anchor text-sm rounded-lg focus:ring-reef outline-reef focus:border-reef block w-full p-2.5"
                  />
                </div>
                <div className="flex items-end gap-4">
                  <div className=" w-4/12">
                    <label htmlFor="reccurenceCount">Nb de dépenses</label>
                    <input
                      type="number"
                      name="reccurenceCount"
                      id="reccurenceCount"
                      className="input-text"
                    />
                  </div>
                  <p className="mb-3 block w-4/12 text-center">fois /</p>
                  <div className=" w-4/12">
                    <label htmlFor="reccurenceInterval">Récurrence</label>
                    <select
                      className="select-lg select-arrow"
                      name="reccurenceInterval"
                      id="reccurenceInterval"
                      onChange={(e) => setReccurenceInterval(e.target.value)}
                      value={reccurenceInterval}
                    >
                      <option value="default">
                        Choisir un type d&apos;émission
                      </option>
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
                <label htmlFor="vehicleType"> Type de vehicule </label>
                <select
                  className="select-lg select-arrow"
                  name="vehicleType"
                  id="vehicleType"
                  onChange={(e) => setVehicleType(e.target.value)}
                  value={vehicleType}
                >
                  <option value="default">Choisir un type de véhicule</option>
                  <optgroup label="Véhicule personnel"></optgroup>
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
        <button className="btn btn-reef mt-16 block mx-auto">
          Calculer ma dépense
        </button>
      </form>
    </LayoutLoggedInUser>
  );
}
