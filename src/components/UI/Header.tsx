import { PrimaryLink } from "./PrimaryLink";
import { Button } from "./Button";
import { signIn, signOut, useSession } from "next-auth/react";

import { useBuyCredits } from "@/hooks/useBuyCredits";

export const Header = () => {
  const session = useSession();
  const { buyCredits } = useBuyCredits();

  const isLoggedIn = !!session.data;
  return (
    <header className="container mx-auto flex h-16 items-center justify-between px-4 dark:bg-gray-800">
      <PrimaryLink href={"/"}>Icon Generator</PrimaryLink>
      <ul>
        <li>
          <PrimaryLink href={"/generate"}>Generate</PrimaryLink>
        </li>
      </ul>
      <ul className="flex gap-4">
        {isLoggedIn ? (
          <>
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
