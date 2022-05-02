import { useRef, useEffect, useCallback } from "react";

const useSyncRefs = <T extends any>(
    ...refs: (
      | React.MutableRefObject<T | null>
      | ((instance: T) => void)
      | null
    )[]
  ) => {
    let cache = useRef(refs);
  
    useEffect(() => {
      cache.current = refs;
    }, [refs]);
  
    return useCallback(
      (value: T) => {
        for (let ref of cache.current) {
          if (ref == null) {
            continue;
          }
          if (typeof ref === 'function') {
            ref(value);
          }
          else {
            ref.current = value;
          };
        }
      },
      [cache]
    );
  };

  export default useSyncRefs;