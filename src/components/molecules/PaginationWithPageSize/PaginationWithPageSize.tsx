import scss from './PaginationWithPageSize.module.scss';
import { Pagination, Selectbox } from '../../atoms';
import type { PaginationProps } from '../../atoms';

export interface PaginationWithPageSizeProps extends Omit<PaginationProps, 'totalPageCount'> {
  totalItemCount?: number;
  pageSize?: number;
  onChangePageSize?: (pageSize: number) => void;
  pageSizeOptions?: number[];
}

export function PaginationWithPageSize({
  totalItemCount = 1,
  pageSize = 30,
  onChangePageSize,
  pageSizeOptions = [10, 20, 30, 50],
  ...restProps
}: PaginationWithPageSizeProps) {
  const PAGE_SIZE_TEXT = '개씩 보기';
  const paginationProps: PaginationProps = {
    ...restProps,
    totalPageCount: Math.ceil(totalItemCount / pageSize),
  };

  return (
    <div className={scss.pagination_container}>
      <Pagination {...paginationProps} />
      <Selectbox
        options={pageSizeOptions.map((option) => ({
          value: option,
          label: `${option}${PAGE_SIZE_TEXT}`,
        }))}
        onChange={onChangePageSize}
        width="137px"
        value={pageSize}
        openDirection={['up', 'left']}
        valueSync
      />
    </div>
  );
}
