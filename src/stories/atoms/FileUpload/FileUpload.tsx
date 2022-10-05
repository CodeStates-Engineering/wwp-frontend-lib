import { cleanClassName } from "@utils";
import scss from "./FileUpload.module.scss";
import { Download } from "react-feather";
import { useState } from "react";
export interface FileUploadProps {
  width?: React.CSSProperties["width"];
  placeholder?: string;
  url?: string;
  method?: "post" | "put";
  accept?: string;
}
export function FileUpload({
  width = "246px",
  placeholder = "파일을 업로드해주세요.",
  accept,
  ...restProps
}: FileUploadProps) {
  const [displayFileName, setDisplayFileName] = useState(placeholder);
  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayFileName("업로드 중입니다.");
    e.preventDefault();
    try {
      const [file] = e.target.files || [null];
      if (!file) throw new Error();
      const data = new FormData();
      data.append("file", file);
      if (process.env.BUILD_TYPE !== "storybook") {
        const axios = require("axios").default;
        await axios({
          ...restProps,
          data,
        });
      }
      setDisplayFileName(file.name);
    } catch (e) {
      setDisplayFileName("업로드에 실패했습니다.");
    }
  };
  return (
    <div style={{ width }} className={scss.file_upload}>
      <p className={scss.display_file_name}>{displayFileName}</p>
      <label className={scss.file_upload_button}>
        파일 선택
        <input type="file" onChange={onChange} accept={accept} />
      </label>
    </div>
  );
}
