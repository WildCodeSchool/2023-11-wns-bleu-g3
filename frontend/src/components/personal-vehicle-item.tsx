import {
  useGetPersonalVehiclesQuery,
  useProfileQuery,
} from "@/graphql/generated/schema";
import React from "react";

const PersonalVehicleItem = () => {
  const { data: currentUser } = useProfileQuery({
    errorPolicy: "ignore",
  });

  const { data } = useGetPersonalVehiclesQuery({
    variables: {
      userId: currentUser?.profile.id,
    },
  });

  const personalVehicules = data?.getPersonalVehicles;

  const convertDate = (isoString: string) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <>
      {personalVehicules?.map((vehicle) => (
        <div
          key={vehicle.id}
          className="grid grid-cols-3 xl:grid-cols-4 bg-pearl px-3 py-4 my-2 justify-between text-anchor opacity-85 text-end"
        >
          <p className="col-start-1 col-end-2 xl:col-end-3 text-start">
            {vehicle.name}
          </p>
          <p className="opacity-75 font-normal text-center">
            {convertDate(vehicle.created_at)}
          </p>
          <p>{vehicle.fuel_type}</p>
        </div>
      ))}
    </>
  );
};

export default PersonalVehicleItem;
