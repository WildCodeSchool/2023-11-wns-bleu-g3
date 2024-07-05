import Icon from "@/components/icon";
import ModalResetPassword from "@/components/modal-reset-password";
import { useConfirmEmailMutation } from "@/graphql/generated/schema";
import LayoutVisitor from "@/layouts/layout-visitor";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const emailToken = router.query.emailToken as string;
  const requestResetPassword = router.query.resetPassword as string;
  const resetPasswordToken = router.query.resetPasswordToken as string;
  const [isResetPasswordOpen, setIsResetPasswordOpen] = useState(false);
  const [isRequest, setIsRequest] = useState(false);

  const [confirmEmail] = useConfirmEmailMutation();

  const notify = () =>
    toast.success("Votre adresse email a bien été confirmée !");

  useEffect(() => {
    if (emailToken) {
      confirmEmail({ variables: { emailToken } }).then(() => {
        notify();
        router.push("/");
      });
    }
  }, [emailToken]);

  useEffect(() => {
    if (requestResetPassword === "true") {
      setIsOpen(false);
      setIsRequest(true);
      setIsResetPasswordOpen(true);
    }
  }, [requestResetPassword]);

  useEffect(() => {
    if (resetPasswordToken) {
      setIsOpen(false);
      setIsRequest(false);
      setIsResetPasswordOpen(true);
    }
  }, [resetPasswordToken]);

  return (
    <LayoutVisitor isOpen={isOpen} setIsOpen={setIsOpen}>
      <section className="bg-[url(https://images.unsplash.com/photo-1428908728789-d2de25dbd4e2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-center bg-no-repeat">
        <div className="px-4 pt-48 sm:px-6 flex flex-col lg:justify-center h-screen items-center lg:px-8 lg:pt-10">
          <h2 className="text-2xl font-medium text-reef sm:text-4xl text-center">
            Réduisez votre empreinte carbone, préservez notre avenir. Test n°3
          </h2>
          <div className="mt-8 flex flex-col gap-4 text-center">
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="btn bg-lightPearl text-reef px-6 md:px-24 md:text-lg shadow-sm hover:bg-reef hover:text-lightPearl transition ease-in-out"
            >
              Calculez votre empreinte carbone
            </button>
          </div>
        </div>
      </section>
      <section className="flex flex-col md:flex-row items-center py-6 px-4 md:px-8 lg:px-12">
        <div className="flex flex-col w-full md:w-1/2 lg:w-1/3">
          <h3 className="text-xl text-center font-bold pt-6 md:pt-0">
            Changer l&apos;avenir avec GreenFoot.
          </h3>
          <p className="text-justify pt-6">
            En créant un compte Greenfoot, vous franchissez le premier pas vers
            un avenir plus durable. Notre plateforme vous permet
            d&apos;analyser, de gérer et de calculer votre empreinte carbone
            quotidienne. Grâce à des outils intuitifs, vous découvrirez comment
            vos activités impactent l&apos;environnement et comment vous pouvez
            les modifier pour réduire vos émissions.
          </p>
          <button
            onClick={() => setIsOpen(true)}
            className="btn btn-reef my-6 md:w-1/2"
          >
            Créer un compte
          </button>
        </div>
        <img
          src={"/img/mockup.png"}
          alt="Mockup de l'application"
          className="w-3/4 md:w-1/2 mx-auto"
        />
      </section>
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8 py-6 px-4 md:px-6 lg:px-12 bg-reef text-lightPearl shadow">
        <div className="flex flex-col justify-center items-center gap-3">
          <h5 className="text-center font-semibold">
            Emissions Totales en France en 2023
          </h5>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
            className="w-12"
          >
            <path
              fill="#EEF2F6"
              d="M64 32C46.3 32 32 46.3 32 64V304v48 80c0 26.5 21.5 48 48 48H496c26.5 0 48-21.5 48-48V304 152.2c0-18.2-19.4-29.7-35.4-21.1L352 215.4V152.2c0-18.2-19.4-29.7-35.4-21.1L160 215.4V64c0-17.7-14.3-32-32-32H64z"
            />
          </svg>
          <p className="text-center text-sm">
            385 millions de tonnes métriques de CO2
          </p>
        </div>
        <div className="flex flex-col justify-center items-center gap-3">
          <h5 className="text-center font-semibold">
            Impact du Secteur Énergétique
          </h5>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="w-12"
          >
            <path
              fill="#EEF2F6"
              d="M32 64C32 28.7 60.7 0 96 0H256c35.3 0 64 28.7 64 64V256h8c48.6 0 88 39.4 88 88v32c0 13.3 10.7 24 24 24s24-10.7 24-24V222c-27.6-7.1-48-32.2-48-62V96L384 64c-8.8-8.8-8.8-23.2 0-32s23.2-8.8 32 0l77.3 77.3c12 12 18.7 28.3 18.7 45.3V168v24 32V376c0 39.8-32.2 72-72 72s-72-32.2-72-72V344c0-22.1-17.9-40-40-40h-8V448c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32V64zM96 80v96c0 8.8 7.2 16 16 16H240c8.8 0 16-7.2 16-16V80c0-8.8-7.2-16-16-16H112c-8.8 0-16 7.2-16 16z"
            />
          </svg>
          <p className="text-center text-sm">
            70% des emissions responsables provient du secteur energétique
          </p>
        </div>{" "}
        <div className="flex flex-col justify-center items-center gap-3">
          <h5 className="text-center font-semibold">Dominance du Transport</h5>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 512"
            className="w-12"
          >
            <path
              fill="#EEF2F6"
              d="M171.3 96H224v96H111.3l30.4-75.9C146.5 104 158.2 96 171.3 96zM272 192V96h81.2c9.7 0 18.9 4.4 25 12l67.2 84H272zm256.2 1L428.2 68c-18.2-22.8-45.8-36-75-36H171.3c-39.3 0-74.6 23.9-89.1 60.3L40.6 196.4C16.8 205.8 0 228.9 0 256V368c0 17.7 14.3 32 32 32H65.3c7.6 45.4 47.1 80 94.7 80s87.1-34.6 94.7-80H385.3c7.6 45.4 47.1 80 94.7 80s87.1-34.6 94.7-80H608c17.7 0 32-14.3 32-32V320c0-65.2-48.8-119-111.8-127zM434.7 368a48 48 0 1 1 90.5 32 48 48 0 1 1 -90.5-32zM160 336a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"
            />
          </svg>
          <p className="text-center text-sm">
            30 % des émissions de gaz à effet de serre de la France par des
            moteurs combustion.
          </p>
        </div>{" "}
        <div className="flex flex-col justify-center items-center gap-3">
          <h5 className="text-center font-semibold">Émissions Agricoles</h5>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 512"
            className="w-12"
          >
            <path
              fill="#EEF2F6"
              d="M32 144c0 79.5 64.5 144 144 144H299.3c22.6 19.9 52.2 32 84.7 32s62.1-12.1 84.7-32H496c61.9 0 112-50.1 112-112s-50.1-112-112-112c-10.7 0-21 1.5-30.8 4.3C443.8 27.7 401.1 0 352 0c-32.6 0-62.4 12.2-85.1 32.3C242.1 12.1 210.5 0 176 0C96.5 0 32 64.5 32 144zM616 368H280c-13.3 0-24 10.7-24 24s10.7 24 24 24H616c13.3 0 24-10.7 24-24s-10.7-24-24-24zm-64 96H440c-13.3 0-24 10.7-24 24s10.7 24 24 24H552c13.3 0 24-10.7 24-24s-10.7-24-24-24zm-192 0H24c-13.3 0-24 10.7-24 24s10.7 24 24 24H360c13.3 0 24-10.7 24-24s-10.7-24-24-24zM224 392c0-13.3-10.7-24-24-24H96c-13.3 0-24 10.7-24 24s10.7 24 24 24H200c13.3 0 24-10.7 24-24z"
            />
          </svg>
          <p className="text-center text-sm">
            20 % des émissions issues des pratiques agricoles, en particulier
            l&apos;élevage, en raison du méthane.
          </p>
        </div>{" "}
      </section>
      <section className="flex flex-col md:flex-row md:gap-6 lg:gap-8 px-4 md:px-8 lg:px-12 py-6">
        <div className="w-full md:w-1/3">
          <img
            src={"/img/central.png"}
            alt=""
            className="w-full rounded-lg shadow-sm"
          />
        </div>
        <div className="w-full md:w-2/3 space-y-8 flex flex-col justify-center py-6 md:py-0">
          <p className="text-justify px-4 md:px-6 lg:px-12">
            En 2024, la France a enregistré des émissions de carbone
            significatives, reflétant à la fois les défis persistants et les
            domaines où des progrès environnementaux sont encore nécessaires de
            toute urgence. Malgré les efforts nationaux pour réduire la
            dépendance aux combustibles fossiles, les secteurs des transports et
            de l&apos;industrie continuent de contribuer largement à
            l&apos;empreinte carbone du pays.
          </p>
          <p className="text-justify px-4 md:px-6 lg:px-12">
            Cette situation souligne le besoin crucial de politiques renforcées
            et de solutions innovantes pour accélérer la transition vers des
            sources d&apos;énergie durables. L&apos;impact de ces émissions ne
            se limite pas aux frontières nationales mais contribue au changement
            climatique mondial, affectant les écosystèmes et les communautés à
            travers le monde. Ces données mettent en lumière l&apos;importance
            de l&apos;action individuelle et collective dans la lutte contre les
            problèmes environnementaux.
          </p>
        </div>
      </section>
      <ModalResetPassword
        isOpen={isResetPasswordOpen}
        setIsOpen={setIsResetPasswordOpen}
        isRequest={isRequest}
        token={resetPasswordToken}
      />
    </LayoutVisitor>
  );
}
