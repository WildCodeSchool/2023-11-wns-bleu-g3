import LayoutAdmin from "@/layouts/layout-admin";
import TableAdminUsers from "@/components/backoffice/table-admin-users";

export default function AdminUsers() {
  return (
    <LayoutAdmin>
      <div className="m-auto w-4/5">
        <h2 className="text-2xl  font-semibold mt-5">Utilisateurs</h2>
      </div>
      <TableAdminUsers />
    </LayoutAdmin>
  );
}
