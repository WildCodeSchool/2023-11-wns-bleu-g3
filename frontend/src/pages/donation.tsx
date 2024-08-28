/* eslint-disable @next/next/no-img-element */

import LayoutLoggedInUser from "@/layouts/layout-logged-in-user";

export default function Donation() {
  return (
    <LayoutLoggedInUser>
      <div className="flex flex-col text-anchor text-opacity-85">
        <div className="flex flex-col bg-shore rounded-md p-4 mt-12 lg:mt-0 lg:w-2/4 ">
          <div className="flex items-center mb-6">
            <img src={"/img/bluepiggy.png"} alt="Tirelire" className="w-2/6" />

            <div className="flex flex-col text-4xl ml-4">
              <p className="text-3xl">Contributions Totales</p>

              <p className="font-bold">3522.09€</p>
            </div>
          </div>

          <p className="text-2xl">
            À ce jour, <span className="font-bold">87 utilisateurs</span> ont
            effectué une donation à notre mission.
          </p>
        </div>

        <div className="flex my-12 lg:my-6 items-center gap-4 cursor-pointer">
          <div className="bg-reef rounded-full object-cover h-10 w-10 text-3xl text-lightPearl flex justify-center items-center ">
            +
          </div>

          <p className="text-anchor opacity-90 text-lg ">Faire un don</p>
        </div>

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
              Notre engagement ne s&apos;arrête pas là : nous vous accompagnons
              également dans votre démarche personnelle de réduction
              d&apos;impact carbone, en vous offrant des conseils pratiques, des
              outils et des ressources pour adopter un mode de vie plus
              respectueux de l&apos;environnement. Nous croyons au pouvoir de
              l&apos;information et de la transparence. C&apos;est pourquoi,
              grâce à notre newsletter, vous serez régulièrement tenus au
              courant des dernières actions, des projets en cours, et des
              missions réalisées par notre compagnie. <br />
              Rejoignez-nous dans cette aventure pour un monde plus vert, où
              chaque contribution, grande ou petite, peut faire une réelle
              différence.
            </p>
          </div>
          <div className="flex flex-col gap-4 items-center lg:w-2/4 mb-12 lg:mb-0">
            <h2>Ils ont récemment contribué</h2>
            <table className="w-3/4 border-2 border-anchor border-opacity-85 text-center">
              <tr className="">
                <th className="border-2  border-anchor border-opacity-85 p-1 text-lg text-anchor">
                  Pseudo
                </th>
                <th className="border-2 border-anchor border-opacity-85 p-1 text-lg text-anchor">
                  Date du don
                </th>
              </tr>
              <tr>
                <td className="border-2 border-anchor border-opacity-85 text-center p-1">
                  Gretaaaaa
                </td>
                <td className="border-2 border-anchor border-opacity-85 text-center p-1">
                  24/06/2024
                </td>
              </tr>
              <tr>
                <td className="border-2 border-anchor border-opacity-85 text-center p-1">
                  MarcLeVert
                </td>
                <td className="border-2 border-anchor border-opacity-85 text-center p-1">
                  12/11/2023
                </td>
              </tr>
              <tr>
                <td className="border-2 border-anchor border-opacity-85 text-center p-1">
                  ClaireNature
                </td>
                <td className="border-2 border-anchor border-opacity-85 text-center p-1">
                  02/08/2023
                </td>
              </tr>
              <tr>
                <td className="border-2 border-anchor border-opacity-85 text-center p-1">
                  LilaFleuris
                </td>
                <td className="border-2 border-anchor border-opacity-85 text-center p-1">
                  02/08/2023
                </td>
              </tr>
              <tr>
                <td className="border-2 border-anchor border-opacity-85 text-center p-1">
                  JulienEco
                </td>
                <td className="border-2 border-anchor border-opacity-85 text-center p-1">
                  02/08/2023
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </LayoutLoggedInUser>
  );
}
