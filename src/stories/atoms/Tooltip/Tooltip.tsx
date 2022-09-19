import scss from "./Tooltip.module.scss";
import { AlertCircle } from "react-feather";

export interface TooltipProps {
  children?: React.ReactNode;
}
export function Tooltip({ children }: TooltipProps) {
  return (
    <div className={scss.announcement_message_container}>
      <AlertCircle />
      <div className={scss.announcement_message}>{children}</div>
    </div>
  );
}
