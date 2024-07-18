import React, { useRef, useState, useEffect } from "react";
import Icon from "../icon";

const FilterDropdown = ({
  filterWithImage,
  setFilterWithImage,
  filterByUsername,
  setFilterByUsername,
  filterMyPosts,
  setFilterMyPosts,
}: {
  filterWithImage: boolean;
  setFilterWithImage: (value: boolean) => void;
  filterByUsername: string;
  setFilterByUsername: (value: string) => void;
  filterMyPosts: boolean;
  setFilterMyPosts: (value: boolean) => void;
}) => {
  const [filteredByIsOpen, setFilteredByIsOpen] = useState(false);
  const filteredByRef = useRef<HTMLDivElement>(null);

  const closeDropdown = (e: MouseEvent) => {
    if (
      filteredByRef.current &&
      !filteredByRef.current.contains(e.target as Node)
    ) {
      setFilteredByIsOpen(false);
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
      ref={filteredByRef}
      className="flex gap-2 relative cursor-pointer"
      onClick={() => setFilteredByIsOpen(true)}
    >
      <p>Filtrer</p>
      <button>
        <Icon name="expand_more" />
      </button>
      {filteredByIsOpen && (
        <div className="flex flex-col mt-8 absolute inset-y-0 end-0 z-50 w-52 border-2 rounded-lg bg-lightPearl border-shore h-[15rem]">
          <div className="flex border-b-2 border-shore px-2 py-1 hover:bg-shore cursor-pointer">
            <label htmlFor="filterWithImage">Seulement avec image</label>
            <input
              type="checkbox"
              id="filterWithImage"
              checked={filterWithImage}
              onChange={() => setFilterWithImage(!filterWithImage)}
            />
          </div>
          <div className="flex flex-col border-b-2 border-shore px-2 hover:bg-shore cursor-pointer">
            <label htmlFor="filterByUsername" className="mb-1">
              Par utilisateur
            </label>
            <input
              type="text"
              id="filterByUsername"
              placeholder="Nom d'utilisateur"
              value={filterByUsername}
              onChange={(e) => setFilterByUsername(e.target.value)}
              className="p-1 mb-1 border rounded"
            />
          </div>
          <div className="flex px-2 hover:bg-shore cursor-pointer">
            <label htmlFor="filterMyPosts">Mes posts uniquement</label>
            <input
              type="checkbox"
              id="filterMyPosts"
              checked={filterMyPosts}
              onChange={() => setFilterMyPosts(!filterMyPosts)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
