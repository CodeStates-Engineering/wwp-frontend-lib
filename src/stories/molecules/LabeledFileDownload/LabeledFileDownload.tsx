import { FileDownload, Label, Tooltip } from "../../atoms";
import type { FileDownloadProps, LabelProps } from "../../atoms";
import scss from "./LabeledFileDownload.module.scss";
import { Download } from "react-feather";
import { cleanClassName } from "@utils";

export interface LabeledFileDownloadProps extends FileDownloadProps {
  children?: React.ReactNode;
  label?: boolean;
  labelDirection?: "row" | "column" | "row-reverse" | "column-reverse";
  labelText?: string;
  essential?: LabelProps["essential"];
  labelFontSize?: LabelProps["fontSize"];
  labelFontWeight?: LabelProps["fontWeight"];
  id?: string;
}
export function LabeledFileDownload({
  children,
  label = true,
  labelDirection = "column",
  labelText,
  essential,
  labelFontSize,
  labelFontWeight,
  width = "246px",
  id,
  ...fileDownloadProps
}: LabeledFileDownloadProps) {
  const labelProps: LabelProps = {
    essential,
    htmlFor: id,
    fontSize: labelFontSize,
    fontWeight: labelFontWeight,
    children: labelText || id,
    id: id ? `${id}-label` : undefined,
  };

  return (
    <div
      className={cleanClassName(
        `${scss.labeled_file_download_container} ${scss[labelDirection]}`
      )}
      style={{ width }}
    >
      {label ? (
        <div className={scss.label_container}>
          <Label {...labelProps} />
          {children ? <Tooltip>{children}</Tooltip> : null}
        </div>
      ) : null}
      <FileDownload {...fileDownloadProps} width="100%" />
    </div>
  );
}
