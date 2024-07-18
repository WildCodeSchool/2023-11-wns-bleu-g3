import LayoutLoggedInUser from "@/layouts/layout-logged-in-user";
import MostLikedPosts from "@/components/feed/most-liked-posts";
import Posts from "@/components/feed/posts";
import { useState } from "react";
import ModalNewPost from "@/components/feed/modal-new-post";

export default function Feed() {
  const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);

  const openNewVehicleModal = () => {
    setIsNewPostModalOpen(true);
  };
  return (
    <LayoutLoggedInUser>
      <div className="mx-10">
        <div className="flex mb-10 justify-between">
          <h1>Bon plans</h1>
          <div
            className="flex justify-end items-center gap-4 cursor-pointer"
            onClick={openNewVehicleModal}
          >
            <div className="bg-reef rounded-full object-cover h-10 w-10 text-3xl text-lightPearl flex justify-center items-center ">
              +
            </div>
            <p className="text-anchor opacity-90 text-lg ">
              Partagez un bon plan
            </p>
          </div>
        </div>
        <div className="mt-10 flex gap-8 justify-between">
          <Posts />
          <MostLikedPosts />
        </div>
        <ModalNewPost
          isNewPostModalOpen={isNewPostModalOpen}
          setIsNewPostModalOpen={setIsNewPostModalOpen}
        />
      </div>
    </LayoutLoggedInUser>
  );
}
