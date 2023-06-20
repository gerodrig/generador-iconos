import type { Metadata, NextPage } from "next";
import Head from "next/head";

import { Input, FormGroup } from "@/components/UI/";
import { useState } from "react";
import { api } from "@/utils/api";

export const metadata: Metadata = {
  title: "Generate",
  description: "Generate",
  keywords: "Generate",
};

const GeneratePage: NextPage = () => {
  const [ form, setForm ] = useState({
    prompt: "",
  });

  const updateForm = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  const generateIcon = api.generate.generateIcon.useMutation({
    onSuccess: (data) => {
      console.log('mutation finished', data);
    }
  });

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(form);

    // TODO: Submit the form data to the backend
    generateIcon.mutate({
      prompt: form.prompt,
    });
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
            <Input onChange={updateForm('prompt')} value={form.prompt}/>
          </FormGroup>
          <button className="rounded bg-blue-400 px-4 py-2 hover:bg-blue-500">
            Submit
          </button>
        </form>
      </main>
    </>
  );
};

export default GeneratePage;
