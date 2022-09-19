import scss from './Pagination.module.scss';
import { ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from 'react-feather';
export interface PaginationProps {
  pageCount: number;
  pageState: [number, (page: number) => void];
}
export function Pagination({ pageCount, pageState }: PaginationProps) {
  const [page, setPage] = pageState;
  const isFirstPage = page === 1;
  const isLastPage = page === pageCount;
  const packagedSetCurrentPage = (num: number) => setPage(num);
  return (
    <nav className={scss.pagination}>
      <button
        className={scss.move_button}
        disabled={isFirstPage}
        onClick={() => packagedSetCurrentPage(1)}
      >
        <ChevronsLeft />
      </button>
      <button
        className={scss.move_button}
        disabled={isFirstPage}
        onClick={() => packagedSetCurrentPage(page - 1)}
      >
        <ChevronLeft />
      </button>
      <div className={scss.page_number}>
        Page<span>{page}</span> of <span>{pageCount}</span>
      </div>
      <button
        className={scss.move_button}
        disabled={isLastPage}
        onClick={() => packagedSetCurrentPage(page + 1)}
      >
        <ChevronRight />
      </button>
      <button
        className={scss.move_button}
        disabled={isLastPage}
        onClick={() => packagedSetCurrentPage(pageCount)}
      >
        <ChevronsRight />
      </button>
    </nav>
  );
}
