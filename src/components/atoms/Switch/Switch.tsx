import scss from './Switch.module.scss';
import { useParentState } from '../../../hooks';
import { cleanClassName } from '../../../utils';

export interface SwitchProps {
  value?: boolean;
  onChange?: (value: boolean) => void;
  id?: string;
  className?: string;
  valueSync?: boolean;
}
export function Switch({ className, onChange, id, value, valueSync }: SwitchProps) {
  const [turendOn, setTurendOn] = useParentState(() => !!value, [value], valueSync);

  return (
    <button
      className={cleanClassName(`${scss.switch} ${scss[turendOn ? 'on' : 'off']} ${className}`)}
      id={id}
      type="button"
    >
      <div className={scss.circle} />
      <input
        name={id}
        type="checkbox"
        className={scss.switch_element}
        checked={turendOn}
        onChange={(e) => {
          const { checked } = e.target;
          setTurendOn?.(checked);
          onChange?.(checked);
        }}
      />
    </button>
  );
}
