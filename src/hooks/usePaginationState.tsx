import { useEffect, useState } from 'react';
//test45t
export function usePaginationState(initialPage: number = 1, initialPageSize: number = 30) {
  const pageState = useState(initialPage),
    setPage = pageState[1];
  const pageSizeState = useState(initialPageSize),
    pageSize = pageSizeState[0];
  useEffect(() => setPage(initialPage), [pageSize, setPage, initialPage]);
  return {
    pageState,
    pageSizeState,
  };
}

export type PaginationState = ReturnType<typeof usePaginationState>;
