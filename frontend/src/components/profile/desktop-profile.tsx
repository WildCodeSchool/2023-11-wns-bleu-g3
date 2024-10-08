/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import PersonalVehicleItem from "./personal-vehicle-item";
import ModalAddPersonalVehicle from "./modal-add-personal-vehicle";

const DesktopProfile = ({ user }: { user: any }) => {
  const [isAddPersonalVehicleModalOpen, setIsAddPersonalVehicleModalOpen] =
    useState(false);

  const openNewVehicleModal = () => {
    setIsAddPersonalVehicleModalOpen(true);
  };

  return (
    <>
      <div
        className="text-reef font-semibold grid grid-cols-2 gap-x-20 gap-y-7 gap"
        data-testid="profile-form"
      >
        <label htmlFor="firstName">
          Prénom
          <input
            type="text"
            className="input-text-reef"
            value={user.profile.firstName || ""}
            readOnly
          />
        </label>
        <label htmlFor="lastName">
          Nom
          <input
            type="text"
            className="input-text-reef"
            value={user.profile.lastName || ""}
            readOnly
          />
        </label>
        <label htmlFor="nickname">
          Pseudo
          <input
            type="text"
            className="input-text-reef"
            value={user.profile.nickname}
            readOnly
          />
        </label>
        <label htmlFor="email">
          Adresse mail
          <input
            type="email"
            className="input-text-reef"
            value={user.profile.email}
            readOnly
          />
        </label>
        <label htmlFor="avatarUrl" className="flex flex-col">
          Photo
          <img
            src={user.profile.avatarUrl || ""}
            alt="Phot de profil"
            className="h-72 w-72 mt-4 ml-6 rounded-full object-cover"
          />
        </label>
        <div className="my-6">
          <h2 className="mb-4 text-[1.4rem] text-anchor font-medium">
            Mes véhicules personnels
          </h2>
          <PersonalVehicleItem />
          <div className="flex justify-end items-center gap-4">
            <p
              className="text-anchor opacity-90 text-lg cursor-pointer"
              onClick={openNewVehicleModal}
            >
              Ajouter un véhicule
            </p>
            <div
              onClick={openNewVehicleModal}
              className="bg-anchor opacity-85 rounded-full object-cover h-10 w-10 text-2xl text-lightPearl flex justify-center items-center cursor-pointer"
            >
              +
            </div>
          </div>
        </div>
      </div>

      <ModalAddPersonalVehicle
        isAddPersonalVehicleModalOpen={isAddPersonalVehicleModalOpen}
        setIsAddPersonalVehicleModalOpen={setIsAddPersonalVehicleModalOpen}
      />
    </>
  );
};

export default DesktopProfile;
