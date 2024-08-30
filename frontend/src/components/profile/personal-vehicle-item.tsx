import {
  useGetPersonalVehiclesQuery,
  useProfileQuery,
} from "@/graphql/generated/schema";
import React, { useState } from "react";
import Icon from "../icon";
import ModalPersonalVehicleDetails from "./modal-personal-vehicle-details";

const PersonalVehicleItem = () => {
  const [openModalVehicleId, setOpenModalVehicleId] = useState<number | null>(
    null
  );

  const { data } = useGetPersonalVehiclesQuery({
    pollInterval: 1000,
  });

  const personalVehicles = data?.getPersonalVehicles;

  return (
    <>
      {personalVehicles?.map((vehicle) => (
        <>
          <div
            key={vehicle.id}
            className="flex bg-pearl px-3 py-4 my-2 justify-between items-start lg:items-center text-anchor opacity-85"
          >
            <div className="grid grid-cols-3 md:grid-cols-4 w-full">
              <p className="text-start md:col-span-2">{vehicle.name}</p>
              <p className="opacity-75 font-normal">
                {vehicle.emissionByKm} g/km
              </p>
              <p className="">{vehicle.vehicle_category}</p>
            </div>
            <span
              onClick={() => setOpenModalVehicleId(vehicle.id)}
              className="flex justify-end items-center cursor-pointer"
            >
              <Icon name="more_vert" />
            </span>
          </div>
          {openModalVehicleId === vehicle.id && (
            <div className="opacity-100 bg-lightPearl">
              <ModalPersonalVehicleDetails
                setIsPersonalVehicleDetailsModalOpen={() =>
                  setOpenModalVehicleId(null)
                }
                vehicle={vehicle}
              />
            </div>
          )}
        </>
      ))}
    </>
  );
};

export default PersonalVehicleItem;
