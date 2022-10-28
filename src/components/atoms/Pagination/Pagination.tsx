import scss from './Pagination.module.scss';
import { ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from 'react-feather';

export interface PaginationProps {
  totalPageCount?: number;
  currentPage?: number;
  onChangeCurrentPage?: (page: number) => void;
}

export function Pagination({
  totalPageCount = 1,
  currentPage = 1,
  onChangeCurrentPage,
}: PaginationProps) {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPageCount;
  const handleCurrentPageChange = (page: number) => () => onChangeCurrentPage?.(page);
  return (
    <nav className={scss.pagination}>
      <button
        className={scss.move_button}
        disabled={isFirstPage}
        onClick={handleCurrentPageChange(1)}
      >
        <ChevronsLeft />
      </button>
      <button
        className={scss.move_button}
        disabled={isFirstPage}
        onClick={handleCurrentPageChange(currentPage - 1)}
      >
        <ChevronLeft />
      </button>
      <div className={scss.page_number}>
        Page<span>{currentPage}</span> of <span>{totalPageCount}</span>
      </div>
      <button
        className={scss.move_button}
        disabled={isLastPage}
        onClick={handleCurrentPageChange(currentPage + 1)}
      >
        <ChevronRight />
      </button>
      <button
        className={scss.move_button}
        disabled={isLastPage}
        onClick={handleCurrentPageChange(totalPageCount)}
      >
        <ChevronsRight />
      </button>
    </nav>
  );
}
