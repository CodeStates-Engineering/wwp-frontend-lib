import { useEffect as createEffect, useState as createState } from 'react';
import create from 'zustand';

interface PropsStore<T extends object> {
  props: T;
  setProps: (customizer: () => T | void) => {
    isInitialized: boolean;
  };
}

const propsStore = create<PropsStore<any>>((set) => ({
  props: {},
  setProps: (customizer) => {
    const [initialized, setInitialized] = createState(false);
    createEffect(() => {
      const props = customizer();
      if (!props) return;
      set(() => ({ props }));
      setInitialized(true);
    });
    return { isInitialized: initialized };
  },
}));

/** @deprecated getPagePropsStore를 사용해주세요.*/
export function assignTypeToPropsStore<T>() {
  return {
    useInitialPropsStore: (customizer) => propsStore((state) => state.setProps)(customizer),
    usePropsStore: () => propsStore((state) => state.props),
  } as T extends object
    ? {
        useInitialPropsStore: PropsStore<T>['setProps'];
        usePropsStore: () => Readonly<T>;
      }
    : void;
}
