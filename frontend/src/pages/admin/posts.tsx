import LayoutAdmin from "@/layouts/layout-admin";
import TableAdminPosts from "@/components/backoffice/table-admin-posts";

export default function Activities() {
  return (
    <LayoutAdmin>
      <div className="m-auto w-4/5">
        <h2 className="text-2xl  font-semibold mt-5">Moderation Contenu</h2>
        <br />
        <p>
          Ici, vous pouvez consulter les publications des utilisateurs, voir
          combien de fois elles ont été signalées et avoir la possibilité de
          supprimer la publication.
        </p>
      </div>
      <TableAdminPosts />
    </LayoutAdmin>
  );
}
