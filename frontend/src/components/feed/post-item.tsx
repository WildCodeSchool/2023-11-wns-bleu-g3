/* eslint-disable @next/next/no-img-element */
import {
  useDeletePostMutation,
  useProfileQuery,
  useUpdatePostMutation,
} from "@/graphql/generated/schema";
import Icon from "../icon";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Modal from "../modal";
import { useEffect, useRef, useState } from "react";
import ModalDeletePost from "./modal-delete-post";

const PostItem = ({
  post,
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
}) => {
  const { data: userData } = useProfileQuery();
  const currentUsername = userData?.profile?.nickname || "";

  const [updatePost] = useUpdatePostMutation();
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

  const convertDate = (isoString: string) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="mb-4 border-2 border-reef rounded-lg p-2">
      <div className="flex justify-between mb-4">
        <p className="font-semibold opacity-85">{post.user.nickname}</p>
        <p>{convertDate(post.created_at)}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl mb-1">{post.title}</h3>
        {post.imageUrl ? (
          <div className="flex justify-between">
            <p>{post.content}</p>
            <img
              src={post.imageUrl || ""}
              alt="post"
              className="max-w-56 rounded-lg"
            />
          </div>
        ) : (
          <p>{post.content}</p>
        )}
      </div>
      <div
        className={`flex ${
          currentUsername === post.user.nickname
            ? "justify-between"
            : "justify-end"
        }`}
      >
        {currentUsername === post.user.nickname && (
          <div className="flex gap-2 justify-end text-reef">
            <button>
              <Icon name="edit" />
            </button>
            <button onClick={() => setIsModalDeleteOpen(true)}>
              <Icon name="delete" />
            </button>
          </div>
        )}

        <div className="flex gap-2 justify-end text-reef">
          <p>{post.likes}</p>
          <button>
            {post.likes === 0 ? (
              <Icon name="favorite_border" />
            ) : (
              <Icon name="favorite" />
            )}
          </button>
        </div>
      </div>
      <ModalDeletePost
        isModalDeleteOpen={isModalDeleteOpen}
        setIsModalDeleteOpen={setIsModalDeleteOpen}
        post={post}
      />
    </div>
  );
};

export default PostItem;
