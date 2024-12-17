import type { AppProps } from "next/app";
import "@/styles/globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import { AuthProvider } from "../context/AuthContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthProvider>
        <Header />
          <Component {...pageProps} />
        <Footer />
      </AuthProvider>
    </>
  );
}