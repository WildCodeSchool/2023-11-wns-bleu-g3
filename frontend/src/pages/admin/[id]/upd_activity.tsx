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
    
      <div className="m-auto w-4/5">
        <h2 className="text-2xl  font-semibold mt-5">Liste Type Activités</h2>
        <br />
        
      </div>
   
      
    </LayoutAdmin>
  );
}