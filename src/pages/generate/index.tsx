/* eslint-disable @next/next/no-img-element */
import { useState } from "react";

import type { Metadata, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import { GithubPicker } from "react-color";

import { Input, FormGroup, Button } from "@/components/";
import { api } from "@/utils/api";

export const metadata: Metadata = {
  title: "Generate",
  description: "Generate",
  keywords: "Generate",
};

const GeneratePage: NextPage = () => {
  const [form, setForm] = useState({
    prompt: "",
    color: "",
  });

  //get credit balance
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const updateForm =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({
        ...prev,
        [key]: e.target.value,
      }));
    };

  const generateIcon = api.generate.generateIcon.useMutation({
    onSuccess: (data) => {
      // console.log("mutation finished", data.imageUrl);

      if (!data.imageUrl) return;

      setImageUrl(data.imageUrl);
    },
  });

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(form);

    generateIcon.mutate(form);

    setForm((prev) => ({ ...prev, prompt: ""}));
  };

  return (
    <>
      <Head>
        <title>Generar Iconos</title>
        <meta name="description" />
      </Head>

      <main className="container mx-auto mt-12 flex min-h-screen flex-col gap-4 sm:mt-24">
        <h1 className="text-4xl">Generate tus Iconos</h1>
        <p className="mb-12">Completa la forma para generar tus iconos</p>

        <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
          <h2 className="text-xl">
            1. Describe como quieres que se vea tu icono
          </h2>
          <FormGroup className="mb-12">
            <label>Prompt</label>
            <Input onChange={updateForm("prompt")} value={form.prompt} />
          </FormGroup>
          <h2 className="text-xl">2. Selecciona el color de tu icono</h2>
          <FormGroup>
            {/* <label className="flex gap-2 text-2xl">
              <Input type="radio" name="color" />
              Blue
            </label> */}
            <GithubPicker triangle="hide"onSwatchHover={(color) => {
              setForm((prev) => ({ ...prev, color: color.hex }));
            }}/>
          </FormGroup>
          <Button isLoading={generateIcon.isLoading}>Generar Iconos</Button>
        </form>

        {imageUrl && (
          <>
            <h2 className="text-xl">Tus Iconos</h2>
            <section className="grid grid-cols-4 gap-4">
              <Image
                className="my-2"
                src={imageUrl}
                alt="Generated Icon"
                width={100}
                height={100}
              />
            </section>
          </>
        )}
      </main>
    </>
  );
};

export default GeneratePage;
