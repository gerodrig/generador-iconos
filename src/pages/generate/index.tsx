/* eslint-disable @next/next/no-img-element */
import { useState } from "react";

import type { Metadata, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

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

    generateIcon.mutate({
      prompt: form.prompt,
    });

    setForm({ prompt: "" });
  };

  return (
    <>
      <Head>
        <title>Generate</title>
        <meta name="description" />
      </Head>

      <main className="flex min-h-screen flex-col items-center justify-center">

        <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
          <FormGroup>
            <label>Prompt</label>
            <Input onChange={updateForm("prompt")} value={form.prompt} />
          </FormGroup>
          <Button>Generate Icons</Button>
        </form>
        {imageUrl && (
          <Image
            className="my-2"
            src={imageUrl}
            alt="Generated Icon"
            width={100}
            height={100}
          />
        )}
      </main>
    </>
  );
};

export default GeneratePage;
