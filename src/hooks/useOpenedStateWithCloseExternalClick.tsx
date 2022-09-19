import { useEffect, useState, useMemo, useCallback } from 'react';
export function useOpenedStateWithCloseExternalClick(opened: boolean) {
  const openedState = useState(opened);
  const isMouseOnMemo = useMemo(() => ({ value: true }), []),
    preventCloseProps = {
      onMouseEnter: () => {
        isMouseOnMemo.value = true;
      },
      onMouseLeave: () => {
        isMouseOnMemo.value = false;
      },
    };

  const modalCloseHandler = useCallback(() => {
    !isMouseOnMemo.value && openedState[1](false);
  }, [isMouseOnMemo, openedState]);

  useEffect(() => {
    if (openedState[0]) document.addEventListener('mousedown', modalCloseHandler);
    else document.removeEventListener('mousedown', modalCloseHandler);
  }, [openedState, modalCloseHandler]);

  return { openedState, preventCloseProps };
}
