import { cleanClassName } from "@utils";
import { ReactComponent as Logo } from "../../../assets/wewin_logo.svg";
import scss from "./Loading.module.scss";
export function Loading({ className }: { className?: string }) {
  return (
    <div className={cleanClassName(`${scss.loading_container} ${className}`)}>
      <Logo className={scss.logo_size} />
      <div className={scss.loading_wrap}>
        <div className={scss.loading}></div>
      </div>
    </div>
  );
}
