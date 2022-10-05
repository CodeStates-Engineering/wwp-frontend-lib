import { useEffect, useState } from 'react';

export interface PaginationState {
  pageState: [number, (page: number) => void];
  PageSizeState: [number, (pageSize: number) => void];
}
export function usePaginationState(initialPage: number = 1, initialPageSize: number = 30) {
  const pageState = useState(initialPage),
    setPage = pageState[1];
  const PageSizeState = useState(initialPageSize),
    pageSize = PageSizeState[0];
  useEffect(() => setPage(initialPage), [pageSize, setPage, initialPage]);
  return {
    pageState,
    PageSizeState,
  };
}