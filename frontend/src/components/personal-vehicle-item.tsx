import React from "react";

const PersonalVehicleItem = () => {
  return (
    <>
      <div className="grid grid-cols-3 xl:grid-cols-4 bg-pearl px-3 py-4 my-2 justify-between text-anchor opacity-85 text-end">
        <p className="col-start-1 col-end-2 xl:col-end-3 text-start">Ma moto</p>
        <p className="opacity-75 font-normal text-center">02/04/2024</p>
        <p>75g/km</p>
      </div>

      <div className="grid grid-cols-3 xl:grid-cols-4 bg-pearl px-3 py-4 my-2 justify-between text-anchor opacity-85 text-end">
        <p className="col-start-1 col-end-2 xl:col-end-3 text-start">
          Ma Porsche
        </p>
        <p className="opacity-75 font-normal text-center">20/01/2024</p>
        <p>220g/km</p>
      </div>

      <div className="grid grid-cols-3 xl:grid-cols-4 bg-pearl px-3 py-4 my-2 justify-between text-anchor opacity-85 text-end">
        <p className="col-start-1 col-end-2 xl:col-end-3 text-start">Ma Clio</p>
        <p className="opacity-75 font-normal text-center">16/02/2016</p>
        <p>89g/km</p>
      </div>
    </>
  );
};

export default PersonalVehicleItem;
