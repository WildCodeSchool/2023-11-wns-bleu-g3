import Icon from "@/components/icon";
import {
  useDeleteActivityTypeMutation,
  useGetPostsPaginationQuery,
} from "@/graphql/generated/schema";
import { useEffect, useState } from "react";
import Link from "next/link";
import ModalBin from "../modalBin";
import { useRouter } from "next/router";

const PAGE_SIZE = 8;

export default function TableAdminPosts() {
  const router = useRouter();
  // pagination offset limit
  const [page, setPage] = useState(0);
  const [notEndPage, setNotEndPage] = useState(true);

  const [deleteActiv] = useDeleteActivityTypeMutation();

  const { data, loading, error } = useGetPostsPaginationQuery({
    variables: {
      limit: PAGE_SIZE,
      offset: page * PAGE_SIZE,
    },
  });

  useEffect(() => {
    if (data) {
      setNotEndPage(data.getPostsPagination.length === PAGE_SIZE);
    }
  }, [data]);

  if (loading) {
    return (
      <p className="mt-3 text-center justify-center align-middle m-auto">
        Chargement...
      </p>
    );
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const posts = data?.getPostsPagination || [];

  return (
    <div className="relative overflow-x-auto shadow-md m-auto my-6 sm:rounded-lg w-4/5">
      <table
        className="w-full text-xs md:text-sm text-left rtl:text-right text-gray-500"
        id="toptable"
      >
        <thead className="text-xs uppercase bg-shore text-anchor">
          <tr>
            <th
              scope="col"
              className="px-2 py-1 md:px-6 md:py-3 hidden md:table-cell"
            >
              Image
            </th>
            <th
              scope="col"
              className="px-2 py-1 md:px-6 md:py-3 hidden md:table-cell"
            >
              Titre
            </th>
            <th
              scope="col"
              className="px-2 py-1 md:px-6 md:py-3 hidden md:table-cell"
            >
              Date Publication
            </th>
            <th
              scope="col"
              className="px-2 py-1 md:px-6 md:py-3 hidden md:table-cell"
            >
              Signalisé
            </th>
            <th
              scope="col"
              className="px-2 py-1 md:px-6 md:py-3 hidden md:table-cell"
            >
              Likes
            </th>
            <th scope="col" className="px-1 py-1 md:px-2 md:py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr
              key={post.imageUrl}
              className="border-t border-gray-500 bg-pearl text-reef hover:bg-shore hover:text-anchor"
            >
              <th
                scope="row"
                className="px-2 py-1 md:px-6 md:py-4 font-medium whitespace-nowrap"
              >
                <img
                  className="w-10 h-10 rounded-sm  bg-shore"
                  src={
                    post.imageUrl
                      ? post.imageUrl
                      : "@/public/img/greenfoot-logo.png"
                  }
                  alt="error display photo"
                />
              </th>
              <td className="px-2 py-1 md:px-6 md:py-4 hidden md:table-cell">
                {post.title}
              </td>
              <td className="px-2 py-1 md:px-6 md:py-4 hidden md:table-cell">
                {post.created_at}
              </td>
              <td className="px-2 py-1 md:px-6 md:py-4 hidden md:table-cell"></td>
              <td className="px-2 py-1 md:px-6 md:py-4 hidden md:table-cell">
                {post.nbOfLikes}
              </td>
              <td className="px-1 py-1 md:px-2 md:py-4 flex space-x-1 md:space-x-2">
                {/* <Link
                  href={`/admin/upd_activity/${activity.id}`}
                  className="font-medium text-anchor hover:underline"
                >
                  <Icon name="edit" size="" color="reef" />
                </Link>
                <ModalBin
                  operation={() =>
                    deleteActiv({
                      variables: {
                        activityTypeId: activity.id,
                      },
                    }).then(() => window.location.reload())
                  }
                  expression="supprimer"
                  mappedVar={activity}
                /> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <nav
        className="flex bg-pearl text-reef items-center flex-col md:flex-row justify-between pt-2 md:pt-4 border-t border-gray-500"
        aria-label="Table navigation"
      >
        <ul className="inline-flex m-auto mb-2 md:mb-4 -space-x-px rtl:space-x-reverse text-xs md:text-sm h-6 md:h-8">
          <li>
            <button
              className={`flex items-center justify-center px-2 md:px-3 h-6 md:h-8 ms-0 leading-tight bg-pearl border border-anchor rounded-s-lg font-medium ${
                !page
                  ? "text-gray-400"
                  : "text-reef hover:bg-lightPearl hover:text-anchor"
              }`}
              disabled={!page}
              onClick={() => setPage((prev) => prev - 1)}
            >
              &lt; Précédente
            </button>
          </li>
          <li>
            <p className="flex items-center justify-center px-4 md:px-7 h-6 md:h-8 leading-tight bg-pearl text-reef border border-anchor font-medium">
              Page {page + 1}
            </p>
          </li>
          <li>
            <button
              className="rounded-e-lg flex items-center justify-center px-4 md:px-6 h-6 md:h-8 leading-tight bg-pearl text-reef border border-anchor font-medium hover:bg-lightPearl hover:text-anchor"
              onClick={() => {
                if (notEndPage) {
                  setPage((prev) => prev + 1);
                }
              }}
            >
              Suivante &gt;
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
