import scss from "./PageContents.module.scss";
import { Link } from "react-router-dom";
import { cleanClassName } from "@utils";
import { Loading } from "../../atoms";
import { useEffect, useState } from "react";

export interface PageContentsContainerProps {
  children?: React.ReactNode;
  loading?: boolean;
}

export interface PageContentsSectionProps {
  children?: React.ReactNode;
  pageWidthRange?: {
    minWidth?: React.CSSProperties["maxWidth"];
    maxWidth?: React.CSSProperties["maxWidth"];
  };
}

export interface PageContentsHeaderProps extends PageContentsSectionProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  itemCount?: number;
  previousPathList?: { title: string; url: string }[];
  contour?: boolean;
}

export type PageContentsFooterProps = PageContentsSectionProps;

export const PageContents = {
  Container: ({ loading, children }: PageContentsContainerProps) => {
    const [loaded, setLoaded] = useState(loading);

    useEffect(() => {
      if (loading) setLoaded(true);
      else setTimeout(() => setLoaded(false), 500);
    }, [loading, setLoaded]);

    return (
      <article
        className={cleanClassName(
          `${scss.container} ${loaded && scss.loading}`
        )}
      >
        {loaded && (
          <div className={scss.loading_wrap}>
            <Loading />
          </div>
        )}
        {children}
      </article>
    );
  },

  Header: ({
    previousPathList,
    title,
    contour = true,
    itemCount,
    description,
    children,
    pageWidthRange,
  }: PageContentsHeaderProps) => (
    <header
      className={cleanClassName(`${scss.header} ${contour && scss.contour}`)}
      style={pageWidthRange}
    >
      {title || itemCount ? (
        <h1 className={scss.title}>
          {title} {itemCount && `(${itemCount})`}
        </h1>
      ) : undefined}
      {previousPathList ? (
        <ul className={scss.path_list}>
          {previousPathList?.map(({ url, title: previousPathTitle }, index) => (
            <li key={previousPathTitle + index}>
              {<Link to={url}>{previousPathTitle}</Link>}
              <span className={scss.arrow}>►</span>
            </li>
          ))}
          <li className={scss.path}>{title}</li>
        </ul>
      ) : undefined}
      {description ? (
        <p className={scss.description}>{description}</p>
      ) : undefined}
      {children}
    </header>
  ),

  Section: ({ children, pageWidthRange }: PageContentsSectionProps) => (
    <section className={scss.section} style={pageWidthRange}>
      {children}
    </section>
  ),

  Footer: ({ children, pageWidthRange }: PageContentsFooterProps) => (
    <footer
      className={`${scss.section} ${scss.padding_bottom}`}
      style={pageWidthRange}
    >
      {children}
    </footer>
  ),
};
