import create from 'zustand';
import shallow from 'zustand/shallow';
import type { UseBoundStore, StoreApi } from 'zustand';
import { useLayoutEffect, useMemo } from 'react';

export type StateSetter<T extends object> = (
  partial: T | Partial<T> | ((state: T) => T | Partial<T>),
  replace?: boolean | undefined
) => void;

const propsStore = create<any>(() => ({}));

export function getPropsStore<T extends object>() {
  const usePropsStore: UseBoundStore<StoreApi<T>> = propsStore;
  const PagePropsStore = {
    usePropsStore: <R extends any>(selector: (state: T) => R, renderingOptimized: boolean = true) =>
      usePropsStore(selector, renderingOptimized ? shallow : undefined),

    usePropsStoreInitializer: (initializer: (set: StateSetter<T>, get: () => T) => T) => {
      useMemo(() => {
        const initialStore = initializer(usePropsStore.setState, usePropsStore.getState);
        usePropsStore.setState(initialStore, true);
      }, []);
    },

    useSubscriptionSetter: (
      setter: (set: StateSetter<T>, get: () => T) => Partial<T>,
      subscription: React.DependencyList,
      replace: boolean = false
    ) => {
      useLayoutEffect(() => {
        const initialStore = setter(usePropsStore.setState, usePropsStore.getState);
        usePropsStore.setState(initialStore, replace);
      }, subscription);
    },
  };

  return PagePropsStore;
}
