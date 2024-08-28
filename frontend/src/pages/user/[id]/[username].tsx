import LayoutLoggedInUser from "@/layouts/layout-logged-in-user";
import { useParams } from "next/navigation";
// import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Profile() {
  //   const notify = () => toast.success("Profil mis à jour");

  const params = useParams();
  console.log(params);

  return (
    <LayoutLoggedInUser>
      <div className="mx-10">
        <h2 className="mb-10">LE USERNAME DU GARS</h2>
      </div>
    </LayoutLoggedInUser>
  );
}
