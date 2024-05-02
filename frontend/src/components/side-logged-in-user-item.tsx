import React from "react";

export default function SideLoggedInUserItem({
  name,
  href,
}: {
  name: string;
  href: string;
}) {
  return (
    <li>
      <a
        href={href}
        className="flex items-center text-sm p-2 text-gray-900 rounded-lg  bg-gray-100 hover:bg-anchor hover:text-white btn transition ease-in-out"
      >
        {name}{" "}
      </a>
    </li>
  );
}
