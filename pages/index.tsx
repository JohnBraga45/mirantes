import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Loading from "react-spinners/ScaleLoader";
import Cookies from "js-cookie";
import { addDays } from "date-fns";
import Image from "next/image";
import Button from "../components/Button";
import Link from "next/link";

const Home: NextPage = () => {
  const router = useRouter();
  const refHeader = useRef<HTMLDivElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const year = new Date().getFullYear();

  const handleHeaderStyle = () => {
    if (window.scrollY >= 64) {
      refHeader.current?.classList.add("bg-white");
      refHeader.current?.classList.add("shadow-md");
    } else {
      refHeader.current?.classList.remove("bg-white");
      refHeader.current?.classList.remove("shadow-md");
    }
  };

  // Listen to recovery link to open reset password page
  // and listen to sign in link to sign in with password
  // or 3rd party providers (i.e. Google).
  useEffect(() => {
    const rawParams = router.asPath.replace("/#", "");
    const params = new URLSearchParams(rawParams);
    const accessToken = params.get("access_token");
    const providerToken = params.get("provider_token");
    const type = params.get("type");

    if (accessToken) {
      Cookies.set("access_token", accessToken, {
        expires: addDays(new Date(), 7),
        path: "/",
      });

      if (type === "signup") {
        router.replace("/dashboard");
      }

      if (type === "recovery") {
        router.replace("/auth/reset-password");
      }

      if (providerToken) {
        router.replace("/auth/account-details");
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleHeaderStyle);

    return () => window.removeEventListener("scroll", handleHeaderStyle);
  }, []);

  useEffect(() => {
    setIsProcessing(!!router.asPath.includes("access_token"));
  }, []);

  return (
    <div className="min-h-screen">
      <Head>
        <title>Gestor de Tarefas</title>
      </Head>

      {isProcessing ? (
        <div className="w-full h-screen flex justify-center items-center">
          <Loading
            height={72}
            width={8}
            radius={16}
            margin={4}
            color="rgb(29 78 216)"
          />
        </div>
      ) : (
        <>
          {/* Header */}
          <header
            ref={refHeader}
            className="flex items-center px-4 py-2 fixed w-full"
          >
            
            
          </header>

          {/* Main */}
          <main>
            <div className="pb-16 pt-32 bg-gradient-to-b from-blue-100 to-white lg:pt-56">
              <div className="flex flex-col items-center px-4 lg:items-start lg:px-16">
                <div className="max-w-[560px] md:max-w-3xl lg:max-w-2xl">
                  <h1 className="font-semibold text-3xl text-center mb-4 text-slate-700 md:text-5xl md:text-left">
                    Dionísio Braga
                  </h1>
                  <p className="text-center text-lg text-slate-700 mb-8 md:text-left md:mb-12">
                  Seja Bem vindo ao Gestor de Tarefas
                  </p>
                  <Link href="/auth/signup">
                    <a className="w-full lg:w-auto">
                      <Button className="w-full lg:w-auto" type="button">
                       Registar é gratuito
                      </Button>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex justify-center px-4 py-16 lg:py-32">
              <div className="flex flex-col items-center max-w-[560px] md:max-w-3xl">
                 
                
              </div>
            </div>
             
          </main>
 
           
        </>
      )}
    </div>
  );
};

export default Home;
