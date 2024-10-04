import TableUserActivities from "@/components/table-activities";
import LayoutLoggedInUser from "@/layouts/layout-logged-in-user";

export default function Activities() {
  return (
    <LayoutLoggedInUser>
      <h1 className="mb-10 mx-10 text-lg md:text-xl lg:text-2xl">
        Mes dépenses
      </h1>
      <TableUserActivities />
    </LayoutLoggedInUser>
  );
}
