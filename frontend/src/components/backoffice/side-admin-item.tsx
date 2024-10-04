export default function SideAdminItem({
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
        className="flex items-center text-sm p-3 text-white rounded-lg  bg-reef hover:bg-white hover:text-black btn transition ease-in-out"
      >
        {name}
      </a>
    </li>
  );
}
