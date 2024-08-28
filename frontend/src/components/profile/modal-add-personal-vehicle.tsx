import React, { FormEvent, useState } from "react";
import Icon from "../icon";
import {
  useCreatePersonalVehicleMutation,
  useProfileQuery,
} from "@/graphql/generated/schema";
import { useRouter } from "next/router";

const ModalAddPersonalVehicle = ({
  isAddPersonalVehicleModalOpen,
  setIsAddPersonalVehicleModalOpen,
}: {
  isAddPersonalVehicleModalOpen: boolean;
  setIsAddPersonalVehicleModalOpen: any;
}) => {
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const router = useRouter();
  const [createPersonalVehicle] = useCreatePersonalVehicleMutation();

  const { data: user } = useProfileQuery({
    errorPolicy: "ignore",
  });

  const handleVehicleChange = (event: any) => {
    setSelectedVehicle(event.target.value);
  };

  const handleCreateNewPersonalVehicle = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formJSON: any = Object.fromEntries(formData.entries());
    formJSON.user = { id: user?.profile.id };
    createPersonalVehicle({ variables: { data: formJSON } })
      .then((res) => {
        setIsAddPersonalVehicleModalOpen(false);
        router.reload();
      })
      .catch(console.error);
  };

  return (
    <div>
      {isAddPersonalVehicleModalOpen && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto md:w-3/12 my-6 mx-2 md:mx-4 lg:mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-lightPearl outline-none focus:outline-none">
                <button
                  onClick={() => setIsAddPersonalVehicleModalOpen(false)}
                  className="flex justify-end items-center p-3"
                >
                  <Icon name="close" />
                </button>
                <div className="flex flex-col p-4 gap-6">
                  <h2 className="text-center">Ajouter un véhicule</h2>
                  <form
                    onSubmit={handleCreateNewPersonalVehicle}
                    className="text-reef font-semibold flex flex-col gap-6"
                  >
                    <label htmlFor="name">
                      Nom
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="input-text-reef"
                      />
                    </label>
                    <label htmlFor="vehicle_category">
                      Type de véhicule
                      <select
                        className="select-xl select-arrow font-normal"
                        name="vehicle_category"
                        id="vehicle_category"
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
                        <label htmlFor="fuel_type">
                          Type de carburant
                          <select
                            className="select-xl select-arrow font-normal"
                            name="fuel_type"
                            id="fuel_type"
                          >
                            <option disabled value=""></option>
                            <option value="Essence">Essence</option>
                            <option value="Diesel">Diesel</option>
                            <option value="Électrique">Électrique</option>
                            <option value="Hybride">Hybride</option>
                            <option value="Hydrogène">Hydrogène</option>
                          </select>
                        </label>

                        <label htmlFor="vehicle_type">
                          Gamme
                          <select
                            className="select-xl select-arrow font-normal"
                            name="vehicle_type"
                            id="vehicle_type"
                          >
                            <option disabled value=""></option>
                            <option value="Economique">Économique</option>
                            <option value="Sportif">Sportive</option>
                            <option value="Luxe">Luxe</option>
                          </select>
                        </label>

                        <label htmlFor="year_of_construction">
                          Année de construction
                          <select
                            className="select-xl select-arrow font-normal"
                            name="year_of_construction"
                            id="year_of_construction"
                          >
                            <option disabled value=""></option>
                            <option value="Avant 90s">Avant 1989</option>
                            <option value="Avant 2000">1990-1999</option>
                            <option value="2000s">2000-2009</option>
                            <option value="2010s">2010-2019</option>
                            <option value="2020s">Après 2020</option>
                          </select>
                        </label>
                      </>
                    )}

                    {selectedVehicle === "Moto" && (
                      <label htmlFor="moto_engine">
                        Type de cylindrée
                        <select
                          className="select-xl select-arrow font-normal"
                          name="moto_engine"
                          id="moto_engine"
                        >
                          <option disabled value=""></option>
                          <option value="moins de 125cc">Moins de 125cc</option>
                          <option value="125cc a 500cc">125cc à 500cc</option>
                          <option value="Plus de 500cc">Plus de 500cc</option>
                          <option value="Électrique">Électrique</option>
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
