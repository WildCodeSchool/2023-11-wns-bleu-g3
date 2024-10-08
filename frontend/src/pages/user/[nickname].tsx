import EmissionBarChart from "@/components/charts/emissionBarCharts";
import Loading from "@/components/loading";
import {
  useGetUserByNicknameQuery,
  useFollowMutation,
  useUnfollowMutation,
  useProfileQuery,
  useGetGraphActivitiesQuery,
  Activity,
} from "@/graphql/generated/schema";
import LayoutLoggedInUser from "@/layouts/layout-logged-in-user";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function Profile() {
  const params = useParams();
  const [nickname, setNickname] = useState("");
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  const { data: currentUser } = useProfileQuery({
    errorPolicy: "ignore",
  });

  useEffect(() => {
    if (params?.nickname) {
      setNickname(params.nickname.toString());
    }
  }, [params]);

  const { data, loading, error } = useGetUserByNicknameQuery({
    variables: { nickname },
    skip: !nickname,
  });

  const { data: graphActivitiesData } = useGetGraphActivitiesQuery({
    variables: { userId: data?.getUserByNickname?.id },
  });
  const activities = graphActivitiesData?.getGraphActivities || [];

  const [follow] = useFollowMutation({
    onCompleted: () => {
      setIsFollowing(true);
      setFollowersCount((prev) => prev + 1);
    },
  });

  const [unfollow] = useUnfollowMutation({
    onCompleted: () => {
      setIsFollowing(false);
      setFollowersCount((prev) => prev - 1);
    },
  });

  useEffect(() => {
    if (data?.getUserByNickname) {
      const user = data.getUserByNickname;
      const currentUserFollowing =
        user.followers?.some(
          (follower) => follower.id === currentUser?.profile.id
        ) || false;
      setIsFollowing(currentUserFollowing);
      setFollowersCount(user.followers?.length || 0);
      setFollowingCount(user.following?.length || 0);
    }
  }, [data]);

  if (!nickname || loading) {
    return <Loading />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const user = data?.getUserByNickname;

  const handleFollowToggle = async () => {
    if (isFollowing) {
      if (user) {
        await unfollow({ variables: { userId: user.id } });
      }
    } else {
      if (user) {
        await follow({ variables: { userId: user.id } });
      }
    }
  };

  console.log(user?.following?.slice(0, 3));

  return (
    <LayoutLoggedInUser>
      <div className="max-w-4xl mx-auto my-12 p-6 sm:p-8 bg-white shadow-lg rounded-xl border border-gray-200">
        <div className="flex flex-col sm:flex-row items-center space-y-6 sm:space-y-0 sm:space-x-6">
          <img
            className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover"
            src={user?.avatarUrl ?? ""}
            alt={`${user?.firstName} ${user?.lastName}`}
          />
          <div className="text-center sm:text-left space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              {user?.firstName} {user?.lastName}
            </h2>
            <p className="text-base sm:text-lg text-gray-600 mt-1">
              @{user?.nickname}
            </p>
            <button
              className={`btn ${isFollowing ? "btn-error" : "btn-reef"}`}
              onClick={handleFollowToggle}
            >
              {isFollowing ? "Ne plus suivre" : "Suivre"}
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-6 rounded-lg mb-8">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center sm:justify-between">
            <div className="text-center bg-gray-100 w-full sm:w-1/3 rounded-lg py-4 px-6">
              <p className="text-xl sm:text-2xl font-bold text-gray-900">
                {user?.posts?.length || 0}
              </p>
              <p className="text-gray-600 mt-1">Posts</p>
            </div>

            <div className="text-center bg-gray-100 w-full sm:w-1/3 rounded-lg py-4 px-6">
              <div className="flex justify-center overflow-hidden">
                {user?.followers?.slice(0, 3).map((follower) => (
                  <img
                    key={follower.id}
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                    src={follower.avatarUrl || ""}
                    alt="Follower Avatar"
                  />
                ))}
              </div>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">
                {followersCount}
              </p>
              <p className="text-gray-600 mt-1">Abonnés</p>
            </div>

            <div className="text-center bg-gray-100 w-full sm:w-1/3 rounded-lg py-4 px-6">
              <div className="flex justify-center overflow-hidden">
                {user?.following?.slice(0, 3).map((following) => (
                  <img
                    key={following.id}
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                    src={following.avatarUrl || ""}
                    alt="Following Avatar"
                  />
                ))}
              </div>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">
                {followingCount}
              </p>
              <p className="text-gray-600 mt-1">Abonnements</p>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 rounded-lg mb-8">
          <h3 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4">
            Ses dépenses carbones
          </h3>
          <EmissionBarChart activities={activities as Activity[]} />
        </div>
      </div>
    </LayoutLoggedInUser>
  );
}
