/* eslint-disable @next/next/no-img-element */

import { useGetDonationsQuery } from "@/graphql/generated/schema";
import LayoutLoggedInUser from "@/layouts/layout-logged-in-user";
import Link from "next/link";

export default function Donation() {
  const { data } = useGetDonationsQuery();
  const donations = data?.getDonations || [];

  const totalAmountDonated = donations.reduce(
    (sum, donation) => sum + donation.amount,
    0
  );

  const nbOfUsersWhoDonated = () => {
    if (donations.length === 0) return "nous n'avons pas encore reçu de dons";
    if (donations.length === 1)
      return (
        <>
          <span className="font-bold">1 seul utilisateur</span> a effectué une
          donation à notre mission
        </>
      );
    return (
      <>
        <span className="font-bold">{donations.length} utilisateurs</span> ont
        effectué une donation à notre mission.
      </>
    );
  };

  const convertDate = (isoString: string) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <LayoutLoggedInUser>
      <div className="flex flex-col text-anchor text-opacity-85">
        <div className="flex flex-col justify-center items-center bg-shore rounded-md p-4 mt-12 lg:mt-0  ">
          <div className="flex gap-8 items-center mb-6">
            <img src={"/img/bluepiggy.png"} alt="Tirelire" className="w-1/6" />

            <div className="flex flex-col text-4xl ml-4">
              <p className="text-3xl">Contributions Totales</p>
              <p className="font-bold">{totalAmountDonated} €</p>
            </div>
          </div>

          <p className="text-2xl">À ce jour, {nbOfUsersWhoDonated()}</p>
        </div>

        <Link href="/donation/make-donation">
          <div className="flex my-12 lg:my-6 items-center gap-4 cursor-pointer">
            <div className="bg-reef rounded-full object-cover h-10 w-10 text-3xl text-lightPearl flex justify-center items-center ">
              +
            </div>

            <p className="text-anchor opacity-90 text-lg ">Faire un don</p>
          </div>
        </Link>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-0">
          <div className="lg:w-2/4">
            <h2 className="text-center lg:text-left mb-4">
              Nos valeurs et missions
            </h2>

            <p>
              Chez GreenFoot, notre mission est de transformer l&apos;engagement
              individuel en une force collective puissante pour la protection de
              notre environnement. Grâce aux dons généreux de notre communauté
              d&apos;utilisateurs, nous soutenons activement des associations
              écologiques locales, participons au nettoyage et à la préservation
              des forêts, et contribuons à la dépollution des villes et villages
              à travers toute la France. <br />
              <br />
              Nous croyons fermement que chaque geste compte, et nous nous
              efforçons de rendre accessible à tous la possibilité de contribuer
              à un avenir plus vert et durable. En plus de ces actions sur le
              terrain, nous travaillons sans relâche pour promouvoir un
              activisme concret en faveur de la réduction des émissions de
              carbone, en ciblant particulièrement les grandes entreprises
              polluantes. Par le biais de campagnes de sensibilisation, de
              partenariats et de projets de recherche, nous développons des
              solutions innovantes et durables pour diminuer l&apos;empreinte
              écologique de ces acteurs économiques majeurs. <br />
              <br />
              Notre engagement ne s&apos;arrête pas là : nous vous accompagnons
              également dans votre démarche personnelle de réduction
              d&apos;impact carbone, en vous offrant des conseils pratiques, des
              outils et des ressources pour adopter un mode de vie plus
              respectueux de l&apos;environnement. Nous croyons au pouvoir de
              l&apos;information et de la transparence. C&apos;est pourquoi,
              grâce à notre newsletter, vous serez régulièrement tenus au
              courant des dernières actions, des projets en cours, et des
              missions réalisées par notre compagnie. <br />
              <br />
              Rejoignez-nous dans cette aventure pour un monde plus vert, où
              chaque contribution, grande ou petite, peut faire une réelle
              différence.
            </p>
          </div>
          <div className="flex flex-col gap-4 items-center lg:w-2/4 mb-12 lg:mb-0">
            <h2>Ils ont récemment contribué</h2>
            {donations.length === 0 ? (
              <p>Nous n&apos;avons pas encore reçu de donation.</p>
            ) : (
              <table
                className="w-3/4 text-xs md:text-sm text-left rtl:text-right text-gray-500"
                id="toptable"
              >
                <thead className="text-xs uppercase bg-shore text-anchor">
                  <tr>
                    <th scope="col" className="px-2 py-1 md:px-6 md:py-3">
                      Pseudo
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-1 md:px-6 md:py-3 hidden md:table-cell"
                    >
                      Date du don
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[...donations]
                    .sort((a, b) => b.id - a.id)
                    .map(
                      (donation, index) =>
                        index < 5 && (
                          <tr
                            key={donation.id}
                            className="border-t border-gray-500 bg-pearl text-reef hover:bg-shore hover:text-anchor"
                          >
                            <th
                              scope="row"
                              className="px-2 py-1 md:px-6 md:py-4 font-medium whitespace-nowrap"
                            >
                              {donation.user.nickname}
                            </th>
                            <td className="px-2 py-1 md:px-6 md:py-4 hidden md:table-cell">
                              {convertDate(donation.dateOfDonation)}
                            </td>
                          </tr>
                        )
                    )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </LayoutLoggedInUser>
  );
}
