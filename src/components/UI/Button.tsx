interface Props {
    children?: React.ReactNode;
    onClick?: () => (void | Promise<void>);
}

export const Button = ({children,  onClick}: Props ) => {
  return (
    <button className="rounded bg-blue-400 px-4 py-2 hover:bg-blue-500" onClick={onClick}>
    { children }
  </button>
  )
}
