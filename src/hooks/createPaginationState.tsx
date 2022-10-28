import type { StateSetter } from './getPagePropsStore';

export interface PaginationState {
  pageSize: number;
  handlePageSizeChange: (pageSize: number) => void;
  currentPage: number;
  handleCurrentPage: (currentPage: number) => void;
}

export function createPaginationState(
  set: StateSetter<PaginationState>,
  initialPageSize: number = 30,
  initialCurrentPage: number = 1
): PaginationState {
  return {
    pageSize: initialPageSize,
    handlePageSizeChange: (pageSize) => set({ pageSize }),
    currentPage: initialCurrentPage,
    handleCurrentPage: (currentPage) => set({ currentPage }),
  };
}
