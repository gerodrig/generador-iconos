import { PrimaryLink } from "./PrimaryLink";
import { Button } from "./Button";
import { signIn, signOut, useSession } from "next-auth/react";

import { useBuyCredits } from "@/hooks/useBuyCredits";

import { api } from "@/utils/api";

export const Header = () => {
  const session = useSession();
  const { buyCredits } = useBuyCredits();

  const credits = api.user.getCredits.useQuery();

  const isLoggedIn = !!session.data;


  return (
    <header className="container mx-auto flex h-16 items-center justify-between px-4 dark:bg-gray-800">
      <PrimaryLink href={"/"}>Generador de Iconos</PrimaryLink>
      <ul className="flex gap-4">
        <li>
          <PrimaryLink href={"/generate"}>Generar</PrimaryLink>
        </li>
        <li>
          <PrimaryLink href={"/comunidad"}>Comunidad</PrimaryLink>
        </li>
        {isLoggedIn && (
          <li>
            <PrimaryLink href={"/collection"}>Coleccion</PrimaryLink>
          </li>
        )}
      </ul>
      <ul className="flex gap-4">
        {isLoggedIn ? (
          <>
          <div className="flex items-center text-yellow-500">
          {credits.data} Creditos
          </div>
            <li>
              <Button
                onClick={() => {
                  buyCredits().catch(console.error);
                }}
              >
                Buy Credits
              </Button>
            </li>
            <li>
              <Button
                variant="secondary"
                onClick={() => {
                  signOut().catch(console.error);
                }}
              >
                Logout
              </Button>
            </li>
          </>
        ) : (
          <Button
            onClick={() => {
              signIn().catch(console.error);
            }}
          >
            Login
          </Button>
        )}
      </ul>
    </header>
  );
};
