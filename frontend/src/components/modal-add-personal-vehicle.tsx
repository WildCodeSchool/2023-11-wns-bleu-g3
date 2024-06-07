import React, { useState } from "react";
import Icon from "./icon";

const ModalAddPersonalVehicle = ({
  isPersonalVehicleModalOpen,
  setIsPersonalVehicleModalOpen,
}: {
  isPersonalVehicleModalOpen: boolean;
  setIsPersonalVehicleModalOpen: any;
}) => {
  const [selectedVehicle, setSelectedVehicle] = useState("");

  const handleVehicleChange = (event: any) => {
    setSelectedVehicle(event.target.value);
  };

  return (
    <div>
      {isPersonalVehicleModalOpen && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto md:w-3/12 my-6 mx-2 md:mx-4 lg:mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-lightPearl outline-none focus:outline-none">
                <button
                  onClick={() => setIsPersonalVehicleModalOpen(false)}
                  className="flex justify-end items-center p-3"
                >
                  <Icon name="close" />
                </button>
                <div className="flex flex-col p-4 gap-6">
                  <h2 className="text-center">Ajouter un véhicule</h2>
                  <form className="text-reef font-semibold flex flex-col gap-6">
                    <label htmlFor="vehicleName">
                      Nom
                      <input
                        type="text"
                        name="vehicleName"
                        id="vehicleName"
                        className="input-text-reef"
                      />
                    </label>
                    <label htmlFor="vehicleType">
                      Type de véhicule
                      <select
                        className="select-xl select-arrow font-normal"
                        name="vehicleType"
                        id="vehicleType"
                        value={selectedVehicle}
                        onChange={handleVehicleChange}
                      >
                        <option disabled value=""></option>
                        <option value="Voiture">Voiture</option>
                        <option value="Moto">Moto</option>
                        <option value="Vélo électrique">Vélo électrique</option>
                      </select>
                    </label>

                    {selectedVehicle === "Voiture" && (
                      <>
                        <label htmlFor="fuelType">
                          Type de carburant
                          <select
                            className="select-xl select-arrow font-normal"
                            name="fuelType"
                            id="fuelType"
                          >
                            <option disabled selected></option>
                            <option>Essence</option>
                            <option>Diesel</option>
                            <option>Électrique</option>
                            <option>Hybride</option>
                            <option>Hydrogène</option>
                          </select>
                        </label>

                        <label htmlFor="carRange">
                          Gamme
                          <select
                            className="select-xl select-arrow font-normal"
                            name="carRange"
                            id="carRange"
                          >
                            <option disabled selected></option>
                            <option>Économique</option>
                            <option>Sportive</option>
                            <option>Luce</option>
                          </select>
                        </label>

                        <label htmlFor="constructionYear">
                          Année de construction
                          <select
                            className="select-xl select-arrow font-normal"
                            name="constructionYear"
                            id="constructionYear"
                          >
                            <option disabled selected></option>
                            <option>Avant 1989</option>
                            <option>1990-1999</option>
                            <option>2000-2009</option>
                            <option>2010-2019</option>
                            <option>Après 2020</option>
                          </select>
                        </label>
                      </>
                    )}

                    {selectedVehicle === "Moto" && (
                      <label htmlFor="engineType">
                        Type de cylindrée
                        <select
                          className="select-xl select-arrow font-normal"
                          name="engineType"
                          id="engineType"
                        >
                          <option disabled selected></option>
                          <option>moins de 125cc</option>
                          <option>125cc à 500cc</option>
                          <option>plus de 500cc</option>
                        </select>
                      </label>
                    )}
                    <div className="flex justify-center my-10">
                      <button className="btn btn-reef">Enregistrer</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </div>
  );
};

export default ModalAddPersonalVehicle;
