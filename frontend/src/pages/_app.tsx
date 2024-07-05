import client from "@/graphql/client";
import "@/styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { ToastContainer } from "react-toastify";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";

if (process.env.NODE_ENV !== "production") {
  loadDevMessages();
  loadErrorMessages();
}

function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <div className="flex flex-col h-screen justify-between bg-lightPearl">
        <Component {...pageProps} />
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </ApolloProvider>
  );
}

export default dynamic(() => Promise.resolve(App), { ssr: false });
