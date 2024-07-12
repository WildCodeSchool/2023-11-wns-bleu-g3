/* eslint-disable @next/next/no-img-element */
import Modal from "@/components/modal";

export default function MobileUpdateProfile({
  user,
  error,
  setIsBeingModified,
  handleDeleteProfile,
  handleUpdateProfile,
}: {
  user: any;
  error: string;
  setIsBeingModified: any;
  handleDeleteProfile: any;
  handleUpdateProfile: any;
}) {
  return (
    <form onSubmit={handleUpdateProfile}>
      <div className="text-reef font-semibold flex flex-col gap-6">
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
      <div className="flex flex-col justify-between my-16">
        <button className="btn btn-reef mt-4">Mise à jour</button>
        <Modal
          buttonClasses="btn-lg btn-error mt-4"
          modalButtonTitle="Supprimer mon compte"
          content={
            <div className="p-4 flex flex-col justify-around h-full">
              <p>Êtes-vous certain.e de vouloir supprimer votre compte ?</p>
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
                Attention, cette action est irréversible et supprimera toutes
                vos données.
              </p>
            </div>
          }
        />
      </div>
    </form>
  );
}
