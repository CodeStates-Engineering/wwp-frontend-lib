import create from 'zustand';
import type { UseBoundStore, StoreApi } from 'zustand';
import { useEffect } from 'react';

export type StateSetter<T extends object> = (
  partial: T | Partial<T> | ((state: T) => T | Partial<T>),
  replace?: boolean | undefined
) => void;

const propsStore = create<any>(() => ({}));

export function getPropsStore<T extends object>() {
  const usePropsStore: UseBoundStore<StoreApi<T>> = propsStore;
  const PagePropsStore = {
    usePropsStore,

    usePropsStoreInitializer: (initializer: (set: StateSetter<T>, get: () => T) => T) => {
      useEffect(() => {
        const initialStore = initializer(usePropsStore.setState, usePropsStore.getState);
        usePropsStore.setState(initialStore, true);
      }, []);
    },

    useSubscriptionSetter: (
      setter: (set: StateSetter<T>, get: () => T) => Partial<T>,
      subscription: React.DependencyList,
      replace: boolean = false
    ) => {
      useEffect(() => {
        const initialStore = setter(usePropsStore.setState, usePropsStore.getState);
        usePropsStore.setState(initialStore, replace);
      }, subscription);
    },
  };

  return PagePropsStore as T extends object ? typeof PagePropsStore : void;
}
