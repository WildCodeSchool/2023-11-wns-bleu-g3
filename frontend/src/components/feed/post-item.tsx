/* eslint-disable @next/next/no-img-element */
import { useRef } from "react";
import {
  useGetLikesQuery,
  useLikeAndDislikePostMutation,
  useProfileQuery,
} from "@/graphql/generated/schema";
import Icon from "../icon";
import { useState, useEffect } from "react";
import ModalDeletePost from "./modal-delete-post";
import ModalUpdatePost from "./modal-update-post";
import ReportDropdown from "./report-dropdown";

const PostItem = ({ post }: { post: any }) => {
  const [isUpdatePostModalOpen, setIsUpdatePostModalOpen] = useState(false);
  const [isDeletePostModalOpen, setIsDeletePostModalOpen] = useState(false);
  const [localLikes, setLocalLikes] = useState(post.nbOfLikes);
  const [hasLiked, setHasLiked] = useState(false);

  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const { data: userData } = useProfileQuery();
  const currentUsername = userData?.profile?.nickname || "";

  const { data: likedPost } = useGetLikesQuery({
    variables: { postId: post.id },
  });

  useEffect(() => {
    if (likedPost) {
      const userLike = likedPost.getLikes.some(
        (like) => like.user.id === userData?.profile.id
      );
      setHasLiked(userLike);
    }
  }, [likedPost, userData]);

  const [likePost] = useLikeAndDislikePostMutation();

  const handleLikePost = () => {
    likePost({ variables: { postId: post.id } })
      .then(({ data }) => {
        if (data?.likeAndDislikePost === "Like removed") {
          setLocalLikes(localLikes - 1);
          setHasLiked(false);
        } else {
          setLocalLikes(localLikes + 1);
          setHasLiked(true);
        }
      })
      .catch(console.error);
  };

  const convertDate = (isoString: string) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleOpenMenu = () => {
    setMenuIsOpen(!menuIsOpen);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <div className="bg-pearl mb-4 lg:border-2 lg:border-reef lg:rounded-lg p-2 w-full">
      <div className="flex justify-between mb-4">
        <p className="font-semibold opacity-85">{post.user.nickname}</p>
        <div className="flex gap-x-4">
          <p className="mt-1">{convertDate(post.created_at)}</p>
          <div className="hidden md:block" ref={menuRef}>
            {/* the report feature is commented until notice */}
            {/* <button
              className="hover:bg-slate-300 focus:bg-slate-300 rounded-full px-1"
              onClick={handleOpenMenu}
            >
              <Icon name="more_vert" size="xl" />
            </button> */}
            {/* {menuIsOpen && (
              <div className="relative">
                <ReportDropdown mappedVar="post" />
              </div>
            )} */}
          </div>
        </div>
      </div>
      <div className="mb-4">
        <h3 className="text-xl mb-2">{post.title}</h3>
        <div className=" border-b-2 border-shore w-full my-3" />
        {post.imageUrl ? (
          <div className="flex justify-between">
            <p className="whitespace-pre-line">
              <a href={post.imageUrl} target="_blank">
                <img
                  src={post.imageUrl}
                  alt="post"
                  className="mb-4 lg:max-w-72 max-h-72 lg:float-right rounded-lg"
                />
              </a>
              {post.content}
            </p>
          </div>
        ) : (
          <p className="whitespace-pre-line">{post.content}</p>
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
            <button onClick={() => setIsUpdatePostModalOpen(true)}>
              <Icon name="edit" />
            </button>
            <button onClick={() => setIsDeletePostModalOpen(true)}>
              <Icon name="delete" />
            </button>
          </div>
        )}

        <div className="flex gap-2 justify-end text-reef">
          <p>{localLikes}</p>
          <div>
            {hasLiked ? (
              <button onClick={handleLikePost}>
                <Icon name="favorite" />
              </button>
            ) : (
              <button onClick={handleLikePost}>
                <Icon name="favorite_border" />
              </button>
            )}
          </div>
        </div>
      </div>
      <ModalDeletePost
        isDeletePostModalOpen={isDeletePostModalOpen}
        setIsDeletePostModalOpen={setIsDeletePostModalOpen}
        post={post}
      />
      <ModalUpdatePost
        isUpdatePostModalOpen={isUpdatePostModalOpen}
        setIsUpdatePostModalOpen={setIsUpdatePostModalOpen}
        post={post}
      />
    </div>
  );
};

export default PostItem;
