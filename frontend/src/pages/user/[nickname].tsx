/* eslint-disable @next/next/no-img-element */
import Loading from "@/components/loading";
import { useGetUserByNicknameQuery } from "@/graphql/generated/schema";
import LayoutLoggedInUser from "@/layouts/layout-logged-in-user";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function Profile() {
  const params = useParams();
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    if (params?.nickname) {
      setNickname(params.nickname.toString());
    }
  }, [params]);

  const { data, loading, error } = useGetUserByNicknameQuery({
    variables: { nickname },
    skip: !nickname,
  });

  if (!nickname || loading) {
    return <Loading />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const user = data?.getUserByNickname;

  return (
    <LayoutLoggedInUser>
      <div className="max-w-4xl mx-auto my-12 p-8 bg-white shadow-lg rounded-xl border border-gray-200">
        <div className="flex items-center space-x-6 mb-8">
          <img
            className="w-40 h-40 rounded-full object-cover"
            src={user?.avatarUrl ?? ""}
            alt={`${user?.firstName} ${user?.lastName}`}
          />
          <div>
            <h2 className="text-4xl font-extrabold text-gray-900">
              {user?.firstName} {user?.lastName}
            </h2>
            <p className="text-lg text-gray-600 mt-1">@{user?.nickname}</p>
          </div>
        </div>

        <div className="p-6 rounded-lg mb-8">
          <h3 className="text-3xl font-semibold text-gray-800 mb-4">
            Ses dépenses carbones
          </h3>
          <p className="text-base text-gray-700 leading-relaxed">
            Ici il y aura les dépenses carbone du user <br />
            Ici il y aura les dépenses carbone du user <br />
            Ici il y aura les dépenses carbone du user <br />
            Ici il y aura les dépenses carbone du user <br />
            Ici il y aura les dépenses carbone du user <br />
          </p>
        </div>

        <div className="bg-gray-100 p-6 rounded-lg mb-8">
          <div className="flex justify-center space-x-12">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">
                {user?.followers ? user?.followers.length : 0}
              </p>
              <p className="text-gray-600 mt-1">Followers</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">
                {user?.following ? user?.following.length : 0}
              </p>
              <p className="text-gray-600 mt-1">Following</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button className="btn btn-reef w-1/4">Suivre</button>
        </div>
      </div>
    </LayoutLoggedInUser>
  );
}
