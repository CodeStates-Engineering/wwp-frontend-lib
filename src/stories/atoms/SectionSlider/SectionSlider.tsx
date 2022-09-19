import { cleanClassName } from "@utils";
import React, { useMemo } from "react";

import scss from "./SectionSlider.module.scss";

export interface SectionSliderContainerProps extends SectionSliderItemProps {
  currentSection: number;
}
function Container(props: SectionSliderContainerProps) {
  const { children, className, currentSection } = props;
  const { sliderItemCount, sliderItems, sliderItemWidth } = useMemo(() => {
    const childrenArray = React.Children.toArray(children),
      sliderItemCount = childrenArray.length,
      sliderItemWidth = 100 / sliderItemCount,
      sliderItemStyle = { width: sliderItemWidth + "%" },
      sliderItems = childrenArray.map((Section, index) => (
        <section
          key={index}
          className={scss.section_slider_item_wrap}
          style={sliderItemStyle}
        >
          {Section}
        </section>
      ));
    return { sliderItemCount, sliderItems, sliderItemWidth };
  }, [children]);

  const sliderStyle: React.CSSProperties = useMemo(
    () => ({
      width: `${100 * sliderItemCount}%`,
      transform: `translateX(-${sliderItemWidth * currentSection}%)`,
    }),
    [sliderItemCount, currentSection, sliderItemWidth]
  );

  return (
    <div className={`${scss.section_slider_wrap} ${className}`}>
      <article className={scss.section_slider} style={sliderStyle}>
        {sliderItems}
      </article>
    </div>
  );
}

export interface SectionSliderItemProps {
  children: React.ReactNode;
  className?: string;
}
function Item({ children, className }: SectionSliderItemProps) {
  return (
    <div className={cleanClassName(`${scss.section_slider_item} ${className}`)}>
      {children}
    </div>
  );
}

export const SectionSlider = {
  Container,
  Item,
};
