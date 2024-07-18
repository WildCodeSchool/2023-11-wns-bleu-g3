import React, { FormEvent, useState } from "react";
import Icon from "../icon";
import {
  useCreatePostMutation,
  useProfileQuery,
} from "@/graphql/generated/schema";
import { useRouter } from "next/router";

export default function ModalNewPost({
  isNewPostModalOpen,
  setIsNewPostModalOpen,
}: {
  isNewPostModalOpen: boolean;
  setIsNewPostModalOpen: (value: boolean) => void;
}) {
  const router = useRouter();
  const [addImage, setAddImage] = useState(false);
  const [createNewPost] = useCreatePostMutation();

  const { data: user } = useProfileQuery({
    errorPolicy: "ignore",
  });

  const handleCreateNewPost = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formJSON: any = Object.fromEntries(formData.entries());
    formJSON.user = { id: user?.profile.id };

    createNewPost({ variables: { data: formJSON } })
      .then((res) => {
        setIsNewPostModalOpen(false);
        router.reload();
      })
      .catch(console.error);
  };
  return (
    <div>
      {isNewPostModalOpen && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto md:w-3/12 my-6 mx-2 md:mx-4 lg:mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-lightPearl outline-none focus:outline-none">
                <button
                  onClick={() => setIsNewPostModalOpen(false)}
                  className="flex justify-end items-center p-3"
                >
                  <Icon name="close" />
                </button>
                <div className="flex flex-col p-4 gap-6">
                  <form
                    onSubmit={handleCreateNewPost}
                    className="text-reef font-semibold flex flex-col gap-6"
                  >
                    <label htmlFor="title">
                      Titre
                      <input
                        type="text"
                        name="title"
                        id="title"
                        className="input-text-reef"
                      />
                    </label>
                    <label htmlFor="content">
                      Contenu
                      <textarea
                        name="content"
                        id="content"
                        className="input-text-reef"
                        placeholder="Partagez un bon plan"
                      />
                    </label>
                    {addImage ? (
                      <label htmlFor="imageUrl" className="flex flex-col">
                        Image
                        <input
                          type="url"
                          name="imageUrl"
                          id="imageUrl"
                          className="input-text-reef"
                          placeholder="URL de l'image"
                        />
                      </label>
                    ) : (
                      <div className="flex gap-2">
                        <label htmlFor="addImage">Ajouter une image</label>
                        <input
                          type="checkbox"
                          id="addImage"
                          checked={addImage}
                          onChange={() => setAddImage(!addImage)}
                        />
                      </div>
                    )}

                    <div className="flex justify-center my-10">
                      <button className="btn btn-reef">Publier</button>
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
}
