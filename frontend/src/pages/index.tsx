import ModalResetPassword from "@/components/modal-reset-password";
import { useConfirmEmailMutation } from "@/graphql/generated/schema";
import LayoutVisitor from "@/layouts/layout-visitor";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const emailToken = router.query.emailToken as string;
  const requestResetPassword = router.query.resetPassword as string;
  const resetPasswordToken = router.query.resetPasswordToken as string;
  const[isResetPasswordOpen, setIsResetPasswordOpen] = useState(false);
  const[isRequest, setIsRequest] = useState(false);

  const [confirmEmail] = useConfirmEmailMutation();

  const notify = () => toast.success("Votre adresse email a bien été confirmée !");

  useEffect(() => {
    if(emailToken){
      confirmEmail({variables: {emailToken}}).then(()=>{
      notify();
      router.push("/");
      });
    }
  }, [emailToken]);

  useEffect(() => {
    if(requestResetPassword === "true"){
      setIsOpen(false)
      setIsRequest(true);
      setIsResetPasswordOpen(true);
    }
  }, [requestResetPassword]);

  useEffect(() => {
    if(resetPasswordToken){
      setIsOpen(false)
      setIsRequest(false);
      setIsResetPasswordOpen(true);
    }
  }, [resetPasswordToken]);

  return (
    <LayoutVisitor isOpen={isOpen} setIsOpen={setIsOpen}>
      <section className="bg-[url(https://images.unsplash.com/photo-1428908728789-d2de25dbd4e2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-center bg-no-repeat">
        <div className="px-4 py-48 sm:px-6 flex flex-col lg:justify-center h-screen items-center lg:px-8 lg:pt-10">
          <h2 className="text-2xl font-medium text-reef sm:text-4xl text-center">
            Réduisez votre empreinte carbone, préservez notre avenir.
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
      <ModalResetPassword isOpen={isResetPasswordOpen} setIsOpen={setIsResetPasswordOpen} isRequest={isRequest} token={resetPasswordToken}/>
    </LayoutVisitor>
  );
}
