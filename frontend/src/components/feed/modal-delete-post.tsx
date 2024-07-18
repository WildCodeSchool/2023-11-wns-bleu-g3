import { useDeletePostMutation } from "@/graphql/generated/schema";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Icon from "../icon";

export default function ModalDeletePost({
  post,
  isModalDeleteOpen,
  setIsModalDeleteOpen,
}: {
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
  isModalDeleteOpen: boolean;
  setIsModalDeleteOpen: (value: boolean) => void;
}) {
  const [deletepost] = useDeletePostMutation();

  const router = useRouter();

  const handleDeletePost = () => {
    deletepost({ variables: { postId: post.id } })
      .then((res) => {
        toast.success("Post supprimé");
        router.reload();
      })
      .catch(console.error);
  };
  return (
    <>
      {isModalDeleteOpen && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto md:w-3/12 my-6 mx-2 md:mx-4 lg:mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-lightPearl outline-none focus:outline-none">
                <button
                  onClick={() => setIsModalDeleteOpen(false)}
                  className="flex justify-end items-center p-3"
                >
                  <Icon name="close" />
                </button>
                <p className="text-center p-3">
                  Êtes-vous certain.e de vouloir supprimer ce post ?
                </p>
                <div className="flex justify-around">
                  <button
                    className="btn btn-outline-error"
                    onClick={handleDeletePost}
                  >
                    Supprimer
                  </button>
                  <button
                    onClick={() => setIsModalDeleteOpen(false)}
                    className="btn btn-outline-reef"
                  >
                    Annuler
                  </button>
                </div>
                <p className="font-light text-xs mt-4 text-center p-3">
                  Attention, cette action est irréversible.
                </p>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  );
}
