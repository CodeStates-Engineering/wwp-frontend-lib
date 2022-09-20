import scss from "./PaginationWithPageSize.module.scss";
import { Pagination, Selectbox } from "../../atoms";
export interface PaginationWithPageSizeProps {
  totalItemCount?: number;
  pageSizeOptions?: number[];
  paginationState: {
    pageState: [number, (page: number) => void];
    PageSizeState: [number, (pageSize: number) => void];
  };
}

const PAGE_SIZE_TEXT = "개씩 보기";

export function PaginationWithPageSize({
  paginationState,
  totalItemCount = 0,
  pageSizeOptions = [10, 20, 30, 50],
}: PaginationWithPageSizeProps) {
  const { pageState, PageSizeState } = paginationState;
  const [pageSize, setPageSize] = PageSizeState;
  const pageCount = Math.ceil(totalItemCount / pageSize) || 1;
  const pagenationProps = {
    pageCount,
    pageState,
  };
  return (
    <div className={scss.pagination_container}>
      <Pagination {...pagenationProps} />
      <Selectbox
        options={pageSizeOptions.map((option) => option + PAGE_SIZE_TEXT)}
        onChange={(option) =>
          setPageSize(Number(option?.replace(PAGE_SIZE_TEXT, "")))
        }
        value={pageSize + PAGE_SIZE_TEXT}
        className={scss.page_size_selectbox}
        openDirection={["up", "left"]}
      />
    </div>
  );
}
