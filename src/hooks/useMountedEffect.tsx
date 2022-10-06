import React, { useEffect, useRef } from 'react';

export function useMountedEffect(
  effect: React.EffectCallback,
  deps?: React.DependencyList | undefined
) {
  const isMounted = useRef(false);
  useEffect(
    isMounted.current
      ? effect
      : () => {
          isMounted.current = true;
        },
    deps
  );
}
