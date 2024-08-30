import { useGetPostsQuery } from "@/graphql/generated/schema";
import React, { useState, useEffect, useMemo } from "react";
import Icon from "../icon";

interface ShowEntirePosts {
  [key: number]: boolean;
}

export default function MostLikedPosts() {
  const { data } = useGetPostsQuery({
    pollInterval: 100,
  });
  const initialPosts = useMemo(() => data?.getPosts || [], [data]);

  const [posts, setPosts] = useState(initialPosts);
  const [showEntirePosts, setShowEntirePosts] = useState<ShowEntirePosts>({});

  useEffect(() => {
    setPosts(initialPosts);
  }, [data, initialPosts]);

  const handleTogglePost = (postId: number) => {
    setShowEntirePosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const sortedPosts = [...posts].sort(
    (a, b) => (b.nbOfLikes || 0) - (a.nbOfLikes || 0)
  );

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
                <p>{post.nbOfLikes}</p>
                {post.nbOfLikes === 0 ? (
                  <Icon name="favorite_border" />
                ) : (
                  <Icon name="favorite" />
                )}
              </div>
            </div>
            <div className="mb-4 text-anchor">
              <h3 className="text-xl mb-1">{post.title}</h3>
              {showEntirePosts[post.id] ? (
                <div>
                  <p>{post.content}</p>
                  <button
                    className="flex mt-2 italic font-semibold"
                    onClick={() => handleTogglePost(post.id)}
                  >
                    Réduire
                    <Icon name="expand_less" />
                  </button>
                </div>
              ) : (
                <div>
                  <p>{post.content?.slice(0, 80) || ""}...</p>
                  <button
                    className="flex mt-2 italic font-semibold"
                    onClick={() => handleTogglePost(post.id)}
                  >
                    Afficher tout
                    <Icon name="expand_more" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
