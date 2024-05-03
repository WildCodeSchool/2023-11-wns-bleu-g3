import Icon from "@/components/icon";
import Loading from "@/components/loading";
import {
  useProfileQuery,
  useUpdateProfileMutation,
} from "@/graphql/generated/schema";
import LayoutLoggedInUser from "@/layouts/layout-logged-in-user";
import React, { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Profile() {
  const [error, setError] = useState("");
  const [isBeingModified, setIsBeingModified] = useState(false);
  const { data: user } = useProfileQuery({
    errorPolicy: "ignore",
  });

  console.log(user);

  const [updateProfile] = useUpdateProfileMutation();

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
          <form onSubmit={handleSubmit} className="">
            <div className="text-reef font-semibold grid grid-cols-2 gap-x-20 gap-y-7 gap-x">
              <label htmlFor="firstName">
                Prénom
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  className="input-text-reef"
                  defaultValue={user.profile.firstName!}
                />
              </label>
              <label htmlFor="lastName">
                Nom
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  className="input-text-reef"
                  defaultValue={user.profile.lastName!}
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
                  type="text"
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
                  minLength={2}
                  maxLength={255}
                  defaultValue={user.profile.avatarUrl}
                  required
                  className="input-text-reef"
                />
              </label>
            </div>

            {error !== "" && <pre className="text-red-700">{error}</pre>}
            <button className="btn btn-reef mt-4">Mise à jour</button>
          </form>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="text-reef font-semibold grid grid-cols-2 gap-x-20 gap-y-7 gap"
          >
            <label htmlFor="firstName">
              Prénom
              <input
                type="text"
                className="input-text-reef"
                value={user.profile.firstName!}
                readOnly
              />
            </label>
            <label htmlFor="lastName">
              Nom
              <input
                type="text"
                className="input-text-reef"
                value={user.profile.lastName!}
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
                type="text"
                className="input-text-reef"
                value={user.profile.email}
                readOnly
              />
            </label>
            <label htmlFor="avatarUrl" className="flex flex-col">
              Photo
              <img
                src={user.profile.avatarUrl}
                alt="Phot de profil"
                className="h-36 w-36 mt-4 z-10 rounded-full object-cover"
              />
            </label>
          </form>
        )}
      </div>
    </LayoutLoggedInUser>
  );
}
