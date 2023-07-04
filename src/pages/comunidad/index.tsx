
import type { Metadata, NextPage } from "next";
import Image from "next/image";

import { api } from "@/utils/api";

export const metadata: Metadata = {
  title: "Iconos de la comunidad",
  description: "Iconos de la comunidad",
};

const CollectionPage: NextPage = () => {

    const icons = api.icons.getCommunityIcons.useQuery();

  return (
      <main className="container mx-auto mt-12 flex min-h-screen flex-col gap-4 sm:mt-24">
        <h1 className="text-4xl">Iconos de la comunidad</h1>
        <ul className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
          
            {icons.data?.map((icon) => (
              <li key={icon.id}>
                <Image
                  // src={icon.id}
                  src={'/banner.png'}
                  className="w-full rounded-lg"
                  alt={icon.prompt ?? "an image of an icon" }
                  width={100}
                  height={100}
                />
              </li>
            ))
            }
        </ul>
      </main>
    
  );
};

export default CollectionPage;
