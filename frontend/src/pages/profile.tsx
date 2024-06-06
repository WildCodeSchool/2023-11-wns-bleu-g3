/* eslint-disable @next/next/no-img-element */
import { FormEvent, useState } from "react";
import Icon from "@/components/icon";
import Loading from "@/components/loading";
import {
  useDeleteUserMutation,
  useProfileQuery,
  useUpdateProfileMutation,
} from "@/graphql/generated/schema";
import LayoutLoggedInUser from "@/layouts/layout-logged-in-user";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DesktopUpdateProfile from "@/components/profile/desktop-update-profile";
import DesktopProfile from "@/components/profile/desktop-profile";
import useScreenSize from "@/hooks/useScreenSize";
import MobileProfile from "@/components/profile/mobile-profile";
import MobileUpdateProfile from "@/components/profile/mobile-update-profile";

export default function Profile() {
  const screenSize = useScreenSize();
  const router = useRouter();
  const [error, setError] = useState("");
  const [isBeingModified, setIsBeingModified] = useState(false);
  const [isPersonalVehicleModalOpen, setIsPersonalVehicleModalOpen] =
    useState(false);
  const { data: user } = useProfileQuery({
    errorPolicy: "ignore",
  });

  const [updateProfile] = useUpdateProfileMutation();

  const [deleteProfile] = useDeleteUserMutation();

  if (!user) return <Loading />;

  const notify = () => toast.success("Profil mis à jour");

  const handleUpdateProfile = async (e: FormEvent<HTMLFormElement>) => {
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

  console.log(isPersonalVehicleModalOpen);

  const handleDeleteProfile = () => {
    deleteProfile()
      .then(() => router.reload())
      .catch(console.error);
  };

  if (screenSize.width > 768) {
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
            <DesktopUpdateProfile
              user={user}
              error={error}
              handleDeleteProfile={handleDeleteProfile}
              handleUpdateProfile={handleUpdateProfile}
              setIsBeingModified={setIsBeingModified}
            />
          ) : (
            <DesktopProfile user={user} />
          )}
        </div>
      </LayoutLoggedInUser>
    );
  } else {
    return (
      <LayoutLoggedInUser>
        <div className="mx-6">
          <h1 className="mb-6 text-center md:text-left">
            Mon compte
            <button
              className="ml-4 hidden lg:flex"
              onClick={() => setIsBeingModified(!isBeingModified)}
            >
              <Icon name="edit" />
            </button>
          </h1>
          {isBeingModified ? (
            <MobileUpdateProfile
              user={user}
              error={error}
              handleDeleteProfile={handleDeleteProfile}
              handleUpdateProfile={handleUpdateProfile}
              setIsBeingModified={setIsBeingModified}
            />
          ) : (
            <MobileProfile
              user={user}
              setIsBeingModified={setIsBeingModified}
              isBeingModified={isBeingModified}
            />
          )}
        </div>
      </LayoutLoggedInUser>
    );
  }
}
