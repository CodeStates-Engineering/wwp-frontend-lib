import scss from './InputDescription.module.scss';

export interface InputDescriptionProps {
  children?: React.ReactNode;
  visible?: boolean;
  theme?: 'default' | 'error';
}

export function InputDescription({ children, visible, theme = 'default' }: InputDescriptionProps) {
  return (
    <div className={`${scss.input_description} ${scss[theme]}`}>{visible && <p>{children}</p>}</div>
  );
}
