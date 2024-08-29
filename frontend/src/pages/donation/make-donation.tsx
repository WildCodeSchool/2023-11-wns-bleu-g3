/* eslint-disable @next/next/no-img-element */
import Icon from "@/components/icon";
import {
  useCreateDonationMutation,
  useProfileQuery,
} from "@/graphql/generated/schema";
import LayoutLoggedInUser from "@/layouts/layout-logged-in-user";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MakeDonation() {
  const router = useRouter();
  const { data: user } = useProfileQuery();

  const [createNewDonation] = useCreateDonationMutation();

  const handleCreateNewDonation = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formJSON: any = Object.fromEntries(formData.entries());
    formJSON.amount = parseFloat(formJSON.amount);

    createNewDonation({
      variables: { data: formJSON },
      refetchQueries: ["GetDonations"],
    })
      .then((res) => {
        router.push("/donation");
        toast.success("Merci pour votre don ! 🌳");
      })
      .catch(console.error);
  };

  return (
    <LayoutLoggedInUser>
      <div>
        <Link href="/donation" className="flex gap-3 w-fit mb-16">
          <Icon name="keyboard_return" />
          <p>Retour</p>
        </Link>

        <form
          onSubmit={handleCreateNewDonation}
          className="flex flex-col lg:flex-row gap-24"
        >
          <div className="flex flex-col lg:lg:w-2/4 text-anchor text-opacity-85">
            <h2>Donation</h2>
            <p className="mt-4 mb-8 text-reef font-semibold">
              {user?.profile.firstName} {user?.profile.lastName}
            </p>
            <label
              className="flex flex-col gap-2 mb-4 font-semibold"
              htmlFor="amount"
            >
              Montant
              <div className="flex justify-between border-2 border-pearl text-reef font-normal text-sm rounded-lg bg-white">
                <input
                  type="text"
                  name="amount"
                  id="amount"
                  className="border-none w-full p-3.5 rounded-lg"
                />
                <p className="text-xl p-3.5">€</p>
              </div>
            </label>
            <label className="flex flex-col gap-2 mb-4 font-semibold">
              Message
              <textarea className="input-text-reef min-h-52" />
            </label>

            <p className="font-semibold mb-2">Information</p>
            <p>
              Pour chaque don effectué via Greenfoot, nous nous engageons à
              planter un arbre.
            </p>
          </div>

          <div className="flex flex-col lg:w-2/4 text-reef">
            <h2>Coordonnées bancaires</h2>
            <div className="my-8 flex gap-8 border-2 border-pearl font-normal text-sm rounded-lg bg-white">
              <p className="p-3.5 font-semibold w-1/4">Email</p>
              <p className="p-3.5 w-3/4">{user?.profile.email}</p>
            </div>

            <h3 className="font-semibold mb-4">Information carte</h3>
            <div className="flex gap-8 border-2 border-pearl font-normal text-sm rounded-lg bg-white">
              <input
                type="text"
                placeholder="0123 4567 8901 2345"
                className="p-3.5 rounded-lg w-3/4"
              />
              <img
                src="/img/cb.png"
                alt="Logos Visa et Mastercard"
                className="h-12 pr-2"
              />
            </div>

            <div className="flex ">
              <div className="flex w-2/4 gap-8 border-2 border-pearl font-normal text-sm rounded-lg bg-white">
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="p-3.5 rounded-lg w-full"
                />
              </div>
              <div className="flex gap-8 w-2/4 border-2 border-pearl font-normal text-sm rounded-lg bg-white">
                <input
                  type="text"
                  placeholder="CVC"
                  className="p-3.5 rounded-lg w-full"
                />
              </div>
            </div>

            <h3 className="font-semibold mb-4 mt-8">Nom de la carte</h3>
            <input type="text" className="input-text-reef" />

            <button className="btn btn-reef mt-16">Confirmer paiement</button>
          </div>
        </form>
      </div>
    </LayoutLoggedInUser>
  );
}
