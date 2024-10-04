import React, { useState } from "react";
import Icon from "../icon";
import { useDeletePersonalVehicleMutation } from "@/graphql/generated/schema";
import Modal from "../modal";
import ModalUpdatePersonalVehicle from "./modal-update-personal-vehicle";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ModalPersonalVehicleDetails({
  setIsPersonalVehicleDetailsModalOpen,
  vehicle,
}: {
  setIsPersonalVehicleDetailsModalOpen: any;
  vehicle: any;
}) {
  const [isBeingModified, setIsBeingModified] = useState(false);
  const [deletePersonalVehicle] = useDeletePersonalVehicleMutation();

  const handleDeleteVehicle = () => {
    deletePersonalVehicle({ variables: { personalVehicleId: vehicle.id } })
      .then((res) => {
        toast.success("Véhicule supprimé");
        setIsPersonalVehicleDetailsModalOpen(false);
      })
      .catch(console.error);
  };

  return (
    <>
      {!isBeingModified ? (
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
                  <div>
                    <label htmlFor="name">
                      Nom
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="input-text-reef mb-4"
                        value={vehicle.name}
                        disabled
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
                            disabled
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
                            disabled
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
                            disabled
                          />
                        </label>
                      </div>
                    )}

                    {vehicle.vehicle_category === "Moto" && (
                      <label htmlFor="moto_engine">
                        Type de cylindrée
                        <input
                          type="text"
                          name="moto_engine"
                          id="moto_engine"
                          className="input-text-reef"
                          value={vehicle.moto_engine}
                          disabled
                        />
                      </label>
                    )}

                    <p className="mt-4">
                      Emission : {vehicle.emissionByKm} g/km
                    </p>

                    <div className="flex justify-around my-10">
                      <button
                        onClick={() => setIsBeingModified(true)}
                        className="btn btn-reef"
                      >
                        Modifier
                      </button>
                      <Modal
                        buttonClasses="btn btn-error"
                        modalButtonTitle="Supprimer"
                        content={
                          <div className="p-4 flex flex-col gap-4 justify-around h-full">
                            <p>
                              Êtes-vous certain.e de vouloir supprimer ce
                              véhicule ?
                            </p>
                            <div className="flex justify-around">
                              <button
                                className="btn btn-outline-error"
                                onClick={handleDeleteVehicle}
                              >
                                Supprimer
                              </button>
                              <button className="btn btn-outline-reef">
                                Annuler
                              </button>
                            </div>
                            <p className="font-light text-xs mt-4 text-center">
                              Attention, cette action est irréversible.
                            </p>
                          </div>
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-0 bg-black"></div>
        </>
      ) : (
        <ModalUpdatePersonalVehicle
          setIsBeingModified={setIsBeingModified}
          vehicle={vehicle}
        />
      )}
    </>
  );
}
