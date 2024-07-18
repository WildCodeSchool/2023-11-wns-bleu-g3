import MostLikedPosts from "@/components/feed/most-liked-posts";
import Posts from "@/components/feed/posts";
import { useGetPostsQuery } from "@/graphql/generated/schema";
import LayoutLoggedInUser from "@/layouts/layout-logged-in-user";
import React from "react";

export default function Feed() {
  return (
    <LayoutLoggedInUser>
      <div className="mx-10">
        <div className="flex mb-10 justify-between">
          <h1>Bon plans</h1>
          <div className="flex justify-end items-center gap-4">
            <div
              //   onClick={openNewVehicleModal}
              className="bg-reef rounded-full object-cover h-10 w-10 text-3xl text-lightPearl flex justify-center items-center cursor-pointer"
            >
              +
            </div>
            <p
              className="text-anchor opacity-90 text-lg cursor-pointer"
              //   onClick={openNewVehicleModal}
            >
              Partagez un bon plan
            </p>
          </div>
        </div>
        <div className="mt-10 flex gap-8 justify-between">
          <Posts />
          <MostLikedPosts />
        </div>
      </div>
    </LayoutLoggedInUser>
  );
}
