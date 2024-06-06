/* eslint-disable @next/next/no-img-element */
import { FormEvent, useState } from "react";
import Icon from "@/components/icon";
import Loading from "@/components/loading";
import {
  useDeleteProfileMutation,
  useProfileQuery,
  useUpdateProfileMutation,
} from "@/graphql/generated/schema";
import LayoutLoggedInUser from "@/layouts/layout-logged-in-user";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "@/components/modal";
import PersonalVehicleItem from "@/components/personal-vehicle-item";
import ModalAddPersonalVehicle from "@/components/modal-add-personal-vehicle";

export default function Profile() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isBeingModified, setIsBeingModified] = useState(false);
  const [isPersonalVehicleModalOpen, setIsPersonalVehicleModalOpen] =
    useState(false);
  const { data: user } = useProfileQuery({
    errorPolicy: "ignore",
  });

  const [updateProfile] = useUpdateProfileMutation();

  const [deleteProfile] = useDeleteProfileMutation();

  if (!user) return <Loading />;

  const notify = () => toast.success("Profil mis à jour");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setError("");
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formJSON: any = Object.fromEntries(formData.entries());

    try {
      const res = await updateProfile({ variables: { data: formJSON } });
      setIsBeingModified(false);
      notify();
    } catch (e: any) {
      setError("Une erreur est survenue");
      console.error(e);
    }
  };

  const handleDeleteProfile = () => {
    deleteProfile({ variables: { userId: user.profile.id } })
      .then(() => router.push("/"))
      .catch(console.error);
  };

  const openNewVehicleModal = () => {
    setIsPersonalVehicleModalOpen(true);
  };

  return (
    <LayoutLoggedInUser>
      <div className="mx-10">
        <h1 className="mb-10">
          Mon compte
          <button
            className="ml-4"
            onClick={() => setIsBeingModified(!isBeingModified)}
          >
            <Icon name="edit" />
          </button>
        </h1>
        {isBeingModified ? (
          <form onSubmit={handleSubmit}>
            <div className="text-reef font-semibold grid grid-cols-2 gap-x-20 gap-y-7 gap-x">
              <label htmlFor="firstName">
                Prénom
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  className="input-text-reef"
                  defaultValue={user.profile.firstName || ""}
                />
              </label>
              <label htmlFor="lastName">
                Nom
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  className="input-text-reef"
                  defaultValue={user.profile.lastName || ""}
                />
              </label>
              <label htmlFor="nickname">
                Pseudo
                <input
                  type="text"
                  name="nickname"
                  id="nickname"
                  className="input-text-reef"
                  defaultValue={user.profile.nickname}
                  required
                />
              </label>
              <label htmlFor="email">
                Adresse mail
                <input
                  type="email"
                  className="input-text-reef"
                  defaultValue={user.profile.email}
                  required
                />
              </label>
              <label htmlFor="avatarUrl" className="flex flex-col">
                Photo
                <input
                  type="url"
                  name="avatarUrl"
                  id="avatarUrl"
                  defaultValue={user.profile.avatarUrl || ""}
                  className="input-text-reef"
                />
              </label>
            </div>

            {error !== "" && <pre className="text-red-700">{error}</pre>}
            <div className="flex justify-between">
              <button className="btn btn-reef mt-4">Mise à jour</button>
              <Modal
                buttonClasses="btn-lg btn-error mt-4"
                modalButtonTitle="Supprimer mon compte"
                content={
                  <div className="p-4 flex flex-col justify-around h-full">
                    <p>
                      Êtes-vous certain.e de vouloir supprimer votre compte ?
                    </p>
                    <div className="flex justify-around">
                      <button
                        className="btn btn-outline-error"
                        onClick={handleDeleteProfile}
                      >
                        Supprimer
                      </button>
                      <button
                        className="btn btn-outline-reef"
                        onClick={() => setIsBeingModified(false)}
                      >
                        Annuler
                      </button>
                    </div>
                    <p className="font-light text-xs mt-4 text-center">
                      Attention, cette action est irréversible et supprimera
                      toutes vos données.
                    </p>
                  </div>
                }
              />
            </div>
          </form>
        ) : (
          <form
            onSubmit={handleSubmit}
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
                className="h-72 w-72 mt-4 ml-6 z-10 rounded-full object-cover"
              />
            </label>
            <div className="my-6">
              <h2 className="mb-4">Mes véhicules personnels</h2>
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
          </form>
        )}
        <ModalAddPersonalVehicle
          isPersonalVehicleModalOpen={isPersonalVehicleModalOpen}
          setIsPersonalVehicleModalOpen={setIsPersonalVehicleModalOpen}
        />
      </div>
    </LayoutLoggedInUser>
  );
}
