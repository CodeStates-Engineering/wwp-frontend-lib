import { cleanClassName } from '../../../utils';
import scss from './FileDownload.module.scss';
import { Download } from 'react-feather';

export interface FileDownloadProps {
  id?: string;
  value?: {
    label?: string;
    url?: string;
  };
  width?: React.CSSProperties['width'];
  placeholder?: string;
  onChange?: (value: FileDownloadProps['value']) => void;
}
export function FileDownload({
  id,
  value,
  width = '246px',
  placeholder = '파일이 존재하지 않습니다.',
  onChange,
}: FileDownloadProps) {
  const { label, url } = value || {};
  const displayFileName = label || url?.split('/').pop() || placeholder;
  return (
    <div style={{ width }} className={scss.file_download} id={id}>
      <div className={scss.file_name}>{displayFileName}</div>
      <a
        href={url}
        download={label}
        className={cleanClassName(`${scss.download_link} ${!value?.url && scss.disabled}`)}
        onClick={() => {
          onChange?.(value);
        }}
      >
        <Download />
      </a>
    </div>
  );
}
