import clsx from "clsx";
import { Spinner } from "./Spinner";

interface Props {
  variant?: "primary" | "secondary";
  isLoading?: boolean;
}

export const Button = (
  {variant, isLoading = false, ...props}: React.ComponentPropsWithoutRef<"button"> & Props
) => {
  const color =
    variant === "primary" || !variant
      ? "bg-blue-400 hover:bg-blue-500 disabled:bg-gray-600"
      : "bg-gray-400 hover:bg-gray-500 disabled:bg-black";
  return (
    <button {...props} disabled={isLoading} className={clsx("rounded px-4 py-2 flex gap-2 items-center justify-center", color)}>
      {isLoading && <Spinner />}
      {props.children}
    </button>
  );
};
