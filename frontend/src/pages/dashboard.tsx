import LayoutLoggedInUser from "@/layouts/layout-logged-in-user";

export default function Dashboard() {
  return (
    <LayoutLoggedInUser>
      <h2>Je suis le dashboard utilisateur</h2>
    </LayoutLoggedInUser>
  );
}
