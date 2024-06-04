import {
  useResetPasswordMutation,
  useResetPasswordRequestMutation,
} from "@/graphql/generated/schema";
import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";

export default function ModalResetPassword({
  isOpen,
  setIsOpen,
  isRequest,
  token,
}: {
  isOpen: boolean;
  setIsOpen: any;
  isRequest: boolean;
  token?: string;
}) {
  const [viewPassword, setViewPassword] = useState(false);
  const [viewPasswordConfirmation, setViewPasswordConfirmation] =
    useState(false);
  const [error, setError] = useState("");
  const [resetPasswordRequest] = useResetPasswordRequestMutation();
  const [resetPassword] = useResetPasswordMutation();
  const router = useRouter();

  const notify = () =>
    toast.success(
      "Un email vous a été envoyé pour réinitialiser votre mot de passe."
    );

  const notifyResetPasswordSuccess = () =>
    toast.success("Votre mot de passe a bien été réinitialisé.");

  const handleSubmitRequest = async (e: FormEvent<HTMLFormElement>) => {
    setError("");
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formJSON: any = Object.fromEntries(formData.entries());

    try {
      const res = await resetPasswordRequest({ variables: { data: formJSON } });
      setIsOpen(false);
      router.push("/");
      notify();
    } catch (e: any) {
      setError("Adresse email inconnue, veuillez réessayer.");
    }
  };

  const handleSubmitResetPassword = async (e: FormEvent<HTMLFormElement>) => {
    setError("");
    e.preventDefault();
    if (!token) return setError("lien de réinitialisation invalide");
    const formData = new FormData(e.target as HTMLFormElement);
    const formJSON: any = Object.fromEntries(formData.entries());
    if (formJSON.password !== formJSON.passwordConfirmation)
      return setError("les mots de passe ne correspondent pas");

    delete formJSON.passwordConfirmation;

    try {
      await resetPasswordSchema.validate(formJSON, { abortEarly: false });
      await resetPassword({
        variables: { data: formJSON, resetPasswordToken: token },
      });
      setIsOpen(false);
      router.push("/");
      notifyResetPasswordSuccess();
    } catch (e: any) {
      setError(e.errors.join(", \n"));
    }
  };

  const resetPasswordSchema = Yup.object().shape({
    password: Yup.string()
      .required("Vous devez renseigner un mot de passe")
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Votre mot de passe n'est pas assez sécurisé"
      ),
  });

  return (
    <>
      {isOpen == true ? (
        <>
          {isRequest == true ? (
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-2 md:mx-4 lg:mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="flex justify-end items-center p-4"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                    </svg>
                  </button>
                  <div className="relative px-8 py-3 flex-auto">
                    <h3 className="text-center text-xl md:text-3xl pb-6 font-semibold">
                      Réinitialiser de votre mot de passe
                    </h3>
                    <form
                      onSubmit={handleSubmitRequest}
                      className="my-4 text-blueGray-500 leading-relaxed w-auto md:w-80 lg:w-auto flex flex-col gap-6"
                    >
                      <div className="flex flex-col gap-1">
                        <label htmlFor="email">Email</label>
                        <input
                          type="email"
                          className="input-text"
                          name="email"
                          placeholder="john@doe.fr"
                          required
                        />
                      </div>
                      {error !== "" && (
                        <pre className="text-error">{error}</pre>
                      )}
                      <button className="btn btn-reef">Envoyer</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <p>hello</p>
              <div className="relative w-auto my-6 mx-2 md:mx-4 lg:mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="flex justify-end items-center p-4"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                    </svg>
                  </button>
                  <div className="relative px-8 py-3 flex-auto">
                    <h3 className="text-center text-xl md:text-3xl pb-6 font-semibold">
                      Modifier votre mot de passe
                    </h3>
                    <form
                      onSubmit={handleSubmitResetPassword}
                      className="my-4 text-blueGray-500 leading-relaxed w-auto :w-80 lg:w-auto flex flex-col gap-6"
                    >
                      <div className="flex flex-col gap-1">
                        <label htmlFor="password">Nouveau mot de passe</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"></div>
                          <input
                            type={viewPassword == true ? "text" : "password"}
                            id="default-search"
                            className="input-text"
                            placeholder="8 caractères minimum"
                            name="password"
                            required
                          />
                          <button
                            type="button"
                            className="btn-xs absolute top-1 right-2"
                            onClick={
                              viewPassword == true
                                ? () => setViewPassword(false)
                                : () => setViewPassword(true)
                            }
                          >
                            {viewPassword == false ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                                className="hover:text-reef"
                              >
                                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                              </svg>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="hover:text-reef"
                                viewBox="0 0 16 16"
                              >
                                <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                                <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                                <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
                              </svg>
                            )}
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <label htmlFor="passwordConfirmation">
                          Confirmation du nouveau mot de passe
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"></div>
                          <input
                            type={
                              viewPasswordConfirmation == true
                                ? "text"
                                : "password"
                            }
                            id="default-search"
                            className="input-text"
                            placeholder="8 caractères minimum"
                            name="passwordConfirmation"
                            required
                          />
                          <button
                            type="button"
                            className="btn-xs absolute top-1 right-2"
                            onClick={
                              viewPasswordConfirmation == true
                                ? () => setViewPasswordConfirmation(false)
                                : () => setViewPasswordConfirmation(true)
                            }
                          >
                            {viewPasswordConfirmation == false ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                                className="hover:text-reef"
                              >
                                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                              </svg>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="hover:text-reef"
                                viewBox="0 0 16 16"
                              >
                                <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                                <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                                <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
                              </svg>
                            )}
                          </button>
                        </div>
                      </div>
                      {error !== "" && (
                        <pre
                          className="text-error text-xs"
                          data-testid="login-error"
                        >
                          {error}
                        </pre>
                      )}
                      <button className="btn btn-reef" type="submit">
                        Enregistrer
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
