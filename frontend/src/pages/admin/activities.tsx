import LayoutAdmin from "@/layouts/layout-admin";
import TableActivities from "@/components/backoffice/table-admin-activities";

export default function Activities() {
  return (
    <LayoutAdmin>
      <div className="m-auto w-4/5">
        <h2 className="text-2xl  font-semibold mt-5">Liste Type Activités</h2>
        <br />
        <p>
          Ici, vous avez le choix de visualiser les types d&apos;activités que
          l&apos;utilisateur peut enregistrer sur son compte avec leurs émissions de
          CO2.
        </p>
        <p>Vous pouvez les visualiser, les modifier ou les supprimer.</p>
      </div>
      <TableActivities />
    </LayoutAdmin>
  );
}
