import { useGetPostsQuery } from "@/graphql/generated/schema";
import React from "react";
import Icon from "../icon";

export default function MostLikedPosts() {
  const { data } = useGetPostsQuery();
  const posts = data?.getPosts || [];

  const convertDate = (isoString: string) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const sortedPosts = [...posts].sort((a, b) => b.likes - a.likes);

  return (
    <div className="max-w-[22rem] bg-pearl border-shore border-2 rounded-lg px-8 py-6 mt-8">
      <h2 className="mb-4 text-center">Les posts les plus likés</h2>
      <div className="bg-pearl border-shore border-2 rounded-lg p-8">
        {sortedPosts.map((post) => (
          <div
            key={post.id}
            className="mb-4 border-2 border-reef rounded-lg p-2 text-reef"
          >
            <div className="flex justify-between mb-4">
              <p className="font-semibold opacity-85">{post.user.nickname}</p>
              <div className="flex gap-2 justify-end">
                <p>{post.likes}</p>
                {post.likes === 0 ? (
                  <Icon name="favorite_border" />
                ) : (
                  <Icon name="favorite" />
                )}
              </div>
            </div>
            <div className="mb-4 text-anchor">
              <h3 className="text-xl mb-1">{post.title}</h3>
              <p>{post.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
