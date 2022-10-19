import { cleanClassName } from '../../../utils';
import scss from './FileUpload.module.scss';
import { useDepsState, useParentState, CustomFile } from '../../../hooks';

export interface FileUploadProps {
  width?: React.CSSProperties['width'];
  placeholder?: string;
  accept?: string;
  theme?: 'box' | 'linear';
  modifier?: 'system' | 'readonly' | 'user';
  instantUpload?: boolean;
  invalid?: boolean;
  disabled?: boolean;
  value?: CustomFile;
  onChange?: (file?: File) => void;
  id?: string;
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
}: FileUploadProps) {
  const [file, setFile] = useParentState(() => value, [value]);
  const [displayFileName, setDisplayFileName] = useDepsState(
    () => file?.name ?? placeholder,
    [file]
  );

  const fileUrl = file instanceof File ? URL.createObjectURL(file) : file?.url;

  const UPLOAD_FAILED_MESSAGE = '업로드에 실패했습니다.';
  const UPLOAD_PROGRESS_MESSAGE = '업로드 중입니다.';

  const isUploadFailed = displayFileName === UPLOAD_FAILED_MESSAGE;
  const isUploadProgress = displayFileName === UPLOAD_PROGRESS_MESSAGE;
  const isFilled = !(displayFileName === placeholder) && !isUploadProgress && !isUploadFailed;
  const isDisabled = modifier === 'user' ? disabled : true;

  const FileUploadButton = ({ children }: { children: React.ReactNode }) =>
    isDisabled ? (
      <button className={scss.file_upload_button} disabled>
        {children}
      </button>
    ) : (
      <label className={scss.file_upload_button}>{children}</label>
    );

  const handleFileChange = (file?: File) => {
    setFile?.(file);
    onChange?.(file);
  };

  return (
    <div
      id={id}
      style={{ width }}
      className={cleanClassName(
        `${scss.file_upload} ${scss[theme]} ${(isUploadFailed || invalid) && scss.invalid} ${
          isFilled && scss.filled
        } ${isUploadProgress && scss.progress} ${isDisabled && scss.disabled} ${
          modifier && scss[modifier]
        }`
      )}
    >
      <div className={scss.display_file_name}>
        <a href={isDisabled ? undefined : fileUrl} download>
          {displayFileName}
        </a>
      </div>
      <FileUploadButton>
        파일 선택
        <input
          type="file"
          accept={accept}
          onClick={() => handleFileChange(undefined)}
          onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
            e.preventDefault();
            try {
              setDisplayFileName?.(UPLOAD_PROGRESS_MESSAGE);
              const [file] = e.target.files || [undefined];
              handleFileChange(file);
            } catch (e) {
              setDisplayFileName(UPLOAD_FAILED_MESSAGE);
            }
          }}
        />
      </FileUploadButton>
    </div>
  );
}
