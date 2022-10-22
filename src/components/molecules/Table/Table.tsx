import scss from './Table.module.scss';
import { Copy, Clipboard } from 'react-feather';
import {
  useState,
  Children,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react';
import { cleanClassName } from '../../../utils';
import { copyText } from '../../../utils';
import { ReactComponent as Logo } from '../../../assets/wewin_logo.svg';
import { Loading } from '../../atoms';

type Deployment = 'start' | 'center' | 'end';
interface FlexContainerProps {
  align?: Deployment;
  justify?: Deployment;
}

const RowExistedSetterContext = createContext<Dispatch<SetStateAction<boolean>>>(() => {});

export interface TableContainerProps {
  dataExisted?: boolean;
  loading?: boolean;
  invalid?: boolean;
  children?: React.ReactNode;
  maxWidth?: React.CSSProperties['maxWidth'];
  minWidth?: React.CSSProperties['minWidth'];
}
function Container({
  children,
  loading,
  invalid = false,
  minWidth,
  maxWidth,
}: TableContainerProps) {
  const [rowExisted, setRowExisted] = useState(true);
  const widthRange = { minWidth, maxWidth };
  return (
    <RowExistedSetterContext.Provider value={setRowExisted}>
      {loading ? (
        <section
          className={cleanClassName(`${scss.no_row_container} ${invalid && scss.invalid}`)}
          style={widthRange}
        >
          <Loading />
        </section>
      ) : (
        <>
          <table
            className={cleanClassName(
              `${scss.table_container} ${invalid && scss.invalid} ${!rowExisted && scss.hidden}`
            )}
            style={widthRange}
          >
            {children}
          </table>
          <section
            className={cleanClassName(
              `${scss.no_row_container} ${invalid && scss.invalid} ${rowExisted && scss.hidden}`
            )}
            style={widthRange}
          >
            <Logo />
            <span>No Row To Show</span>
          </section>
        </>
      )}
    </RowExistedSetterContext.Provider>
  );
}

export interface TableHeadProps {
  children?: React.ReactNode;
}
function Head({ children }: TableHeadProps) {
  return <thead className={scss.table_head}>{children}</thead>;
}

export interface TableRowProps {
  children?: React.ReactNode;
}
function Row({ children }: TableRowProps) {
  return <tr>{children}</tr>;
}

export interface TableTitleProps extends FlexContainerProps {
  children?: React.ReactNode;
}
function Title({ children, justify = 'center', align = 'center' }: TableTitleProps) {
  return (
    <th className={scss.table_row_item}>
      <div
        className={`${scss.table_title_contents} ${scss['justify_' + justify]} ${
          scss['align_' + align]
        }`}
      >
        {children}
      </div>
    </th>
  );
}

export interface TableBodyProps {
  children?: React.ReactNode;
}
function Body({ children }: TableBodyProps) {
  const setRowExisted = useContext(RowExistedSetterContext);
  const rowExisted = 0 < Children.count(children);

  useEffect(() => {
    setRowExisted(rowExisted);
  }, [rowExisted, setRowExisted]);
  return <tbody className={scss.table_body}>{children}</tbody>;
}

interface CopyButtonProps {
  children?: React.ReactNode;
  copyable?: boolean;
  visible: boolean;
}
function CopyButton(props: CopyButtonProps) {
  const { children, copyable, visible } = props;
  const [copied, setCopied] = useState(false);
  if (!copyable || !children) return <></>;
  return (
    <button
      className={cleanClassName(`${scss.copy_button} ${copied && scss.copied}`)}
      onClick={
        visible
          ? () => {
              const text = children.toString();
              copyText(text);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }
          : undefined
      }
    >
      {copied ? <Clipboard /> : <Copy />}
    </button>
  );
}

interface DataItemProps extends CopyButtonProps {
  hoverDirection?: 'left' | 'right';
  hoverHighlight?: boolean;
}
function DataItem({ hoverDirection, hoverHighlight = true, ...copyButtonProps }: DataItemProps) {
  const { children, copyable, visible } = copyButtonProps;
  if (!children) return <></>;
  return (
    <div
      className={cleanClassName(
        `${scss.table_data_contents} ${hoverDirection === 'left' ? scss.left : scss.right} ${
          visible ? scss.front : scss.back
        } ${visible && hoverHighlight && scss.hover_highlight} ${copyable && scss.copyable}`
      )}
    >
      {children}
      <CopyButton {...copyButtonProps} />
    </div>
  );
}

export type TableDataProps = Omit<DataItemProps, 'visible'> &
  FlexContainerProps & {
    resizable?: boolean;
  };
function Data({
  resizable,
  align = 'center',
  justify = 'center',
  ...dataItemProps
}: TableDataProps) {
  const { children } = dataItemProps;
  return (
    <td
      className={cleanClassName(
        `${scss.table_row_item} ${scss.table_data} ${resizable && scss.resizable}`
      )}
    >
      <div className={`${scss['align_' + align]} ${scss['justify_' + justify]}`}>
        {children && (
          <section className={scss.table_data_contents_container}>
            <DataItem {...dataItemProps} visible={true} />
            <DataItem {...dataItemProps} visible={false} />
          </section>
        )}
      </div>
    </td>
  );
}

export const Table = { Container, Row, Head, Body, Title, Data };
