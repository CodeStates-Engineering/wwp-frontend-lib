import { cleanClassName } from '@utils';
import scss from './FileUpload.module.scss';
import { useDepsState } from '@hooks';

export interface FileUploadProps {
  width?: React.CSSProperties['width'];
  placeholder?: string;
  url?: string;
  method?: 'post' | 'put';
  accept?: string;
  theme?: 'box' | 'linear';
  modifier?: 'system' | 'readonly' | 'user';
  instantUpload?: boolean;
  invalid?: boolean;
  disabled?: boolean;
  value?: string;
  onChange?: (file: FileUploadProps['value']) => void;
  id?: string;
}

export function FileUpload({
  width = '246px',
  placeholder = '파일을 업로드해주세요.',
  accept,
  theme = 'box',
  onChange,
  modifier = 'user',
  instantUpload = true,
  invalid = false,
  disabled = false,
  value,
  id,
  url,
  method = 'put',
}: FileUploadProps) {
  const [displayFileName, setDisplayFileName] = useDepsState(
    () => value ?? placeholder,
    [value, placeholder]
  );

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
        <span>{displayFileName}</span>
      </div>
      <FileUploadButton>
        파일 선택
        <input
          type="file"
          accept={accept}
          onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
            e.preventDefault();
            setDisplayFileName(placeholder);
            try {
              const [file] = e.target.files || [undefined];
              onChange?.(file ? value ?? file.name : undefined);
              if (!file) return;
              setDisplayFileName(UPLOAD_PROGRESS_MESSAGE);
              const data = new FormData();
              data.append('file', file);
              if (process.env.BUILD_TYPE !== 'storybook' && instantUpload) {
                const axios = require('axios').default;
                await axios({
                  url,
                  method,
                  data,
                });
              }
              setDisplayFileName(file.name);
            } catch (e) {
              setDisplayFileName(UPLOAD_FAILED_MESSAGE);
            }
          }}
        />
      </FileUploadButton>
    </div>
  );
}
