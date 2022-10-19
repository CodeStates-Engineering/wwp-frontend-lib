import { useDepsState } from '.';
import { useMemo } from 'react';

export type CustomFile =
  | File
  | {
      url?: string;
      name?: string;
    };

export function useFileState(value?: CustomFile) {
  const [file, setFile] = useDepsState(() => value, [value]);
  const fileState = useMemo(
    () => ({
      file,
      setFile,
      uploadFile: async (method: 'put' | 'post' = 'put', url: string) => {
        if (file instanceof File) {
          const data = new FormData();
          data.append('file', file);
          const axios = require('axios').default;
          await axios({
            url,
            method,
            data,
          });
        }
      },
    }),
    [file, setFile]
  );
  return fileState;
}

export type FileState = ReturnType<typeof useFileState>;
