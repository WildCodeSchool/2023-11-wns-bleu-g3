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
import DesktopUpdateProfile from "@/components/profile/desktop-updateProfile";
import DesktopProfile from "@/components/profile/desktop-profile";
import useScreenSize from "@/hooks/useScreenSize";
import MobileProfile from "@/components/profile/mobile-profile";
import MobileUpdateProfile from "@/components/profile/mobile-updateProfile";

export default function Profile() {
  const screenSize = useScreenSize();
  const router = useRouter();
  const [error, setError] = useState("");
  const [isBeingModified, setIsBeingModified] = useState(false);
  const { data: user } = useProfileQuery({
    errorPolicy: "ignore",
  });

  const [updateProfile] = useUpdateProfileMutation();

  const [deleteProfile] = useDeleteUserMutation();

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
    deleteProfile()
      .then(() => router.push("/"))
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
              handleSubmit={handleSubmit}
              setIsBeingModified={setIsBeingModified}
            />
          ) : (
            <DesktopProfile user={user} handleSubmit={handleSubmit} />
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
              handleSubmit={handleSubmit}
              setIsBeingModified={setIsBeingModified}
            />
          ) : (
            <MobileProfile
              user={user}
              handleSubmit={handleSubmit}
              setIsBeingModified={setIsBeingModified}
              isBeingModified={isBeingModified}
            />
          )}
        </div>
      </LayoutLoggedInUser>
    );
  }
}
