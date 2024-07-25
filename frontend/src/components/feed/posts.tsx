/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { useGetPostsQuery, useProfileQuery } from "@/graphql/generated/schema";
import SortDropdown from "./sort-dropdown";
import FilterDropdown from "./filter-dropdown";
import PostItem from "./post-item";

export default function Posts() {
  const { data: userData } = useProfileQuery();
  const currentUsername = userData?.profile?.nickname || "";

  const { data } = useGetPostsQuery();
  const posts = data?.getPosts || [];

  const [sortedBy, setSortedBy] = useState("mostRecent");
  const [filterWithImage, setFilterWithImage] = useState(false);
  const [filterByUsername, setFilterByUsername] = useState("");
  const [filterMyPosts, setFilterMyPosts] = useState(false);

  useEffect(() => {
    if (currentUsername) {
      setFilterMyPosts(false);
    }
  }, [currentUsername]);

  const sortedPosts = () => {
    let sortedArray = [...posts];
    if (sortedBy === "lessLikes") {
      sortedArray.sort((a, b) => a.likes - b.likes);
    } else if (sortedBy === "lessRecent") {
      sortedArray.sort((a, b) => a.id - b.id);
    } else if (sortedBy === "userNickname") {
      sortedArray.sort((a, b) =>
        a.user.nickname.localeCompare(b.user.nickname)
      );
    } else {
      sortedArray.sort((a, b) => b.id - a.id);
    }
    return sortedArray;
  };

  const filteredPosts = () => {
    let filteredArray = sortedPosts();
    if (filterWithImage) {
      filteredArray = filteredArray.filter((post) => post.imageUrl);
    }
    if (filterByUsername) {
      filteredArray = filteredArray.filter((post) =>
        post.user.nickname
          .toLowerCase()
          .includes(filterByUsername.toLowerCase())
      );
    }
    if (filterMyPosts) {
      filteredArray = filteredArray.filter(
        (post) => post.user.nickname === currentUsername
      );
    }
    return filteredArray;
  };

  const filteredArray = filteredPosts();

  return (
    <div className="w-full">
      <div className="flex gap-5 justify-end mb-2">
        <SortDropdown sortedBy={sortedBy} setSortedBy={setSortedBy} />
        <FilterDropdown
          filterWithImage={filterWithImage}
          setFilterWithImage={setFilterWithImage}
          filterByUsername={filterByUsername}
          setFilterByUsername={setFilterByUsername}
          filterMyPosts={filterMyPosts}
          setFilterMyPosts={setFilterMyPosts}
        />
      </div>

      <div className="bg-pearl border-shore border-2 rounded-lg p-8">
        {filteredArray.length === 0 ? (
          <p>Aucun post ne correspond à vos critères</p>
        ) : (
          filteredArray.map((post) => <PostItem key={post.id} post={post} />)
        )}
      </div>
    </div>
  );
}
