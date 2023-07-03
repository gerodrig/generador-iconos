import Link, { type LinkProps } from "next/link";
import clsx from "clsx";

export const PrimaryLinkButton = (
  props: LinkProps & { children: React.ReactNode; className?: string }
) => {
  return (
    <Link
    {...props}
      className={clsx(
        "rounded bg-blue-400 px-4 py-2 hover:bg-blue-500",
        props.className
      )}
    >
      {props.children}
    </Link>
  );
};
