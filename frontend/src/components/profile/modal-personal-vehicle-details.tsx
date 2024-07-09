import React from "react";
import Icon from "../icon";

export default function ModalPersonalVehicleDetails({
  setIsPersonalVehicleDetailsModalOpen,
  vehicle,
}: {
  setIsPersonalVehicleDetailsModalOpen: any;
  vehicle: any;
}) {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto md:w-3/12 my-6 mx-2 md:mx-4 lg:mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-lightPearl outline-none focus:outline-none">
            <button
              onClick={() => setIsPersonalVehicleDetailsModalOpen(false)}
              className="flex justify-end items-center p-3"
            >
              <Icon name="close" />
            </button>
            <div className="flex flex-col p-4 gap-6">
              <h2 className="text-center">{vehicle.name}</h2>
              <form>
                <label htmlFor="name">
                  Nom
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="input-text-reef mb-4"
                    value={vehicle.name}
                  />
                </label>

                {vehicle.vehicle_category === "Voiture" && (
                  <div className="flex flex-col gap-4">
                    <label htmlFor="fuel_type">
                      Type de carburant
                      <input
                        type="text"
                        name="fuel_type"
                        id="fuel_type"
                        className="input-text-reef"
                        value={vehicle.fuel_type}
                      />
                    </label>
                    <label htmlFor="vehicle_type">
                      Type de véhicule
                      <input
                        type="text"
                        name="vehicle_type"
                        id="vehicle_type"
                        className="input-text-reef"
                        value={vehicle.vehicle_type}
                      />
                    </label>
                    <label htmlFor="year_of_construction">
                      Année de construction
                      <input
                        type="text"
                        name="year_of_construction"
                        id="year_of_construction"
                        className="input-text-reef"
                        value={vehicle.year_of_construction}
                      />
                    </label>
                  </div>
                )}

                {vehicle.vehicle_category === "Moto/scooter" && (
                  <label htmlFor="moto_engine">
                    Type de cylindrée
                    <input
                      type="text"
                      name="moto_engine"
                      id="moto_engine"
                      className="input-text-reef"
                      value={vehicle.moto_engine}
                    />
                  </label>
                )}

                <div className="flex justify-around my-10">
                  <button className="btn btn-reef">Modifier</button>
                  <button className="btn btn-error">Supprimer</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-0 bg-black"></div>
    </>
  );
}
