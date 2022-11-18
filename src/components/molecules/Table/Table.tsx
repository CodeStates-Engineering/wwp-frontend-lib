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
  createElement,
  useMemo,
} from 'react';
import { cleanClassName } from '../../../utils';
import { copyText } from '../../../utils';
import { ReactComponent as Logo } from '../../../assets/wewin_logo.svg';
import { Loading } from '../../atoms';
import { isValidElement } from 'react';
import { Modal } from '../Modal/Modal';
type Deployment = 'start' | 'center' | 'end';

export interface TableContainerProps extends ChildrenProps {
  dataExisted?: boolean;
  loading?: boolean;
  invalid?: boolean;
  maxWidth?: React.CSSProperties['maxWidth'];
  minWidth?: React.CSSProperties['minWidth'];
  children?: React.ReactNode;
}

export interface TableHeadProps {
  children?: React.ReactNode;
}

export interface TableRowProps {
  children?: React.ReactNode;
}

export interface TableBodyProps {
  children?: React.ReactNode;
}

interface DataItemProps {
  hoverDirection?: 'left' | 'right';
  hoverHighlight?: boolean;
  visible?: boolean;
  children?: React.ReactNode;
}
function DataItem({ hoverDirection, hoverHighlight = true, children, visible }: DataItemProps) {
  if (!children) return <></>;
  return (
    <div
      className={cleanClassName(
        `${scss.table_data_contents} ${hoverDirection === 'left' ? scss.left : scss.right} ${
          visible ? scss.front : scss.back
        } ${visible && hoverHighlight && scss.hover_highlight}`
      )}
    >
      {children}
    </div>
  );
}

export type TableDataProps = Omit<DataItemProps, 'visible'>;

//TODO:

interface ChildrenProps {
  children?: React.ReactNode;
}

interface TableConfig {
  maxWidth?: React.CSSProperties['maxWidth'];
  minWidth?: React.CSSProperties['minWidth'];
  align?: 'left' | 'center' | 'right';
  hoverHighlight?: boolean;
  summarized?: boolean;
}

export interface TableProps extends ChildrenProps {
  loading?: boolean;
  invalid?: boolean;
  emptyHeight?: React.CSSProperties['height'];
  config?: {
    [name: string]: TableConfig;
  };
}

const TableContext = createContext<
  Omit<TableProps, 'children' | 'invalid'> & {
    setHasRow?: Dispatch<SetStateAction<boolean>>;
  }
>({});
export interface TableTitleProps {}
function Container({ children, invalid, emptyHeight = '100%', ...restProps }: TableProps) {
  const [hasRow, setHasRow] = useState(false);
  const tableContext = { ...restProps, setHasRow };
  return (
    <TableContext.Provider value={tableContext}>
      <table
        className={scss.container}
        style={
          hasRow
            ? undefined
            : {
                height: emptyHeight,
              }
        }
      >
        {children}
      </table>
    </TableContext.Provider>
  );
}

function Head(props: ChildrenProps) {
  return <thead {...props} className={scss.head} />;
}

function Body({ children }: ChildrenProps) {
  const { loading, setHasRow } = useContext(TableContext);
  const hasRow = !!Children.toArray(children).length && !loading;
  console.log(hasRow);
  useMemo(() => {
    setHasRow?.(hasRow);
  }, [hasRow]);

  return (
    <tbody className={scss.body}>
      {hasRow ? (
        children
      ) : (
        <tr>
          <td>
            <div className={scss.empty_wrap}>
              {loading ? (
                <Loading />
              ) : (
                <>
                  <Logo />
                  No Row to Show
                </>
              )}
            </div>
          </td>
        </tr>
      )}
    </tbody>
  );
}

function Row(props: ChildrenProps) {
  return <tr {...props} className={scss.row} />;
}

interface RowItemProps extends ChildrenProps {
  name?: string;
}

function Title({ children, name }: RowItemProps) {
  const { config } = useContext(TableContext);
  const {
    align = 'center',
    maxWidth = 'unset',
    minWidth = 'unset',
  } = config && name ? config[name] : {};

  return (
    <th
      style={{
        maxWidth,
        minWidth,
      }}
      className={`${scss.title} ${scss[align]}`}
    >
      {children}
    </th>
  );
}

function Data({ children, name }: RowItemProps) {
  const { config } = useContext(TableContext);
  const [modalOpened, setModalOpened] = useState(false);
  const {
    hoverHighlight = true,
    summarized = false,
    align = 'center',
    ...style
  } = config && name ? config[name] : {};
  return (
    <td
      style={style}
      className={cleanClassName(`${scss.data}`)}
      onClick={() => setModalOpened(true)}
    >
      <div
        className={cleanClassName(
          `${scss[align]} ${hoverHighlight && scss.hover_hightlight} ${
            summarized && scss.summearized
          }`
        )}
      >
        {children}
      </div>
      {summarized && (
        <Modal
          opened={modalOpened}
          modalType="none"
          closeButton={false}
          onClose={() => setModalOpened(false)}
        >
          {children}
        </Modal>
      )}
    </td>
  );
}

export const Table = { Container, Row, Head, Body, Title, Data };
