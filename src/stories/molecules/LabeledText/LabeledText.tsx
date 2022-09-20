import { cleanClassName } from "@utils";
import type React from "react";
import { Label, LabelProps, Tooltip } from "../../atoms";
import scss from "./LabeledText.module.scss";

export interface LabeledTextProps {
  value?: string;
  direction?: "row" | "column" | "row-reverse" | "column-reverse";
  placeholder?: string;
  fitContainer?: boolean;
  labelText?: string;
  essential?: LabelProps["essential"];
  labelFontSize?: LabelProps["fontSize"];
  labelFontWeight?: LabelProps["fontWeight"];
  children?: React.ReactNode;
  className?: string;
  id: string;
}
export function LabeledText({
  children,
  id,
  value,
  direction = "column",
  labelFontSize,
  labelFontWeight,
  ...restProps
}: LabeledTextProps) {
  return (
    <div
      className={cleanClassName(
        `${scss.labeled_text_container} ${scss[direction]} ${
          restProps.fitContainer && scss.fit_container
        }`
      )}
      id={id}
    >
      <div className={scss.label_container}>
        <Label
          fontSize={labelFontSize}
          fontWeight={labelFontWeight}
          essential={restProps.essential}
        >
          {restProps.labelText || id}
        </Label>
        {children ? <Tooltip>{children}</Tooltip> : undefined}
      </div>
      <div className={cleanClassName(`${scss.text} ${restProps.className}`)}>
        {value ? (
          <span>{value}</span>
        ) : (
          <span className={scss.placeholder}>{restProps.placeholder}</span>
        )}
      </div>
    </div>
  );
}
