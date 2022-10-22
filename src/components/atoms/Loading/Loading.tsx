import { cleanClassName } from '../../../utils';
import { ReactComponent as Logo } from '../../../assets/wewin_logo.svg';
import scss from './Loading.module.scss';

export interface LoadingProps {
  fitContainer?: boolean;
}
export function Loading({ fitContainer }: LoadingProps) {
  return (
    <div
      className={cleanClassName(`${scss.loading_container} ${fitContainer && scss.fit_container}`)}
    >
      <Logo className={scss.logo_size} />
      <div className={scss.loading_wrap}>
        <div className={scss.loading}></div>
      </div>
    </div>
  );
}
