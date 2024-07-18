import React, { useRef, useState, useEffect } from "react";
import Icon from "../icon";

const SortDropdown = ({
  sortedBy,
  setSortedBy,
}: {
  sortedBy: string;
  setSortedBy: (value: string) => void;
}) => {
  const [sortedByIsOpen, setSortedByIsOpen] = useState(false);
  const sortedByRef = useRef<HTMLDivElement>(null);

  const handleSortBy = (criteria: string) => {
    setSortedBy(criteria);
    setSortedByIsOpen(false);
  };

  const closeDropdown = (e: MouseEvent) => {
    if (
      sortedByRef.current &&
      !sortedByRef.current.contains(e.target as Node)
    ) {
      setSortedByIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeDropdown);
    return () => {
      document.removeEventListener("mousedown", closeDropdown);
    };
  }, []);

  return (
    <div
      ref={sortedByRef}
      className="flex gap-2 relative cursor-pointer"
      onClick={() => setSortedByIsOpen(true)}
    >
      <p>Trier par</p>
      <button>
        <Icon name="expand_more" />
      </button>
      {sortedByIsOpen && (
        <div className="flex flex-col mt-8 absolute inset-y-0 end-0 z-50 w-52 border-2 rounded-lg bg-lightPearl border-shore h-[15rem]">
          <p
            className="border-b-2 border-shore px-2 py-1 hover:bg-shore cursor-pointer"
            onClick={() => handleSortBy("mostRecent")}
          >
            Du plus récent au plus ancien
          </p>
          <p
            className="border-b-2 border-shore px-2 py-1 hover:bg-shore cursor-pointer"
            onClick={() => handleSortBy("lessRecent")}
          >
            Du plus ancien au plus récent
          </p>
          <p
            className="border-b-2 border-shore px-2 py-1 hover:bg-shore cursor-pointer"
            onClick={() => handleSortBy("lessLikes")}
          >
            Du moins de likes au plus de likes
          </p>
          <p
            className="px-2 py-1 hover:bg-shore cursor-pointer"
            onClick={() => handleSortBy("userNickname")}
          >
            Par nom d&apos;utilisateur
          </p>
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
