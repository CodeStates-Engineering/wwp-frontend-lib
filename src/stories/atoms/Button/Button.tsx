import scss from "./Button.module.scss";
import { cleanClassName } from "@utils";
import { Link } from "react-router-dom";
import { omit } from "lodash-es";
import { useEffect, useState } from "react";
import type { IconProps } from "react-feather";

export interface ButtonProps
  extends Pick<
    React.ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement>,
    "onClick" | "className" | "type" | "children" | "disabled" | "name" | "id"
  > {
  theme?:
    | "wewin-blue600"
    | "gray200"
    | "white"
    | "wewin-blue100"
    | "wewin-peach500"
    | "clear";
  shape?: "rectangle" | "round" | "square" | "circle";
  fontSize?: "small" | "medium" | "large";
  width?: "small" | "medium" | "large"; //TODO: 제거 필요
  minWidth?: string;
  fitContainer?: boolean;
  fontWeight?: "normal" | "bold" | "boldest";
  to?: string;
  delay?: number;
  icon?: React.FunctionComponent<IconProps>;
}
export function Button({
  to,
  theme = "wewin-blue600",
  shape = "rectangle",
  type = "button",
  delay,
  minWidth,
  icon: Icon,
  ...restProps
}: ButtonProps) {
  const [isDelaying, setIsDelaying] = useState(!!delay);
  const [startDelaying, setStartDelaying] = useState(false);
  console.log(scss.button);
  useEffect(() => {
    if (delay) {
      setTimeout(() => setStartDelaying(true), 1000);
      setTimeout(() => setIsDelaying(false), 1000 + delay);
    }
  }, [setStartDelaying, setIsDelaying, delay]);

  const buttonProps = {
    ...restProps,
    disabled: restProps.disabled || isDelaying,
    children: (
      <div className={scss.button_contents}>
        {Icon ? (
          <div className={scss.button_wrap}>
            <Icon />
          </div>
        ) : undefined}
        {restProps.children}
      </div>
    ),
    className: cleanClassName(
      `${scss.button} ${scss["theme_" + theme]}
      ${scss["shape_" + shape]} 
      ${scss["font_size_" + restProps.fontSize]}
      ${scss["font_weight_" + restProps.fontWeight]}
      ${isDelaying && scss.delay_button}
      ${Icon && scss.icon_button_padding}
      ${restProps.fitContainer && scss.fit_container}
      ${restProps.className}`
    ),
    style: {
      minWidth,
    },
  };

  if (isDelaying && delay) {
    return (
      <button {...buttonProps} disabled type={type}>
        <div
          className={cleanClassName(
            `${scss.delaying_bar} ${startDelaying && scss.delaying}`
          )}
          style={{ transitionDuration: `${delay / 1000}s` }}
        />
        <div className={scss.delay_button_contents}>{buttonProps.children}</div>
      </button>
    );
  }
  if (to) return <Link {...omit(buttonProps, ["disabled", "name"])} to={to} />;
  return <button {...buttonProps} type={type} />;
}
