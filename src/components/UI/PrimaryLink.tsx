import Link, { type LinkProps } from "next/link";



export const PrimaryLink = (props: LinkProps & {children: React.ReactNode}) => {
  return (
    <Link className="hover:text-cyan-500" {...props}>{props.children}</Link>
  )
}
