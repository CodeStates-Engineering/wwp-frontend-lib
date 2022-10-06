import { cleanClassName } from "@utils";
import scss from "./FileDownload.module.scss";
import { Download } from "react-feather";

export interface FileDownloadProps {
  fileName?: string;
  fileUrl?: string;
  width?: React.CSSProperties["width"];
  placeholder?: string;
}
export function FileDownload({
  fileName,
  fileUrl,
  width = "246px",
  placeholder = "파일이 존재하지 않습니다.",
}: FileDownloadProps) {
  const displayFileName = fileName || fileUrl?.split("/").pop() || placeholder;
  return (
    <div style={{ width }} className={scss.file_download}>
      <div className={scss.file_name}>{displayFileName}</div>
      <a
        href={fileUrl}
        download
        className={cleanClassName(
          `${scss.download_link} ${!fileUrl && scss.disabled}`
        )}
      >
        <Download />
      </a>
    </div>
  );
}
