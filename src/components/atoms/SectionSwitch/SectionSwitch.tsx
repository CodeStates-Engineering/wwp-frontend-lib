import scss from './SectionSwitch.module.scss';
import { createContext, useContext } from 'react';
import { cleanClassName } from '../../../utils';

const CurrentSectionContext = createContext<number | string>(0);

export interface SectionSwitchContainerProps {
  className?: string;
  currentSectionId: string;
  children: React.ReactNode;
}
function Container(props: SectionSwitchContainerProps) {
  const { children, className, currentSectionId } = props;
  return (
    <article className={`${scss.section_switch} ${className}`}>
      <CurrentSectionContext.Provider value={currentSectionId}>
        {children}
      </CurrentSectionContext.Provider>
    </article>
  );
}

export interface SectionSwitchItemProps {
  className?: string;
  id: string;
  children: React.ReactNode;
}
function Item(props: SectionSwitchItemProps) {
  const { children, className, id } = props;
  const currentSectionId = useContext(CurrentSectionContext);
  return (
    <section
      id={id}
      className={cleanClassName(
        `${scss.section_switch_item} ${className} ${currentSectionId === id && scss.visible}`
      )}
    >
      {children}
    </section>
  );
}

export const SectionSwitch = {
  Container,
  Item,
};
