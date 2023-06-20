interface Props {
    text?: string;
    onClick?: () => void;
}

export const Button = ({text = 'Submit', onClick}: Props ) => {
  return (
    <button className="rounded bg-blue-400 px-4 py-2 hover:bg-blue-500" onClick={onClick}>
    { text }
  </button>
  )
}
