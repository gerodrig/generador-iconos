import clsx from 'clsx';

interface Props {
    children?: React.ReactNode;
    onClick?: () => (void | Promise<void>);
    variant?: 'primary' | 'secondary';
}

export const Button = ({variant = 'primary', children,  onClick}: Props ) => {

  const color = variant === 'primary' ? 'bg-blue-400 hover:bg-blue-500' : 'bg-gray-400 hover:bg-gray-500';
  return (
    <button className={clsx("rounded px-4 py-2", color)} onClick={onClick}>
    { children }
  </button>
  )
}
