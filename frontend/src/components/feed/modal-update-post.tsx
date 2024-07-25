/* eslint-disable @next/next/no-img-element */
import React, { FormEvent, useState } from "react";
import Icon from "../icon";
import { useUpdatePostMutation } from "@/graphql/generated/schema";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ModalUpdatePost({
  isUpdatePostModalOpen,
  setIsUpdatePostModalOpen,
  post,
}: {
  isUpdatePostModalOpen: boolean;
  setIsUpdatePostModalOpen: (value: boolean) => void;
  post: {
    id: number;
    created_at: string;
    title: string;
    content: string;
    imageUrl: string;
    likes: number;
    user: {
      nickname: string;
    };
  };
}) {
  const [error, setError] = useState("");

  const [updatePost] = useUpdatePostMutation();
  const [updateImage, setUpdateImage] = useState(false);

  const handleUpdatePost = async (e: FormEvent<HTMLFormElement>) => {
    setError("");
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formJSON: any = Object.fromEntries(formData.entries());

    try {
      const res = await updatePost({
        variables: { data: formJSON, postId: post.id },
      });
      setIsUpdatePostModalOpen(false);
      toast.success("Votre post a été mis à jour");
    } catch (e: any) {
      setError("Une erreur est survenue");
      console.error(e);
    }
  };

  return (
    <div>
      {isUpdatePostModalOpen && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto md:w-3/12 my-6 mx-2 md:mx-4 lg:mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-lightPearl outline-none focus:outline-none">
                <button
                  onClick={() => setIsUpdatePostModalOpen(false)}
                  className="flex justify-end items-center p-3"
                >
                  <Icon name="close" />
                </button>
                <div className="flex flex-col p-4 gap-6">
                  <form
                    onSubmit={handleUpdatePost}
                    className="text-reef font-semibold flex flex-col gap-6"
                  >
                    <label htmlFor="title">
                      Titre
                      <input
                        type="text"
                        name="title"
                        id="title"
                        className="input-text-reef"
                        defaultValue={post.title}
                      />
                    </label>
                    <label htmlFor="content">
                      Contenu
                      <textarea
                        name="content"
                        id="content"
                        className="input-text-reef"
                        defaultValue={post.content}
                      />
                    </label>
                    {post.imageUrl ? (
                      <>
                        <img
                          src={post.imageUrl || ""}
                          alt="post"
                          className="max-w-56 rounded-lg"
                        />
                        {updateImage ? (
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
                            <label htmlFor="updateImage">
                              Modifier l&apos;image
                            </label>
                            <input
                              type="checkbox"
                              id="updateImage"
                              checked={updateImage}
                              onChange={() => setUpdateImage(!updateImage)}
                            />
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        {updateImage ? (
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
                            <label htmlFor="updateImage">
                              Ajouter une image
                            </label>
                            <input
                              type="checkbox"
                              id="updateImage"
                              checked={updateImage}
                              onChange={() => setUpdateImage(!updateImage)}
                            />
                          </div>
                        )}
                      </>
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
