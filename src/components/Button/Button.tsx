export interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  query: string;
  label: string;
}

export const Button: React.FC<ButtonProps> = (props, ...rest) => {
  return (
    <button type="button" className={`${props.query} `} onClick={props.onClick}>
      {props.label}
    </button>
  );
};
