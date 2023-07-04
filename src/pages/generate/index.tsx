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

const shapes = ["cuadrado", "circular", "redondo"];

const GeneratePage: NextPage = () => {
  const [form, setForm] = useState({
    prompt: "",
    color: "#004dcf",
    shape: "",
    numberOfIcons: 1,
  });

  //get credit balance
  const [imagesUrl, setImagesUrl] = useState<{ imageUrl: string }[]>([]);

  const updateForm =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({
        ...prev,
        [key]: e.target.value,
      }));
    };

  const generateIcon = api.generate.generateIcon.useMutation({
    onSuccess: (data) => {
      setImagesUrl(data);
    },
  });

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(form);

    generateIcon.mutate({
      ...form,
      numberOfIcons: Number(form.numberOfIcons),
    });

    setForm((prev) => ({ ...prev, prompt: "" }));
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
          <h2 className="text-2xl">
            1. Describe como quieres que se vea tu icono
          </h2>
          <FormGroup className="mb-12">
            <label>Prompt</label>
            <Input
              required
              onChange={updateForm("prompt")}
              value={form.prompt}
            />
          </FormGroup>
          <h2 className="text-2xl">2. Selecciona el color de tu icono</h2>
          <FormGroup className="mb-12">
            {/* <label className="flex gap-2 text-2xl">
              <Input type="radio" name="color" />
              Blue
            </label> */}
            <GithubPicker
              triangle="hide"
              color={form.color}
              onSwatchHover={(color) => {
                setForm((prev) => ({ ...prev, color: color.hex }));
              }}
              styles={{ default: { card: { background: "gray" } } }}
            />
          </FormGroup>

          <h2 className="text-2xl">3. Selecciona la forma de tu icono</h2>
          <FormGroup className="mb-12">
            {shapes.map((shape) => (
              <label key={shape} className="flex gap-2 text-xl">
                <Input
                  type="radio"
                  name="shape"
                  checked={form.shape === shape}
                  onChange={updateForm("shape")}
                  required
                />
                {shape}
              </label>
            ))}
          </FormGroup>

          <h2 className="text-2xl">
            4. Selecciona el numero de iconos que deseas generar (1 credito
            equivale a 1 icono)
          </h2>
          <FormGroup className="mb-12">
            <label>Numero de Iconos</label>
            <Input
              inputMode="numeric"
              type="number"
              pattern="[1-9]|10"
              onChange={updateForm("numberOfIcons")}
              required
              value={form.numberOfIcons}
            />
          </FormGroup>

          <Button isLoading={generateIcon.isLoading}>Generar Iconos</Button>
        </form>

        {imagesUrl.length > 0 && (
          <>
            <h2 className="text-xl">Tus Iconos</h2>
            <section className="grid grid-cols-4 gap-4">
              {imagesUrl.map(({ imageUrl }, index) => (
                <Image
                  key={index}
                  className="my-2"
                  src={imageUrl}
                  alt="Generated Icon"
                  width={100}
                  height={100}
                />
              ))}
            </section>
          </>
        )}
      </main>
    </>
  );
};

export default GeneratePage;
