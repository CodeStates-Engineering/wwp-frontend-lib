import scss from "./Table.module.scss";
import { Copy, Clipboard } from "react-feather";
import {
  useState,
  Children,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { cleanClassName } from "@utils";
import { copyText } from "@utils";
import { ReactComponent as Logo } from "@assets/wewin_logo.svg";
import { Loading } from "../../atoms";

type Deployment = "start" | "center" | "end";
interface FlexContainerProps {
  align?: Deployment;
  justify?: Deployment;
}

interface TableCommonProps {
  className?: string;
  children?: React.ReactNode;
}
interface TableContainerProps extends TableCommonProps {
  dataExisted?: boolean;
  loading?: boolean;
  invalid?: boolean;
}
interface TableTitleProps extends TableCommonProps {
  align?: Deployment;
  justify?: Deployment;
}

const RowExistedSetterContext = createContext<
  Dispatch<SetStateAction<boolean>>
>(() => {});

function Container({
  children,
  className,
  loading = false,
  invalid,
}: TableContainerProps) {
  const [rowExisted, setRowExisted] = useState(true);

  return (
    <RowExistedSetterContext.Provider value={setRowExisted}>
      {loading ? (
        <section
          className={cleanClassName(
            `${scss.no_row_container} ${invalid && scss.invalid}  ${className}`
          )}
        >
          <Loading />
        </section>
      ) : (
        <>
          <table
            className={cleanClassName(
              `${scss.table} ${invalid && scss.invalid} ${
                !rowExisted && scss.hidden
              } ${className}`
            )}
          >
            {children}
          </table>
          <section
            className={cleanClassName(
              `${scss.no_row_container} ${invalid && scss.invalid} ${
                rowExisted && scss.hidden
              } ${className}`
            )}
          >
            <Logo />
            <span>No Row To Show</span>
          </section>
        </>
      )}
    </RowExistedSetterContext.Provider>
  );
}

function Head({ children, className }: TableCommonProps) {
  return (
    <thead className={cleanClassName(`${scss.thead} ${className}`)}>
      {children}
    </thead>
  );
}
function Row({ children, className }: TableCommonProps) {
  return (
    <tr className={cleanClassName(`${scss.tr} ${className}`)}>{children}</tr>
  );
}
function Title({
  children,
  className,
  justify = "center",
  align = "center",
}: TableTitleProps) {
  return (
    <th className={scss.th}>
      <div
        className={cleanClassName(`
          ${scss.flex_container}
          ${scss["justify_" + justify]}
          ${scss["align_" + align]}
          ${className}
          `)}
      >
        {children}
      </div>
    </th>
  );
}

function Body({ children, className }: TableCommonProps) {
  const setRowExisted = useContext(RowExistedSetterContext);
  const rowExisted = 0 < Children.count(children);

  useEffect(() => {
    setRowExisted(rowExisted);
  }, [rowExisted, setRowExisted]);
  return (
    <tbody className={cleanClassName(`${scss.tbody} ${className}`)}>
      {children}
    </tbody>
  );
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
  let className = scss.copy_button;
  if (copied) className += ` ${scss.copied}`;
  return (
    <button
      className={className}
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
  hoverDirection?: "left" | "right";
  hoverHighlight?: boolean;
}
function DataItem({
  hoverDirection,
  hoverHighlight = true,
  ...copyButtonProps
}: DataItemProps) {
  const { children, copyable, visible } = copyButtonProps;
  if (!children) return <></>;
  return (
    <div
      className={cleanClassName(
        `${scss.td_contents} ${
          hoverDirection === "left" ? scss.left : scss.right
        } ${visible ? scss.front : scss.back} ${
          visible && hoverHighlight && scss.hover_highlight
        } ${copyable && scss.copyable}`
      )}
    >
      {children}
      <CopyButton {...copyButtonProps} />
    </div>
  );
}

type TableDataProps = Omit<DataItemProps, "visible"> &
  FlexContainerProps & {
    className?: string;
    resizable?: boolean;
  };
function Data({
  className,
  resizable,
  align = "center",
  justify = "center",
  ...dataItemProps
}: TableDataProps) {
  const { children } = dataItemProps;
  return (
    <td
      className={cleanClassName(
        `${scss.td} ${resizable && scss.resizable} ${className}`
      )}
    >
      <div
        className={`${scss.flex_container} ${scss["align_" + align]} ${
          scss["justify_" + justify]
        }`}
      >
        {children && (
          <section className={scss.td_contents_section}>
            <DataItem {...dataItemProps} visible={true} />
            <DataItem {...dataItemProps} visible={false} />
          </section>
        )}
      </div>
    </td>
  );
}

export type {
  TableCommonProps,
  TableContainerProps,
  TableTitleProps,
  TableDataProps,
};

export const Table = { Container, Row, Head, Body, Title, Data };
