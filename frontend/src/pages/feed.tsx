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
      <div className="lg:mx-10">
        <div className="flex flex-col lg:flex-row mb-10 justify-between">
          <p className="lg:hidden flex text-sm">Tableau de bord / Bon plans</p>
          <h1 className="text-[2.5rem] text-anchor font-medium">Bon plans</h1>
          <div
            className="hidden lg:flex lg:justify-end lg:items-center lg:gap-4 lg:cursor-pointer"
            onClick={openNewVehicleModal}
          >
            <div className="bg-reef rounded-full object-cover h-10 w-10 text-3xl text-lightPearl flex justify-center items-center ">
              +
            </div>
            <p className="text-anchor opacity-90 text-lg ">
              Partagez un bon plan
            </p>
          </div>
          <div
            onClick={openNewVehicleModal}
            className="fixed bottom-6 right-4 bg-reef rounded-full object-cover h-16 w-16 text-[3.5rem] text-lightPearl flex justify-center items-center lg:hidden"
          >
            +
          </div>
        </div>
        <div className="hidden lg:mt-10 lg:flex lg:gap-8 lg:justify-between">
          <Posts />
          <MostLikedPosts />
        </div>
        <div className="flex lg:hidden">
          <Posts />
          {/* <MostLikedPosts /> */}
        </div>
        <ModalNewPost
          isNewPostModalOpen={isNewPostModalOpen}
          setIsNewPostModalOpen={setIsNewPostModalOpen}
        />
      </div>
    </LayoutLoggedInUser>
  );
}
