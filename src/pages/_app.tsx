import type { AppProps } from "next/app";
import "@/styles/globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import { AuthProvider } from "../context/AuthContext";
import { useState, useEffect } from "react";
import Router from "next/router"; 
import LoadingSkeleton from "./components/common/LoadingSkeleton";

export default function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleRouteChangeStart = () => setLoading(true);
    const handleRouteChangeComplete = () => setLoading(false);
    const handleRouteChangeError = () => setLoading(false);
    Router.events.on("routeChangeStart", handleRouteChangeStart);
    Router.events.on("routeChangeComplete", handleRouteChangeComplete);
    Router.events.on("routeChangeError", handleRouteChangeError);
    return () => {
      Router.events.off("routeChangeStart", handleRouteChangeStart);
      Router.events.off("routeChangeComplete", handleRouteChangeComplete);
      Router.events.off("routeChangeError", handleRouteChangeError);
    };
  }, []);

  return (
    <AuthProvider>
      <Header />
      {loading ? (
        <LoadingSkeleton />
      ) : (
        <Component {...pageProps} />
      )}
      <Footer />
    </AuthProvider>
  );
}
