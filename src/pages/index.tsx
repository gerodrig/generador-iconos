import type { Metadata, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { PrimaryLinkButton } from "@/components";

// import { api } from "@/utils/api";

export const metadata: Metadata = {
  title: "Generador de Iconos",
  description: "Aplicaion para generar iconos",
};

function HeroBanner() {
  return (
    <section className="grid grid-cols-1 gap-12 px-8 mt-12 sm:mt-24 sm:grid-cols-2">
      <div className="flex flex-col gap-4">
        <h1 className="text-6xl">
          Genera iconos orginales con solo la descripcion
        </h1>
        <p className="text-2xl">Iconos generados con Inteligencia Artificial en segundos.</p>
        <PrimaryLinkButton href="/generate" className="self-start">Genera tus iconos</PrimaryLinkButton>
      </div>
      <Image
        src={"/banner.png"}
        width={400}
        height={300}
        alt="an image of 3d modeled chinchilla"
        className="order-first sm:order-last rounded-xl"
      />
    </section>
  );
}

const HomePage: NextPage = () => {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Generador de Iconos</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto flex flex-col items-center justify-center">
        <HeroBanner />
      </main>
    </>
  );
};

export default HomePage;
