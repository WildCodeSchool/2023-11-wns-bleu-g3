import LayoutAdmin from "@/layouts/layout-admin";
import { useRouter } from "next/router";
import Link from "next/link";

import { useGetActivityTypesByIdQuery } from "@/graphql/generated/schema";

export default function ProductDetails() {
  const router = useRouter();

  const { id } = router.query;

  const { data } = useGetActivityTypesByIdQuery({
    variables: { getActivityTypesById: parseInt(id as string) },
    skip: typeof id === "undefined",
  });

  const product = data?.getActivityTypesById;

  return (
    <LayoutAdmin>
      {typeof product === "undefined" ? (
        "Produit Plus Disponible..."
      ) : (
        <div></div>
      )}
    </LayoutAdmin>
  );
}
