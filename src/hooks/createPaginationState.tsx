import type { StateSetter } from './getPropsStore';

export interface PaginationState {
  pageSize: number;
  handlePageSizeChange: (pageSize: number) => void;
  currentPage: number;
  handleCurrentPageChange: (currentPage: number) => void;
}

export function createPaginationState<T extends PaginationState>(
  set: StateSetter<T>,
  initialPageSize: number = 30,
  initialCurrentPage: number = 1
): PaginationState {
  return {
    pageSize: initialPageSize,
    handlePageSizeChange: (pageSize) => set({ pageSize } as T),
    currentPage: initialCurrentPage,
    handleCurrentPageChange: (currentPage) => set({ currentPage } as T),
  };
}
