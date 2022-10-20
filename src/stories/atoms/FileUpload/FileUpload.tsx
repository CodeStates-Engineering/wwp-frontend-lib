import { cleanClassName } from '../../../utils';
import scss from './FileUpload.module.scss';
import { useParentState } from '../../../hooks';
import { X } from 'react-feather';
export type WebFile = {
  name?: string;
  url?: string;
};

export interface FileUploadProps {
  width?: React.CSSProperties['width'];
  placeholder?: string;
  accept?: string;
  theme?: 'box' | 'linear';
  modifier?: 'system' | 'readonly' | 'user';
  instantUpload?: boolean;
  invalid?: boolean;
  disabled?: boolean;
  value?: WebFile | File;
  onChange?: (file?: File) => void;
  id?: string;
  valueSync?: boolean;
}

export function FileUpload({
  width = '246px',
  placeholder = '파일을 업로드해주세요.',
  accept,
  theme = 'box',
  onChange,
  modifier = 'user',
  invalid = false,
  disabled = false,
  value,
  id,
  valueSync,
}: FileUploadProps) {
  const [file, setFile] = useParentState(() => value, [value], valueSync),
    fileName = file?.name || placeholder;

  const fileUrl = file instanceof File ? URL.createObjectURL(file) : file?.url;

  const isFilled = !(fileName === placeholder);
  const isDisabled = modifier === 'user' ? disabled : true;

  const handleFileChange = (file?: File) => {
    setFile?.(file);
    onChange?.(file);
  };

  const FileUploadButton = ({ children }: { children: React.ReactNode }) =>
    isDisabled ? (
      <button className={scss.file_upload_button} disabled>
        {children}
      </button>
    ) : (
      <>
        {isFilled && (
          <button
            className={scss.delete_file_button}
            type="button"
            onClick={() => handleFileChange(undefined)}
          >
            <X />
          </button>
        )}
        <label className={scss.file_upload_button}>{children}</label>
      </>
    );

  return (
    <div
      id={id}
      style={{ width }}
      className={cleanClassName(
        `${scss.file_upload} ${scss[theme]} ${invalid && scss.invalid} ${isFilled && scss.filled} ${
          fileUrl && scss.link
        } ${isDisabled && scss.disabled} ${modifier && scss[modifier]}`
      )}
    >
      <div className={scss.display_file_name}>
        <a href={isDisabled ? undefined : fileUrl} download>
          {fileName}
        </a>
      </div>
      <FileUploadButton>
        파일 선택
        <input
          type="file"
          accept={accept}
          onChange={(e) => {
            e.preventDefault();
            const [file] = e.target.files || [undefined];
            handleFileChange(file);
          }}
        />
      </FileUploadButton>
    </div>
  );
}
